"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface BadgeProps {
  icon: string;
  label: string;
  sublabel?: string;
  color: "cyan" | "violet" | "indigo";
}

const colorMap = {
  cyan: {
    border: "border-[rgba(20,184,166,0.25)]",
    bg: "bg-[rgba(20,184,166,0.08)]",
    text: "text-[#0d9488]",
    dot: "bg-[#14b8a6]",
    glow: "rgba(20,184,166,0.3)",
    hover: "rgba(20,184,166,0.12)",
  },
  violet: {
    border: "border-[rgba(224,122,138,0.25)]",
    bg: "bg-[rgba(224,122,138,0.08)]",
    text: "text-[#c0566a]",
    dot: "bg-[#e07a8a]",
    glow: "rgba(224,122,138,0.3)",
    hover: "rgba(224,122,138,0.12)",
  },
  indigo: {
    border: "border-[rgba(30,45,74,0.2)]",
    bg: "bg-[rgba(30,45,74,0.06)]",
    text: "text-[#1e2d4a]",
    dot: "bg-[#1e2d4a]",
    glow: "rgba(30,45,74,0.2)",
    hover: "rgba(30,45,74,0.08)",
  },
};

function Badge({ icon, label, sublabel, color }: BadgeProps) {
  const c = colorMap[color];
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative group flex items-center gap-3 px-4 py-3 rounded-xl border ${c.border} ${c.bg} cursor-default`}
      style={{
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${c.glow}, 0 0 60px ${c.hover}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <span className="text-xl">{icon}</span>
      <div>
        <div className={`font-mono text-xs font-semibold tracking-wider ${c.text}`}>
          {label}
        </div>
        {sublabel && (
          <div className="text-xs text-[#4a4a5e] mt-0.5">{sublabel}</div>
        )}
      </div>
      {/* Animated dot */}
      <div
        className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${c.dot} pulse-dot opacity-70`}
      />
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Profile() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      id="profile"
      className="relative py-24 lg:py-32 px-6 sm:px-8 lg:px-12 mesh-bg grid-bg"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        {/* Section label */}
        <motion.div variants={itemVariants} className="mb-12 flex items-center gap-4">
          <div className="font-mono text-xs text-[#4a4a5e] tracking-widest uppercase">
            01 / Profile
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(0,212,255,0.2)] to-transparent" />
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main identity card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 glass-card rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[rgba(0,212,255,0.04)] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[rgba(124,58,237,0.04)] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-2">
                <span className="font-mono text-xs text-[#7a7a8e] tracking-widest uppercase">
                  Identity
                </span>
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
                <span className="gradient-text-cool">ANSA</span>
                <br />
                <span className="text-[#1a1a2e]">SHAHID</span>
              </h2>

              <div className="h-px bg-gradient-to-r from-[rgba(20,184,166,0.4)] to-transparent mb-6" />

              <p className="text-[#4a4a5e] text-base leading-relaxed max-w-lg font-light mb-8">
                A dedicated Cybersecurity Professional and AI Security Analyst
                channeling her expertise into AI security. Focused on identifying
                and neutralizing vulnerabilities across AI-powered systems —
                from LLM threat modeling and prompt injection to hands-on
                penetration testing and static code analysis.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  "LLM Security",
                  "Prompt Injection",
                  "SAST",
                  "Penetration Testing",
                  "AI Security",
                  "OSINT",
                  "eJPT",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.5)] text-[#4a4a5e] hover:border-[rgba(20,184,166,0.3)] hover:text-[#0d9488] transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Credentials & Stats column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Certifications card */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[rgba(20,184,166,0.5)] via-[rgba(224,122,138,0.2)] to-transparent" />
              <div className="mb-4">
                <span className="font-mono text-xs text-[#7a7a8e] tracking-widest uppercase">
                  Certifications & Milestones
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <Badge
                  icon="🛡️"
                  label="Cyber Security Professional"
                  sublabel="Active Practitioner"
                  color="cyan"
                />
                <Badge
                  icon="🎯"
                  label="TryHackMe — Top 3%"
                  sublabel="Global Ranking · CipherMira"
                  color="violet"
                />
                <Badge
                  icon="🏅"
                  label="(ISC)² CC Certified"
                  sublabel="Certified in Cybersecurity"
                  color="indigo"
                />

                <Badge
                  icon="⚔️"
                  label="eJPT — Junior Penetration Tester"
                  sublabel="Completed eLearnSecurity Path"
                  color="violet"
                />
              </div>
            </div>

            {/* Stats mini-cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-xl p-5 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(20,184,166,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-3xl font-black gradient-text mb-1">4+</div>
                <div className="font-mono text-xs text-[#4a4a5e] uppercase tracking-wider">
                  Projects
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-xl p-5 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(224,122,138,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-2xl font-black text-[#e07a8a] mb-1">Top 3%</div>
                <div className="font-mono text-xs text-[#7a7a8e] uppercase tracking-wider">
                  TryHackMe
                </div>
              </motion.div>
            </div>

            {/* Status card */}
            <div className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
              <span className="font-mono text-xs text-[#4a4a5e]">
                Available for{" "}
                <span className="text-emerald-400">security engagements</span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
