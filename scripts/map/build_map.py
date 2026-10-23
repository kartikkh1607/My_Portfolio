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
3. Embed each chip query and keep the 8 nearest sentences by cosine similarity
   in the full 384-d space, not in the 3D projection.
4. Write src/data/embedding-map.json and public/map-static.svg (a 2D view of
   the first two PCA components, used when WebGL or motion is off).

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

# Keep in sync with the --map-* tokens in src/styles/index.css.
COLORS = {
    "light": {"rag": "#2B4ACB", "evals": "#6B4FD0", "llm-apps": "#2F7FBF", "android": "#8A3E7A",
              "infra": "#1F8A84", "testing": "#5E6779", "dsa": "#1B2433"},
    "dark": {"rag": "#7D93F2", "evals": "#A28BF2", "llm-apps": "#6FB3E8", "android": "#C77AB8",
             "infra": "#4FC1B9", "testing": "#9AA3B5", "dsa": "#E6E9F0"},
}


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


def to_unit_cube(coords: np.ndarray) -> np.ndarray:
    centered = coords - coords.mean(axis=0)
    return centered / np.abs(centered).max()


def write_svg(points: list[dict]) -> None:
    # Same mapping the React fallback uses: x right, y up (SVG y is flipped).
    style_rules = []
    for theme, palette in COLORS.items():
        rules = "".join(f".c-{c}{{fill:{hex_}}}" for c, hex_ in palette.items())
        style_rules.append(rules if theme == "light" else f"@media (prefers-color-scheme: dark){{{rules}}}")
    circles = "\n".join(
        f'  <circle class="c-{p["cluster"]}" cx="{p["x"]}" cy="{-p["y"]}" r="0.032">'
        f"<title>{escape(p['text'])}</title></circle>"
        for p in points
    )
    # Fit the viewBox to the points, same as StaticMap.jsx.
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
        f"  <style>circle{{fill-opacity:.85}}{''.join(style_rules)}</style>\n"
        f"{circles}\n</svg>\n"
    )
    OUT_SVG.write_text(svg, encoding="utf-8")


def main() -> None:
    rows = load_sentences()
    texts = [r["text"] for r in rows]
    model = TextEmbedding(model_name=MODEL)

    vecs = embed(model, texts)
    pca = PCA(n_components=3, random_state=0)
    xyz = to_unit_cube(pca.fit_transform(vecs))

    points = []
    for row, (x, y, z) in zip(rows, xyz):
        point = {"x": round(float(x), 3), "y": round(float(y), 3), "z": round(float(z), 3),
                 "cluster": row["cluster"], "text": row["text"]}
        if row.get("project"):
            point["project"] = row["project"]
        points.append(point)

    query_vecs = embed(model, [q for _, q in CHIPS])
    sims = query_vecs @ vecs.T  # cosine similarity: both sides are unit-length
    chips = []
    for (label, query), row in zip(CHIPS, sims):
        top = np.argsort(-row)[:TOP_K]
        chips.append({"label": label, "query": query, "top": [int(i) for i in top]})

    data = {
        "meta": {
            "model": MODEL,
            "count": len(points),
            "pca_explained_variance": [round(float(v), 4) for v in pca.explained_variance_ratio_],
        },
        "points": points,
        "chips": chips,
    }
    OUT_JSON.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    write_svg(points)

    size_kb = OUT_JSON.stat().st_size / 1024
    print(f"{len(points)} sentences, PCA variance kept: {sum(pca.explained_variance_ratio_):.1%}")
    print(f"wrote {OUT_JSON.relative_to(ROOT)} ({size_kb:.1f} KB), {OUT_SVG.relative_to(ROOT)} "
          f"({OUT_SVG.stat().st_size / 1024:.1f} KB)")
    for chip in chips:
        print(f"\n{chip['label']} ({chip['query']}):")
        for rank, i in enumerate(chip["top"], 1):
            print(f"  {rank}. [{points[i]['cluster']}] {points[i]['text']}")


if __name__ == "__main__":
    main()
