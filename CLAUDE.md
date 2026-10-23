# CLAUDE.md: Portfolio v2 (kartikkh1607/My_Portfolio)

You are rebuilding Kartik Khandelwal's portfolio site. Read this whole file before changing anything. Work in the phases at the bottom, one phase per session, and stop after each phase so Kartik can review.

## 1. Why this rebuild

The live site (my-portfolio-azure-nine-26.vercel.app) still presents Kartik as a "2nd-year Android Developer". He is now a 3rd-year B.Tech IT student targeting **GenAI / Applied AI Engineer internships**, and recruiters reach this site from cold emails and his resume. They skim for seconds. The site's only job:

> In under 10 seconds, a recruiter or engineering manager should see that Kartik builds LLM apps **and measures whether they work**, open one live demo, and download the resume.

## 2. Audit of the current repo (fix all of these)

| Problem | Where | Fix |
|---|---|---|
| Positioning is "Android Developer", "2nd Year" | `src/data/portfolio.js`, `index.html` meta, OG/Twitter tags | Rewrite from Section 5 |
| Page body is empty without JavaScript (crawlers, link previews and ATS see nothing) | `index.html` has only `<div id="root">` | Prerender at build time (Section 7) |
| `og-preview.png` is referenced but does not exist in `public/` | `index.html` | Create a real 1200×630 OG image |
| MyWishlist links to `MyShoppingListApp`; Kometo and all "more projects" link to the profile, not a repo | `portfolio.js` | Use the exact URLs in Section 5. Delete "Mood Quote", "Unit Converter", "TaskFlow" unless Kartik confirms a public repo for each |
| Timeline says B.Tech started 2023; resume says 2024–2028 | `portfolio.js` timeline | **Ask Kartik** which is correct before writing dates |
| `resumeText: "Available on Request"` while an old PDF sits in `public/` | `portfolio.js`, `public/MY_Resume.pdf` | Replace with the new resume PDF Kartik provides; link it as a download |
| Full-screen fixed Three.js particle canvas renders on every section, forever | `App.jsx`, `three/ParticlesCanvas.jsx` | Replace with the hero-only embedding map (Section 6) |
| Mouse listener registered inside `useMemo` is never cleaned up (leak) | `ParticlesCanvas.jsx` | Gone with the rewrite; use `useEffect` with cleanup anywhere you add listeners |
| Tailwind v3 (`tailwind.config.js` + PostCSS) and `@tailwindcss/vite` v4 are both installed | `package.json` | Pick one. Prefer Tailwind v4 via `@tailwindcss/vite`; remove PostCSS/autoprefixer config and v3 config |
| Custom cursor, scroll-progress bar, back-to-top glow, fade-up on every section | `Cursor.jsx`, `ScrollProgress.jsx`, `App.jsx`, `utils/animations.js` | Delete. One orchestrated motion moment only (the hero map) |
| EmailJS IDs hardcoded | `Contact.jsx` | Move to `VITE_EMAILJS_*` env vars (they are public keys, but keep config out of components) |

Keep: React 18, Vite, Framer Motion (only for user-triggered motion), `@react-three/fiber` v8 + drei (they need React 18; do **not** upgrade React to 19 in this rebuild), lucide-react, EmailJS.

## 3. Design direction

**Concept: "the embedding map".** Kartik's flagship project embeds lecture transcripts with all-MiniLM-L6-v2 and searches them in Qdrant. The hero turns his own work into that same kind of space: every point is a real sentence about his projects and skills, embedded with the same model and projected to 3D. Related work clusters together (RAG, evals, Android, infra). Clicking a query chip lights up the nearest points, just as retrieval would. The old decorative particle field becomes the one memorable, on-subject element. Everything else on the page stays quiet.

This keeps the 3D feel Kartik likes, but the 3D now means something he can explain in an interview.

### Tokens

