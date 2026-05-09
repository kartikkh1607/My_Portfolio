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
    color: "from-mint-400 to-teal-500",
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
    color: "from-violet-400 to-purple-500",
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
    color: "from-orange-400 to-rose-500",
    icon: "🚀",
    featured: true,
  },
]

export const stats = [
  { label: "Projects Built",   value: "9+" },
  { label: "Primary Language", value: "Kotlin" },
  { label: "Architecture",     value: "MVVM" },
  { label: "Status",           value: "Open to Work" },
]