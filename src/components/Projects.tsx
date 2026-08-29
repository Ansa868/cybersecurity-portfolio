"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent: string;
  accentRgb: string;
  icon: string;
  status: string;
}

const projects: Project[] = [
  {
    id: "ai-sast",
    number: "01",
    title: "AI-Assisted SAST",
    subtitle: "Static Application Security Testing",
    description:
      "A next-generation code analysis pipeline that augments traditional SAST tooling with AI-driven vulnerability pattern recognition. Generates severity-ranked reports with contextual remediation guidance.",
    tags: ["SAST", "Code Analysis", "Vulnerability Research", "CI/CD"],
    accent: "#14b8a6",
    accentRgb: "20,184,166",
    icon: "◈",
    status: "Active",
  },
  {
    id: "auto-osint",
    number: "02",
    title: "Automated OSINT",
    subtitle: "Intelligence Gathering Framework",
    description:
      "Open-source intelligence gathering and analysis framework. Automates reconnaissance across public datasets, social platforms, and technical registries to build comprehensive threat actor profiles.",
    tags: ["OSINT", "Automation", "Threat Intel", "Recon"],
    accent: "#e07a8a",
    accentRgb: "224,122,138",
    icon: "◉",
    status: "Beta",
  },
  {
    id: "ai-security",
    number: "03",
    title: "AI Security Analysis",
    subtitle: "Adversarial AI Threat Study",
    description:
      "In-depth security analysis covering jailbreaking methodologies, data poisoning attack vectors, and guardrail evasion techniques in modern LLM systems. Focused on practical threat identification and mitigation strategies for AI-powered applications.",
    tags: ["Jailbreaking", "Data Poisoning", "Guardrail Evasion", "LLM Security"],
    accent: "#1e2d4a",
    accentRgb: "30,45,74",
    icon: "◎",
    status: "Ongoing",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      id={`project-${project.id}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative glass-card rounded-2xl p-7 overflow-hidden cursor-default flex flex-col"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = `0 0 30px rgba(${project.accentRgb},0.15), 0 20px 60px rgba(0,0,0,0.4)`;
        el.style.borderColor = `rgba(${project.accentRgb},0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:opacity-100 opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      {/* Background glow blob */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `rgba(${project.accentRgb},0.06)` }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border"
            style={{
              borderColor: `rgba(${project.accentRgb},0.25)`,
              background: `rgba(${project.accentRgb},0.08)`,
              color: project.accent,
            }}
          >
            {project.icon}
          </div>
          <div>
            <div className="font-mono text-xs text-[#1e2d4a] tracking-widest font-semibold">
              {project.number}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <span
          className="font-mono text-xs px-2.5 py-1 rounded-full border"
          style={{
            borderColor: `rgba(${project.accentRgb},0.25)`,
            background: `rgba(${project.accentRgb},0.05)`,
            color: project.accent,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Title block */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-[#1a1a2e] mb-1 tracking-tight">
          {project.title}
        </h3>
        <p
          className="font-mono text-xs tracking-wider"
          style={{ color: project.accent }}
        >
          {project.subtitle}
        </p>
      </div>

      {/* Separator */}
      <div
        className="h-px mb-5 opacity-20"
        style={{ background: project.accent }}
      />

      {/* Description */}
      <p className="text-[#1e2d4a] text-sm leading-relaxed font-normal flex-1 mb-6">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2.5 py-1 rounded-md border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.6)] text-[#1e2d4a] font-medium group-hover:text-[#0d9488] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow indicator */}
      <motion.div
        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <span style={{ color: project.accent }} className="text-sm font-mono">
          →
        </span>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 lg:py-32 px-6 sm:px-8 lg:px-12"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(224,122,138,0.4)] to-transparent" />

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="font-mono text-xs text-[#1e2d4a] tracking-widest uppercase font-semibold">
              02 / Work
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[rgba(20,184,166,0.3)] to-transparent" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-4">
                <span className="text-[#1a1a2e]">Case</span>{" "}
                <span className="gradient-text">Studies</span>
              </h2>
              <p className="text-[#1e2d4a] text-base font-normal max-w-md">
                Selected security projects at the intersection of AI and
                offensive security research.
              </p>
            </div>

            <div className="font-mono text-xs text-[#1e2d4a] font-semibold flex items-center gap-2 self-end lg:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e07a8a] pulse-dot" />
              {projects.length} Projects
            </div>
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
