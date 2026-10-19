export const personalInfo = {
  name: "Kartik Khandelwal",
  tagline: "Android Developer crafting smooth, modern, and high-performance mobile experiences.",
  role: "Android Developer",
  college: "KIET Group of Institutions",
  branch: "B.Tech Information Technology",
  year: "2nd Year",
  city: "Ghaziabad, Uttar Pradesh",
  email: "kartikkhandelwal1234589@gmail.com",
  github: "https://github.com/kartikkh1607",
  linkedin: "https://www.linkedin.com/in/kartik-khandelwal-a71554327/",
  resumeText: "Available on Request",
  about: `Passionate Android developer focused on building scalable and modern mobile
applications using Kotlin and Jetpack Compose. I enjoy creating smooth UI/UX
experiences with clean architecture, modern design systems, and polished animations
inspired by Apple-level fluidity and Material You.`,
}

export const skills = [
  {
    category: "Languages",
    icon: "Code2",
    items: ["Kotlin", "Java", "C++", "Python"],
  },
  {
    category: "Android",
    icon: "Smartphone",
    items: [
      "Jetpack Compose",
      "MVVM Architecture",
      "Clean Architecture",
      "Navigation Compose",
      "Material Design 3",
    ],
  },
  {
    category: "Libraries & Tools",
    icon: "Layers",
    items: [
      "Retrofit & REST APIs",
      "Room Database",
      "Kotlin Coroutines & Flow",
      "Hilt Dependency Injection",
      "Firebase Authentication",
    ],
  },
  {
    category: "Other",
    icon: "Wrench",
    items: ["Git & GitHub", "AWS Cloud", "DSA & Problem Solving"],
  },
]

export const projects = [
  {
    id: 1,
    name: "MyRecipe",
    subtitle: "Recipe Browser Android App",
    description:
      "A modern recipe browsing app built with Jetpack Compose and Retrofit. Features recipe search, favorites management, and an automated shopping list — all powered by REST APIs with a clean Material You UI.",
    tech: ["Kotlin", "Jetpack Compose", "Retrofit", "REST API", "MVVM"],
    github: "https://github.com/kartikkh1607/MyrecipeApp",
    liveDemo: null,
    screenshot: "/myrecipe.png",
    color: "from-teal-400 to-cyan-500",
    accentColor: "#2dd4bf",
    icon: "🍳",
    featured: true,
  },
  {
    id: 2,
    name: "MyWishlist",
    subtitle: "Offline Wishlist Manager",
    description:
      "A fully offline wishlist manager with Room Database and Kotlin Flow. Supports item filtering, tagging, and real-time UI updates — no internet required. MVVM architecture keeps it clean and testable.",
    tech: ["Kotlin", "Room Database", "Kotlin Flow", "MVVM", "Compose"],
    github: "https://github.com/kartikkh1607/MyShoppingListApp",
    liveDemo: null,
    screenshot: "/mywishlist.png",
    color: "from-violet-400 to-purple-500",
    accentColor: "#a855f7",
    icon: "📋",
    featured: true,
  },
  {
    id: 3,
    name: "Kometo",
    subtitle: "Food Delivery Android App",
    description:
      "A scalable Zomato-inspired food delivery app with Firebase Authentication, Clean Architecture layers, reusable Compose UI components, and type-safe navigation for a production-grade experience.",
    tech: ["Kotlin", "Firebase", "Clean Architecture", "Compose", "Hilt"],
    github: "https://github.com/kartikkh1607",
    liveDemo: null,
    screenshot: "/kometo.png",
    color: "from-orange-400 to-rose-500",
    accentColor: "#f97316",
    icon: "🚀",
    featured: true,
  },
]

export const moreProjects = [
  {
    id: 4,
    name: "Mood Quote",
    description: "Animated mood-based quote app with full-screen gradient backgrounds and glassmorphism UI.",
    tech: ["Kotlin", "Compose", "Animations"],
    github: "https://github.com/kartikkh1607",
    icon: "💭",
    color: "#6366f1",
  },
  {
    id: 5,
    name: "Unit Converter",
    description: "Clean unit conversion app supporting length, weight, temperature, and more with instant calculations.",
    tech: ["Kotlin", "Compose", "MVVM"],
    github: "https://github.com/kartikkh1607",
    icon: "⚖️",
    color: "#0ea5e9",
  },
  {
    id: 6,
    name: "TaskFlow",
    description: "Productivity task manager with priority queuing, due date reminders, and offline-first Room DB storage.",
    tech: ["Kotlin", "Room", "Coroutines"],
    github: "https://github.com/kartikkh1607",
    icon: "✅",
    color: "#22c55e",
  },
]

export const timeline = [
  {
    year: "2023",
    title: "Started B.Tech — Information Technology",
    org: "KIET Group of Institutions, Ghaziabad",
    type: "education",
    icon: "🎓",
    description: "Began my engineering journey, discovering my passion for mobile development and clean code.",
  },
  {
    year: "2024",
    title: "Learned Android Development",
    org: "Self-taught — Kotlin & Jetpack Compose",
    type: "milestone",
    icon: "📱",
    description: "Dove deep into Kotlin, Jetpack Compose, and Android SDK. Built first real app — MyWishlist — with Room DB and MVVM.",
  },
  {
    year: "2024",
    title: "Explored Clean Architecture",
    org: "Personal Projects",
    type: "milestone",
    icon: "🏗️",
    description: "Adopted Clean Architecture + Hilt DI + Kotlin Flow. Built MyRecipe app with REST API integration and Retrofit.",
  },
  {
    year: "2025",
    title: "Started AWS Cloud Learning",
    org: "Self-paced — AWS Certified Cloud Practitioner Path",
    type: "learning",
    icon: "☁️",
    description: "Expanded beyond mobile to cloud infrastructure. Learning EC2, S3, Lambda, and cloud-native design.",
  },
  {
    year: "2025",
    title: "Open to Work",
    org: "Seeking Internships & Freelance",
    type: "current",
    icon: "🟢",
    description: "Actively looking for Android Developer internships and freelance mobile app projects.",
  },
]

export const stats = [
  { label: "Projects Built",   value: "9+" },
  { label: "Primary Language", value: "Kotlin" },
  { label: "Architecture",     value: "MVVM" },
  { label: "Status",           value: "Open to Work" },
]