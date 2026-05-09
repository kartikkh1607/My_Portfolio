import { motion } from "framer-motion";
import { projects } from "../data/portfolio.js";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  blurIn,
  staggerContainer,
  staggerFast,
  cardReveal,
  scaleIn,
  ease,
  viewport,
} from "../utils/animations.js";

function TechTag({ tech, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ delay: 0.15 + index * 0.05, ease: ease.outExpo }}
      whileHover={{
        scale: 1.08,
        y: -2,
        color: "#2dd4bf",
        borderColor: "rgba(45,212,191,0.35)",
        background: "rgba(45,212,191,0.06)",
        transition: { duration: 0.15 },
      }}
      className="tag cursor-default"
    >
      {tech}
    </motion.span>
  );
}

function FeaturedProject({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="relative rounded-3xl overflow-hidden mb-6 group"
      style={{
        background: "rgba(12,26,46,0.7)",
        border: "1px solid rgba(30,58,82,0.7)",
        backdropFilter: "blur(20px)",
      }}
      whileHover={{
        borderColor: "rgba(45,212,191,0.2)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(45,212,191,0.05)",
        transition: { duration: 0.35 },
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Featured badge */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ delay: 0.5, ease: ease.outExpo }}
      >
        <span
          className="font-mono text-2xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{
            background: "rgba(45,212,191,0.08)",
            border: "1px solid rgba(45,212,191,0.25)",
            color: "#2dd4bf",
          }}
        >
          <span style={{ color: "#fbbf24" }}>★</span>
          Featured
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left — Content */}
        <div className="lg:col-span-3 p-10 flex flex-col gap-7 justify-center">
          {/* Icon + Title */}
          <div className="flex items-start gap-5">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color}
                          flex items-center justify-center text-3xl flex-shrink-0 shadow-depth`}
              whileHover={{ scale: 1.1, rotate: -6 }}
              transition={{ duration: 0.25 }}
            >
              {project.icon}
            </motion.div>
            <div>
              <p
                className="font-mono text-2xs uppercase tracking-widest mb-1.5"
                style={{ color: "#2dd4bf" }}
              >
                {project.subtitle}
              </p>
              <h3
                className="font-display font-bold text-white tracking-tight"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: "1.1",
                }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className="font-light leading-relaxed"
            style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.8" }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <TechTag key={t} tech={t} index={i} />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 pt-1">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View Code
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </motion.a>
          </div>
        </div>

        {/* Right — Visual Panel */}
        <div
          className="lg:col-span-2 relative hidden lg:flex items-center
                     justify-center p-10 overflow-hidden"
          style={{
            borderLeft: "1px solid rgba(30,58,82,0.5)",
            background: "rgba(5,13,24,0.5)",
          }}
        >
          {/* Background number */}
          <div
            className="absolute inset-0 flex items-center justify-center
                       select-none pointer-events-none"
          >
            <span
              className="font-display font-black"
              style={{
                fontSize: "11rem",
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, rgba(45,212,191,0.06), transparent)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              01
            </span>
          </div>

          {/* Glow orb */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(45,212,191,0.06), transparent 65%)",
            }}
          />

          {/* Floating stack items */}
          <div className="relative z-10 flex flex-col gap-3 w-full max-w-[200px]">
            {project.tech.slice(0, 4).map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: 0.3 + i * 0.1, ease: ease.outExpo }}
                animate={{ y: [0, -4, 0] }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default"
                style={{
                  background: "rgba(15,32,53,0.85)",
                  border: "1px solid rgba(45,212,191,0.1)",
                  backdropFilter: "blur(16px)",
                  animationDuration: `${3.5 + i * 0.6}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#2dd4bf" }}
                />
                <span className="font-mono text-xs text-white">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={cardReveal}
      className="relative rounded-2xl overflow-hidden group cursor-default"
      style={{
        background: "rgba(12,26,46,0.6)",
        border: "1px solid rgba(30,58,82,0.7)",
        backdropFilter: "blur(16px)",
      }}
      whileHover={{
        y: -5,
        borderColor: "rgba(45,212,191,0.2)",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.45), 0 0 30px rgba(45,212,191,0.05)",
        transition: { duration: 0.25 },
      }}
    >
      {/* Hover top glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)",
          opacity: 0,
        }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
      />

      <div className="p-7 grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        {/* Left — Number + Icon */}
        <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4">
          <span
            className="font-display font-black select-none leading-none"
            style={{
              fontSize: "3.5rem",
              background:
                "linear-gradient(135deg, rgba(30,58,82,0.9), rgba(30,58,82,0.3))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transition: "all 0.3s",
            }}
          >
            0{index + 1}
          </span>
          <motion.div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color}
                        flex items-center justify-center text-xl shadow-depth-sm`}
            whileHover={{ scale: 1.12, rotate: -6 }}
            transition={{ duration: 0.2 }}
          >
            {project.icon}
          </motion.div>
        </div>

        {/* Middle — Content */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div>
            <p
              className="font-mono text-2xs uppercase tracking-widest mb-1.5"
              style={{ color: "#2dd4bf" }}
            >
              {project.subtitle}
            </p>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
          </div>
          <p
            className="font-light leading-relaxed text-sm"
            style={{ color: "#64748b" }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, i) => (
              <TechTag key={t} tech={t} index={i} />
            ))}
          </div>
        </div>

        {/* Right — Links */}
        <div className="lg:col-span-1 flex lg:flex-col gap-2.5 justify-start lg:items-end">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs
                       px-4 py-2.5 rounded-xl border transition-all duration-200"
            style={{
              borderColor: "rgba(30,58,82,0.8)",
              color: "#64748b",
              background: "rgba(15,32,53,0.4)",
            }}
            whileHover={{
              scale: 1.04,
              y: -2,
              borderColor: "rgba(45,212,191,0.35)",
              color: "#2dd4bf",
              background: "rgba(45,212,191,0.04)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Code
          </motion.a>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "0.72rem", padding: "10px 14px" }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const allProjects = projects;

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{ background: "rgba(5,13,24,0.6)" }}
    >
      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 100% 40%, rgba(45,212,191,0.04), transparent)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.04), transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(40%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.03), transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeUp} className="section-label">
            03 — projects
          </motion.p>
          <motion.h2
            variants={blurIn}
            className="font-display font-bold tracking-tight text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: "1.1" }}
          >
            Things I've Built
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            Real Android projects — each built with clean architecture, modern
            Jetpack libraries, and attention to detail.
          </motion.p>
        </motion.div>

        {/* Featured */}
        <FeaturedProject project={featured} />

        {/* Rest */}
        <motion.div
          className="flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {allProjects.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <div
            className="w-px h-12"
            style={{
              background:
                "linear-gradient(to bottom, rgba(45,212,191,0.3), transparent)",
            }}
          />
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "#334155" }}
          >
            more on github
          </p>
          <motion.a
            href="https://github.com/kartikkh1607"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