Color (light is default; dark follows `prefers-color-scheme` and a manual toggle):

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#EEF1F6` (cool fog) | `#11151D` | page |
| `--surface` | `#FFFFFF` | `#1A2030` | case-study panels |
| `--ink` | `#1B2433` | `#E6E9F0` | text |
| `--muted` | `#5E6779` | `#9AA3B5` | secondary text (check ≥4.5:1) |
| `--cobalt` | `#2B4ACB` | `#7D93F2` | links, primary actions, RAG cluster |
| `--amber` | `#C9831F` | `#E8A33D` | metrics and "after" values only |
| `--teal` | `#1F8A84` | `#4FC1B9` | infra/DevOps cluster |
| `--plum` | `#8A3E7A` | `#C77AB8` | Android cluster |

Rule: amber is reserved for measured results (95%, 31 tests). It is how the eye finds numbers.

Type:
- Display: **Bricolage Grotesque** (600/700). Headline sizes on a modular scale (ratio 1.333): 16 / 21 / 28 / 38 / 50 / 67 px.
- Body: **IBM Plex Sans** (400/500), 17px, line-height 1.6, max line length ~70ch.
- Numbers in metric panels: Bricolage Grotesque with `font-variant-numeric: tabular-nums`.
- No monospace for labels. No all-caps labels or eyebrows. No single highlighted word in a headline. No "→" appended to button text. No middle-dot meta strings; use plain comma lists or small tags.
- Self-host fonts with `@fontsource` (better LCP than Google Fonts).

Layout: one page, left-aligned text, 1120px max width, 24px gutters (16px on mobile).

```
┌──────────────────────────────────────────────────────────────┐
│ Kartik Khandelwal                    Projects  Resume  Contact│
├──────────────────────────────┬───────────────────────────────┤
│ I build LLM apps and measure │                               │
│ whether they work.           │      [ 3D embedding map ]     │
│                              │   points drift in, cluster    │
│ 3rd-year IT student at KIET. │                               │
│ Looking for a GenAI / Applied│                               │
│ AI internship (2027).        │                               │
│ [Download resume] [GitHub]   │ Ask the map: (RAG) (evals)    │
│                              │ (Android) (infra) (testing)   │
├──────────────────────────────┴───────────────────────────────┤
│ YT Lecture RAG  (flagship: wide panel, eval table on right)  │
├──────────────────────────────────────────────────────────────┤
│ HireMeAI        │ MealTime        │ DSA Practice Tracker      │
│ (each panel uses a different evidence visual, see §5)       │
├──────────────────────────────────────────────────────────────┤
│ Skills (grouped plain text, no bars or percentages)          │
│ Earlier Android work (compact list)                          │
│ Certifications and achievements (one strip)                  │
│ Contact (email with copy button, LinkedIn, form)             │
└──────────────────────────────────────────────────────────────┘
```

On mobile the map sits below the hero text at 60vh and the project grid stacks.

### Principles

1. **Evidence over adjectives.** Every project shows a number, a baseline or a concrete artifact. No "passionate", "cutting-edge", "seamless".
2. **One bold thing.** The map is the only animated, attention-seeking element. Panels have no hover lift, no glow, no gradient washes.
3. **Panels are not identical cards.** Flagship is wide; each other project has its own evidence visual. Corner radius 14px on panels, 999px on chips, 6px on buttons: radius encodes component type.
4. **Fast first.** The hero text and project content render as static HTML before any JS. The 3D map loads after.
5. **Honest copy.** Use only the facts in Section 5. If something is not listed there, ask Kartik.

## 4. Quality floor (must pass before any phase is "done")

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- Works with JavaScript disabled: all text, project links and the resume link are present (the map is replaced by its static image).
- Keyboard: visible focus ring (`--cobalt`, 2px offset) on every interactive element; chips reachable and operable with Enter/Space.
- `prefers-reduced-motion: reduce` → no map animation; show the static SVG/PNG version.
- Contrast ≥ 4.5:1 for body text in both themes.
- No layout shift from fonts or images (set width/height on all images).
- `npm run build` has zero warnings you introduced.

