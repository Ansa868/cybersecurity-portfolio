"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 sm:px-8 lg:px-12 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#14b8a6] to-[#e07a8a] flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-white">A</span>
          </div>
          <span className="font-mono text-xs text-[#7a7a8e] tracking-widest uppercase">
            Ansa Shahid © {currentYear}
          </span>
        </div>

        {/* Center: Status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-mono text-xs text-[#7a7a8e]">
            Systems Operational
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ansa-shahid-bb9666361/" },
            { label: "TryHackMe", href: "https://tryhackme.com/p/CipherMira" },
          ].map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              className="font-mono text-xs text-[#7a7a8e] hover:text-[#14b8a6] transition-colors duration-300 tracking-wider"
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
