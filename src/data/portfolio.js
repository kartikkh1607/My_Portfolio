// All copy on the site comes from here. Source of truth: CLAUDE.md, Section 5.
// Don't add facts that aren't listed there.

export const personalInfo = {
  name: 'Kartik Khandelwal',
  heroLine: 'I build LLM apps and measure whether they work.',
  // Rotating line under the name in the hero.
  roles: ['builds RAG systems', 'writes evals', 'ships LLM apps'],
  subLine:
    '3rd-year B.Tech IT student at KIET Group of Institutions, Ghaziabad. Looking for a GenAI / Applied AI Engineer internship.',
  education: {
    school: 'KIET Group of Institutions, Ghaziabad',
    degree: 'B.Tech, Information Technology',
    years: '2024–2028',
  },
  email: 'kartikkhandelwal1234589@gmail.com',
  github: 'https://github.com/kartikkh1607',
  linkedin: 'https://www.linkedin.com/in/kartik-khandelwal-a71554327',
  leetcode: 'https://leetcode.com/u/Kartik_Khandelwal_2004/',
  resume: '/Kartik_Khandelwal_Resume.pdf',
}

export const flagship = {
  id: 'yt-lecture-rag',
  name: 'YT Lecture RAG',
  live: 'https://yt-lecture-rag.vercel.app',
  code: 'https://github.com/kartikkh1607/YTLectureRAG',
  stack: ['Python', 'FastAPI', 'Qdrant (local)', 'fastembed (ONNX, all-MiniLM-L6-v2)', 'Groq', 'Vercel'],
  problem:
    'Ask a DSA question in Hinglish or English and jump to the second of the lecture where it is explained.',
  approach: [
    '126 YouTube DSA lectures (~68 hours) chunked into 75 s windows with 15 s overlap, 2,933 chunks in total.',
    'A small Groq model rewrites Hinglish questions into English DSA search queries, with results cached.',
    'Distance cutoff plus a title-word boost.',
    "Optional grounded answer with three refusal guards: nothing survives the cutoff, the model says the excerpts don't cover it, or there is no valid citation.",
  ],
  finding:
    'The English-only embedder matched Hinglish queries by language, not topic. Query rewriting fixed it.',
  headline: { label: 'hit@5', before: '65%', after: '95%' },
  secondary: [
    { label: 'MRR', before: '~0.59', after: '0.77' },
    { label: 'Off-topic refused', after: '100%' },
  ],
  evalCaption: 'Golden set: 20 retrieval questions plus 8 off-topic questions, k = 5.',
  evalColumns: ['Setup', 'hit@5', 'top-1', 'MRR', 'Refusal'],
  evalRows: [
    ['Baseline (no rewrite)', '65%', '~55%', '~0.59', '100%'],
    ['+ Query rewrite', '95%', '65%', '0.77', '100%'],
    ['+ fastembed ONNX (current)', '95%', '65%', '0.77', '100%'],
  ],
}