## 5. Content (verified from Kartik's repos and resume, Oct 2026: use exactly)

### Identity
- Name: Kartik Khandelwal
- Hero line: "I build LLM apps and measure whether they work."
- Sub-line: "3rd-year B.Tech IT student at KIET Group of Institutions, Ghaziabad. Looking for a GenAI / Applied AI Engineer internship."
- Email: kartikkhandelwal1234589@gmail.com
- GitHub: https://github.com/kartikkh1607
- LinkedIn: https://www.linkedin.com/in/kartik-khandelwal-a71554327
- LeetCode: https://leetcode.com/u/Kartik_Khandelwal_2004/
- Resume: `/Kartik_Khandelwal_Resume.pdf` (Kartik will drop the new PDF into `public/`)
- Do **not** put the phone number on the site.

### Project 1 (flagship): YT Lecture RAG
- Live: https://yt-lecture-rag.vercel.app, Code: https://github.com/kartikkh1607/YTLectureRAG
- Stack: Python, FastAPI, Qdrant (local), fastembed (ONNX, all-MiniLM-L6-v2), Groq, Vercel
- Problem: Ask a DSA question in Hinglish or English and jump to the second of the lecture where it is explained.
- Approach: 126 YouTube DSA lectures (~68 hours) chunked into 75 s windows with 15 s overlap (2,933 chunks). A small Groq model rewrites Hinglish questions into English DSA search queries (cached). Distance cutoff plus title-word boost. Optional grounded answer with three refusal guards: nothing survives the cutoff, the model says the excerpts don't cover it, or no valid citation.
- Key finding: the English-only embedder matched Hinglish queries by *language*, not topic. Query rewriting fixed it.
- Evidence visual: the eval table (20 retrieval questions + 8 off-topic, k = 5):

| Setup | hit@5 | top-1 | MRR | Refusal |
|---|---|---|---|---|
| Baseline (no rewrite) | 65% | ~55% | ~0.59 | 100% |
| + Query rewrite | 95% | 65% | 0.77 | 100% |
| + fastembed ONNX (current) | 95% | 65% | 0.77 | 100% |

  Render the 65% → 95% hit@5 jump as the panel's one amber number.

### Project 2: HireMeAI, recruiter chatbot
- Live: https://hiremeai-kartik.onrender.com, Code: https://github.com/kartikkh1607/HireMeAI
- Note under the Live link: "Free hosting: first load can take up to a minute to wake up."
- Stack: Python, FastAPI, Groq (openai/gpt-oss-120b), Pydantic, React + Vite, pytest, Render
- Problem: Recruiters ask about Kartik; the bot answers only from his resume and says "not in the resume" instead of inventing.
- Approach: resume parsed once into a strict JSON schema and committed as a cache keyed on file, prompt and model, so production startup makes zero LLM calls. Streaming chat with a 10-message window.
- Evidence visual: a short "hardening" checklist, each line a real control: phone number withheld from the model; prompt-injection and XSS defenses; per-IP and global rate limits; only valid requests count against limits; 31 pytest tests with the LLM mocked, ~2 s.
- Honest note (keep it, it reads well): "Per-IP limits can be spoofed via X-Forwarded-For; the global cap bounds the damage." This is a documented known limitation, **not** a fix. Do not describe it as fixed.
- Debugging story for the expandable case study: `gpt-oss` reasoning tokens count toward the output limit, so long structured outputs got cut off and Groq returned `400 json_validate_failed` instead of `finish_reason == "length"`. Fix: explicit `max_completion_tokens` and committing the parsed resume.

