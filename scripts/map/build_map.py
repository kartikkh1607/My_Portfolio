# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "fastembed>=0.4",
#   "scikit-learn>=1.4",
#   "numpy>=1.26",
#   "pyyaml>=6",
# ]
# ///
"""Build the hero embedding map (CLAUDE.md §6).

    uv run scripts/map/build_map.py

1. Embed every sentence in sentences.yaml with all-MiniLM-L6-v2 via fastembed
   (the same model and runtime YT Lecture RAG uses).
2. Project the 384-d embeddings to 3D with PCA and scale uniformly into the
   unit cube [-1, 1]^3 (one scale factor for all axes, so shape is preserved).
3. Embed each chip query and each project query, keep the 8 nearest sentences
   by cosine similarity in the full 384-d space (not in the 3D projection), and
   project the query itself with the same PCA so the site can draw "query
   beams" from where the query lands to its neighbours.
4. Write src/data/embedding-map.json and public/map-static.svg (a 2D view of
   the first two PCA components, the fallback when JS or WebGL is off).

Runs offline after the first model download. No API keys involved.
"""

from __future__ import annotations

import json
from html import escape
from pathlib import Path

import numpy as np
import yaml
from fastembed import TextEmbedding
from sklearn.decomposition import PCA

ROOT = Path(__file__).resolve().parents[2]
SENTENCES = Path(__file__).with_name("sentences.yaml")
OUT_JSON = ROOT / "src" / "data" / "embedding-map.json"
OUT_SVG = ROOT / "public" / "map-static.svg"

MODEL = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 8
CLUSTERS = ["rag", "evals", "llm-apps", "android", "infra", "testing", "dsa"]
CHIPS = [
    ("RAG", "retrieval and RAG"),
    ("evals", "evaluation and metrics"),
    ("Android", "Android apps"),
    ("infra", "cloud and infrastructure"),
    ("testing", "testing"),
]

# The query each project section fires in the background map while it's on screen.
PROJECT_QUERIES = [
    ("yt-lecture-rag", "search YouTube DSA lectures with RAG"),
    ("hiremeai", "recruiter chatbot that answers from my resume"),
    ("mealtime", "AI recipe and meal-planning Android app"),
    ("dsa-tracker", "spaced-repetition DSA practice tracker"),
]

# Keep in sync with the --map-* tokens in src/styles/index.css.
COLORS = {"rag": "#22D3EE", "evals": "#A78BFA", "llm-apps": "#60A5FA", "android": "#F0ABFC",
          "infra": "#2DD4BF", "testing": "#94A3B8", "dsa": "#E2E8F0"}


def load_sentences() -> list[dict]:
    rows = yaml.safe_load(SENTENCES.read_text(encoding="utf-8"))["sentences"]
    for i, row in enumerate(rows):
        if row.get("cluster") not in CLUSTERS:
            raise ValueError(f"sentence {i}: unknown cluster {row.get('cluster')!r}")
        if not row.get("text"):
            raise ValueError(f"sentence {i}: empty text")
    return rows


def embed(model: TextEmbedding, texts: list[str]) -> np.ndarray:
    vecs = np.array(list(model.embed(texts)), dtype=np.float32)
    return vecs / np.linalg.norm(vecs, axis=1, keepdims=True)


def unit_cube(coords: np.ndarray):
    """Center and scale uniformly into [-1, 1]^3; returns the transform so
    queries can be placed in the same space."""
    center = coords.mean(axis=0)
    scale = np.abs(coords - center).max()
    return lambda c: (c - center) / scale


def write_svg(points: list[dict]) -> None:
    # Same mapping the React fallback uses: x right, y up (SVG y is flipped).
    style_rules = "".join(f".c-{c}{{fill:{hex_}}}" for c, hex_ in COLORS.items())
    circles = "\n".join(
        f'  <circle class="c-{p["cluster"]}" cx="{p["x"]}" cy="{-p["y"]}" r="0.032">'
        f"<title>{escape(p['text'])}</title></circle>"
        for p in points
    )
    # Fit the viewBox to the points. src/three/layout.js frames the 3D map to
    # the same box, so the 3D view lines up with this image when it takes over.
    pad = 0.12
    xs = [p["x"] for p in points]
    ys = [-p["y"] for p in points]
    x0, y0 = min(xs) - pad, min(ys) - pad
    w, h = max(xs) + pad - x0, max(ys) + pad - y0
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.3f} {y0:.3f} {w:.3f} {h:.3f}" '
        f'width="600" height="{round(600 * h / w)}" '
        'role="img" aria-label="Embedding map: each dot is a sentence about my work, '
        'embedded with all-MiniLM-L6-v2 and projected with PCA.">\n'
        f"  <style>circle{{fill-opacity:.9}}{style_rules}</style>\n"
        f"{circles}\n</svg>\n"
    )
    OUT_SVG.write_text(svg, encoding="utf-8")


def main() -> None:
    rows = load_sentences()
    texts = [r["text"] for r in rows]
    model = TextEmbedding(model_name=MODEL)

    vecs = embed(model, texts)
    pca = PCA(n_components=3, random_state=0)
    to_cube = unit_cube(pca.fit_transform(vecs))
    xyz = to_cube(pca.transform(vecs))

    points = []
    for row, (x, y, z) in zip(rows, xyz):
        point = {"x": round(float(x), 3), "y": round(float(y), 3), "z": round(float(z), 3),
                 "cluster": row["cluster"], "text": row["text"]}
        if row.get("project"):
            point["project"] = row["project"]
        points.append(point)

    def nearest(queries: list[str]) -> list[dict]:
        q_vecs = embed(model, queries)
        q_xyz = to_cube(pca.transform(q_vecs))
        sims = q_vecs @ vecs.T  # cosine similarity: both sides are unit-length
        return [
            {"q": [round(float(v), 3) for v in at], "top": [int(i) for i in np.argsort(-row)[:TOP_K]]}
            for at, row in zip(q_xyz, sims)
        ]

    chips = [{"label": label, "query": query, **hit}
             for (label, query), hit in zip(CHIPS, nearest([q for _, q in CHIPS]))]
    projects = [{"id": pid, "query": query, **hit}
                for (pid, query), hit in zip(PROJECT_QUERIES, nearest([q for _, q in PROJECT_QUERIES]))]

    data = {
        "meta": {
            "model": MODEL,
            "count": len(points),
            "pca_explained_variance": [round(float(v), 4) for v in pca.explained_variance_ratio_],
        },
        "points": points,
        "chips": chips,
        "projects": projects,
    }
    OUT_JSON.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    write_svg(points)

    size_kb = OUT_JSON.stat().st_size / 1024
    print(f"{len(points)} sentences, PCA variance kept: {sum(pca.explained_variance_ratio_):.1%}")
    print(f"wrote {OUT_JSON.relative_to(ROOT)} ({size_kb:.1f} KB), {OUT_SVG.relative_to(ROOT)} "
          f"({OUT_SVG.stat().st_size / 1024:.1f} KB)")
    for hit in chips + projects:
        print(f"\n{hit.get('label', hit.get('id'))} ({hit['query']}):")
        for rank, i in enumerate(hit["top"], 1):
            print(f"  {rank}. [{points[i]['cluster']}] {points[i]['text']}")


if __name__ == "__main__":
    main()
