# Kartik Khandelwal — Portfolio

A modern, animated personal portfolio for **Kartik Khandelwal**, an Android Developer.
Built with React + Vite, styled with Tailwind CSS, and brought to life with Framer Motion
animations and an interactive Three.js particle background.

🔗 **Live:** https://my-portfolio-azure-nine-26.vercel.app/

## ✨ Features

- **Animated hero** with a global, full-page Three.js particle background
- **Smooth scroll** navigation with an animated scroll-progress bar
- **Section-by-section reveal** animations powered by Framer Motion
- **Timeline**, **Skills**, and **Projects** sections driven by a single content file
- **Contact form** wired up with EmailJS
- **Back-to-top** button and a custom cursor
- **SEO-ready** with Open Graph / Twitter meta tags and a custom favicon
- **Fully responsive** and mobile-optimized

## 🛠 Tech Stack

| Area        | Tools                                                        |
| ----------- | ----------------------------------------------------------- |
| Framework   | [React 18](https://react.dev), [Vite 5](https://vitejs.dev) |
| Styling     | [Tailwind CSS](https://tailwindcss.com)                     |
| Animation   | [Framer Motion](https://www.framer.com/motion/)             |
| 3D / WebGL  | [Three.js](https://threejs.org), React Three Fiber, Drei    |
| Icons       | [Lucide React](https://lucide.dev)                          |
| Email       | [EmailJS](https://www.emailjs.com)                          |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## 📁 Project Structure

```
src/
├── components/        # Navbar, Hero, About, Timeline, Skills, Projects, Contact, Footer, etc.
├── three/             # ParticlesCanvas — Three.js particle background
├── data/
│   └── portfolio.js   # Central content store (edit text, skills, projects, links here)
├── styles/
│   └── index.css      # Tailwind + global styles
├── utils/             # Animation helpers
├── App.jsx            # Layout & section composition
└── main.jsx           # App entry point
public/                # Resume, project screenshots, favicon assets
```

## ✏️ Customizing Content

Most of the site's content lives in [`src/data/portfolio.js`](src/data/portfolio.js).
Update your personal info, about paragraphs, skills, and projects there — no need to
touch the components.

## 📦 Deployment

The site is deployed on [Vercel](https://vercel.com). Any push to `main` triggers an
automatic deployment.

## 📫 Contact

- **Email:** kartikkhandelwal1234589@gmail.com
- **GitHub:** [@kartikkh1607](https://github.com/kartikkh1607)
- **LinkedIn:** [Kartik Khandelwal](https://www.linkedin.com/in/kartik-khandelwal-2b556a280/)