### Project 3: MealTime, AI recipe & meal-planning Android app
- Code: https://github.com/kartikkh1607/MyrecipeApp (no live link; don't claim it is on the Play Store unless Kartik confirms)
- Stack: Kotlin, Jetpack Compose, Hilt, Room, Firebase (Auth, Firestore, Crashlytics), Gemini with Groq fallback, Cloudflare Workers, Play Billing 7, GitHub Actions
- Points: recipe search, cooking mode, favorites, shopping list grouped by recipe; MVVM + Clean Architecture; 5-table Room cache with bundled offline fallback; AI recipe generation, remix and multi-day meal planner routed through a Cloudflare Worker authenticated with Firebase ID tokens, so no API keys ship in the APK; subscriptions enforced server-side by validating Play purchase tokens and setting a Firebase custom claim; CI runs build, lint and unit tests on every push.
- Evidence visual: a small request-flow diagram (inline SVG): App → Firebase ID token → Cloudflare Worker → Gemini (fallback: Groq). Use the feature graphic from the MealTime repo's `store-assets/` if Kartik copies it in.

### Project 4: DSA Practice Tracker
- Live: https://personaldsatracker.vercel.app, Code: https://github.com/kartikkh1607/personal_dsa_tracker
- Stack: React, Vite, Tailwind, Supabase, Vitest, Playwright, Vercel
- Points: installable offline-first PWA, 917 problems across 23 topics; spaced review at 7/30/90 days, and a failed review drops to a 3-day re-check; optional cross-device sync on Supabase (Google sign-in, row-level security, merge); Vitest unit + Playwright end-to-end tests.
- Evidence visual: the review schedule as a sequence: 3 → 7 → 30 → 90 days (this is a real sequence, so numbered steps are fine here).

### Earlier Android work (compact list, plum accent)
- Kometo: food-delivery app, Jetpack Compose, Clean Architecture, Hilt, Firebase Auth. https://github.com/kartikkh1607/Kometo
- MyWishlist: offline wishlist manager, Room, Kotlin Flow, MVVM. https://github.com/kartikkh1607/MyWishListApp

### Skills (plain grouped text)
- GenAI & LLMs: RAG, prompt engineering, embeddings, vector search (Qdrant), query rewriting, structured outputs (JSON Schema, Pydantic), streaming, LLM evaluation (hit@k, MRR, golden sets), guardrails and prompt-injection defense, Groq and Gemini APIs
- Backend & web: Python, FastAPI, REST APIs, React, TypeScript/JavaScript, Vite, Tailwind
- Testing: pytest, Vitest, Playwright
- Cloud & DevOps: AWS (Lambda, API Gateway, SQS, DynamoDB, EC2, VPC), Terraform, GitHub Actions, Cloudflare Workers, Vercel, Render, Supabase, Firebase
- Android: Kotlin, Jetpack Compose, MVVM, Clean Architecture, Hilt, Room, Retrofit, Coroutines, Flow
- Also: C++ (DSA), Java

### Achievements & certifications
- 450+ LeetCode problems, 100+ day streak
- National-level participant, Bharatiya Antariksh Hackathon 2025 (ISRO & Hack2Skill)
- AWS Certified CloudOps Engineer – Associate (Apr 2026), AWS Certified Data Engineer – Associate (Apr 2026), AWS Certified AI Practitioner (Dec 2025), AWS Certified Cloud Practitioner (Dec 2025)

## 6. The embedding map (Phase 3)

It must be real, not decorative. Kartik should be able to explain every step.

**Build-time data (Python, run once, commit the output):**
1. `scripts/map/sentences.yaml`: ~80–120 short sentences, each tagged with a cluster (`rag`, `evals`, `llm-apps`, `android`, `infra`, `testing`, `dsa`) and an optional `project` id. Write them from Section 5 only.
2. `scripts/map/build_map.py` (run with `uv run`): embed with `fastembed` using `sentence-transformers/all-MiniLM-L6-v2` (the same model as YT Lecture RAG), project to 3D with PCA (scikit-learn), normalize to a unit cube.
3. Also embed the chip queries ("retrieval and RAG", "evaluation and metrics", "Android apps", "cloud and infrastructure", "testing") and store, per chip, the indices of the top-8 sentences by cosine similarity.
4. Output `src/data/embedding-map.json`: `{ points: [{x,y,z,cluster,project,text}], chips: [{label, query, top: [i...]}] }`. Keep it under ~40 KB.
5. Also export a static 2D projection as `public/map-static.svg` (for no-JS, reduced motion and mobile low-power).