export const projects = [
  {
    id: 'hiremeai',
    name: 'HireMeAI',
    subtitle: 'Recruiter chatbot',
    live: 'https://hiremeai-kartik.onrender.com',
    liveNote: 'Free hosting: first load can take up to a minute to wake up.',
    code: 'https://github.com/kartikkh1607/HireMeAI',
    stack: ['Python', 'FastAPI', 'Groq (openai/gpt-oss-120b)', 'Pydantic', 'React + Vite', 'pytest', 'Render'],
    problem:
      'Recruiters ask about me; the bot answers only from my resume and says "not in the resume" instead of inventing.',
    approach:
      'The resume is parsed once into a strict JSON schema and committed as a cache keyed on file, prompt and model, so production startup makes zero LLM calls. Streaming chat with a 10-message window.',
    evidence: {
      type: 'checklist',
      title: 'Hardening',
      items: [
        'Phone number withheld from the model',
        'Prompt-injection and XSS defenses',
        'Per-IP and global rate limits',
        'Only valid requests count against limits',
      ],
      metric: { value: '31', label: 'pytest tests with the LLM mocked, ~2 s' },
      // Documented known limitation, not a fix. Keep the wording.
      note: 'Per-IP limits can be spoofed via X-Forwarded-For; the global cap bounds the damage.',
    },
    caseStudy: {
      title: 'Debugging story: truncated structured outputs',
      body: [
        'gpt-oss reasoning tokens count toward the output limit, so long structured outputs got cut off.',
        'Groq returned 400 json_validate_failed instead of finish_reason == "length", which hid the real cause.',
        'Fix: set max_completion_tokens explicitly and commit the parsed resume, so production never re-parses it.',
      ],
    },
  },
  {
    id: 'mealtime',
    name: 'MealTime',
    subtitle: 'AI recipe and meal-planning Android app',
    live: null,
    code: 'https://github.com/kartikkh1607/MyrecipeApp',
    stack: [
      'Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'Firebase (Auth, Firestore, Crashlytics)',
      'Gemini with Groq fallback', 'Cloudflare Workers', 'Play Billing 7', 'GitHub Actions',
    ],
    points: [
      'Recipe search, cooking mode, favorites, and a shopping list grouped by recipe.',
      'MVVM + Clean Architecture; 5-table Room cache with a bundled offline fallback.',
      'AI recipe generation, remix and a multi-day meal planner, routed through a Cloudflare Worker authenticated with Firebase ID tokens, so no API keys ship in the APK.',
      'Subscriptions enforced server-side by validating Play purchase tokens and setting a Firebase custom claim.',
      'CI runs build, lint and unit tests on every push.',
    ],
    evidence: {
      type: 'flow',
      title: 'How an AI request travels',
      description:
        'The app sends a Firebase ID token to a Cloudflare Worker, which calls Gemini and falls back to Groq. No API keys ship in the APK.',
    },
  },
  {
    id: 'dsa-tracker',
    name: 'DSA Practice Tracker',
    subtitle: 'Spaced-repetition PWA',
    live: 'https://personaldsatracker.vercel.app',
    code: 'https://github.com/kartikkh1607/personal_dsa_tracker',
    stack: ['React', 'Vite', 'Tailwind', 'Supabase', 'Vitest', 'Playwright', 'Vercel'],
    points: [
      'Installable, offline-first PWA with 917 problems across 23 topics.',
      'Spaced review at 7, 30 and 90 days; a failed review drops to a 3-day re-check.',
      'Optional cross-device sync on Supabase: Google sign-in, row-level security, merge.',
      'Vitest unit tests and Playwright end-to-end tests.',
    ],
    evidence: {
      type: 'sequence',
      title: 'Review schedule',
      steps: [
        { days: 3, label: 'Re-check after a failed review' },
        { days: 7, label: 'First review' },
        { days: 30, label: 'Second review' },
        { days: 90, label: 'Third review' },
      ],
    },
  },
]

export const earlierWork = [
  {
    name: 'Kometo',
    description: 'Food-delivery app: Jetpack Compose, Clean Architecture, Hilt, Firebase Auth.',
    code: 'https://github.com/kartikkh1607/Kometo',
  },
  {
    name: 'MyWishlist',
    description: 'Offline wishlist manager: Room, Kotlin Flow, MVVM.',
    code: 'https://github.com/kartikkh1607/MyWishListApp',
  },
]

export const skills = [
  {
    group: 'GenAI & LLMs',
    items: [
      'RAG', 'prompt engineering', 'embeddings', 'vector search (Qdrant)', 'query rewriting',
      'structured outputs (JSON Schema, Pydantic)', 'streaming', 'LLM evaluation (hit@k, MRR, golden sets)',
      'guardrails and prompt-injection defense', 'Groq and Gemini APIs',
    ],
  },
  {
    group: 'Backend & web',
    items: ['Python', 'FastAPI', 'REST APIs', 'React', 'TypeScript/JavaScript', 'Vite', 'Tailwind'],
  },
  { group: 'Testing', items: ['pytest', 'Vitest', 'Playwright'] },
  {
    group: 'Cloud & DevOps',
    items: [
      'AWS (Lambda, API Gateway, SQS, DynamoDB, EC2, VPC)', 'Terraform', 'GitHub Actions',
      'Cloudflare Workers', 'Vercel', 'Render', 'Supabase', 'Firebase',
    ],
  },
  {
    group: 'Android',
    items: [
      'Kotlin', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'Hilt', 'Room', 'Retrofit',
      'Coroutines', 'Flow',
    ],
  },
  { group: 'Also', items: ['C++ (DSA)', 'Java'] },
]

export const achievements = [
  { value: '450+', label: 'LeetCode problems, 100+ day streak' },
  { label: 'National-level participant, Bharatiya Antariksh Hackathon 2025 (ISRO & Hack2Skill)' },
]

export const certifications = [
  { name: 'AWS Certified CloudOps Engineer – Associate', date: 'Apr 2026' },
  { name: 'AWS Certified Data Engineer – Associate', date: 'Apr 2026' },
  { name: 'AWS Certified AI Practitioner', date: 'Dec 2025' },
  { name: 'AWS Certified Cloud Practitioner', date: 'Dec 2025' },
]