**Runtime (`src/three/EmbeddingMap.jsx`):**
- Lazy-load with `React.lazy` and only mount when the hero is visible (`IntersectionObserver`); unmount or pause the render loop when it scrolls away (`frameloop="demand"` or invalidate on interaction).
- Points colored by cluster tokens; slow ambient rotation (≤ 0.02 rad/s); drag to orbit; cap DPR at 1.5.
- Load moment (the single orchestrated animation): points start scattered and settle into their clusters over ~1.2 s.
- Chip click: the top-8 points enlarge and brighten, others dim to 25%, and a small caption lists the top-3 sentences. If a highlighted point has a `project`, the caption links to that project's panel. Clicking the same chip again resets.
- Hovering or focusing a point shows its sentence in a tooltip.
- Below the map, one line of explanatory copy: "Each dot is a sentence about my work, embedded with all-MiniLM-L6-v2 (the model behind YT Lecture RAG) and projected to 3D with PCA."
- `prefers-reduced-motion` or no WebGL: render `map-static.svg`, and chips still work by highlighting SVG circles.

## 7. Static HTML and SEO (Phase 4)

Use Vite's own SSR build to prerender the single page; no third-party prerender plugin:
- `src/entry-server.jsx` exports `render()` using `react-dom/server` `renderToString(<App />)`.
- `scripts/prerender.mjs` runs after `vite build` and `vite build --ssr src/entry-server.jsx`, injects the HTML into `dist/index.html` at `<!--app-html-->`.
- `src/main.jsx` uses `hydrateRoot`.
- Anything touching `window`, WebGL or `IntersectionObserver` must be client-only (guard with an `isClient` effect), so the SSR output contains the static SVG map.
- Check: `grep -c "YT Lecture RAG" dist/index.html` must be ≥ 1.

Meta: title "Kartik Khandelwal: GenAI Engineer (RAG, LLM apps, evals)"; description from the hero sub-line plus "YT Lecture RAG raised hit@5 from 65% to 95%."; OG and Twitter tags; 1200×630 `public/og.png`; JSON-LD `Person` with `sameAs` GitHub, LinkedIn and LeetCode; `sitemap.xml` and `robots.txt`; favicon matching the new palette.

## 8. Phases (stop after each one for Kartik's review)

1. **Content and cleanup.** Ask Kartik the open questions (B.Tech start year; whether the 3 "more projects" repos exist; drop in the new resume PDF). Rewrite `portfolio.js` from Section 5. Remove cursor, scroll progress, back-to-top, global particles and per-section animations. Fix Tailwind setup. Fix all links. Site should work as plain content.
2. **Design system and layout.** Tokens, fonts, light/dark, hero, flagship panel with eval table, three project panels with their distinct evidence visuals, skills, earlier work, certs, contact. Use a static placeholder where the map will go.
3. **Embedding map.** Python data build, then the R3F component, chips, reduced-motion/static fallback.
4. **Prerender, SEO, performance.** SSR prerender, meta/OG/JSON-LD, Lighthouse pass, deploy preview on Vercel.

After every phase: run `npm run build`, take a screenshot of desktop and mobile, compare against Sections 3–4, list anything that still looks generic, fix it, then summarize changes for Kartik.

## 9. Don'ts

- Don't invent metrics, users, stars, downloads or Play Store status.
- Don't add skill percentage bars, "years of experience", testimonials or a visitor counter.
- Don't use the words "passionate", "cutting-edge", "seamless", "robust", "leveraging".
- Don't add new heavy dependencies (no GSAP, no Lottie, no extra 3D libs).
- Don't commit API keys. The map build is offline; the site makes no LLM calls.
