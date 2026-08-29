"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[rgba(200,200,204,0.85)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.08)]"
            : "py-5 bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Ansa Shahid home">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#14b8a6] to-[#e07a8a] flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <span className="font-mono text-xs font-bold text-white">AS</span>
            </div>
            <span className="font-mono text-xs tracking-widest text-[#4a4a5e] group-hover:text-[#14b8a6] transition-colors duration-300 hidden sm:block">
              ANSA SHAHID
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                role="listitem"
                className="font-mono text-xs px-4 py-2 rounded-lg text-[#4a4a5e] hover:text-[#14b8a6] hover:bg-[rgba(20,184,166,0.08)] transition-all duration-300 tracking-widest uppercase"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2">
            {/* Social icon links */}
            <motion.a
              href="https://www.linkedin.com/in/ansa-shahid-bb9666361/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              title="LinkedIn"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.4)] text-[#3a3a5e] hover:text-[#0077b5] hover:border-[rgba(0,119,181,0.4)] hover:bg-[rgba(0,119,181,0.08)] transition-all duration-300 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://tryhackme.com/p/CipherMira"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              title="TryHackMe"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.4)] text-[#3a3a5e] hover:text-[#c11111] hover:border-[rgba(193,17,17,0.4)] hover:bg-[rgba(193,17,17,0.08)] transition-all duration-300 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.705 0C5.25 0 .82 4.363.82 9.73c0 3.215 1.61 6.074 4.104 7.865L2.55 24h8.156l-2.39-6.405A9.617 9.617 0 0010.705 18c5.455 0 9.884-4.363 9.884-9.73C20.59 2.963 16.16 0 10.705 0zm0 14.84a5.11 5.11 0 110-10.22 5.11 5.11 0 010 10.22z"/>
              </svg>
            </motion.a>



            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`w-5 h-px bg-[#4a4a5e] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
              <span className={`w-5 h-px bg-[#4a4a5e] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-px bg-[#4a4a5e] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[rgba(210,210,215,0.95)] backdrop-blur-xl p-4 md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block font-mono text-sm px-4 py-3 rounded-xl text-[#4a4a5e] hover:text-[#14b8a6] hover:bg-[rgba(20,184,166,0.08)] transition-all duration-300 tracking-widest"
              >
                {label}
              </a>
            ))}
            <div className="border-t border-[rgba(255,255,255,0.06)] mt-3 pt-3 flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/ansa-shahid-bb9666361/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block font-mono text-sm px-4 py-3 rounded-xl text-[#8b8b9e] hover:text-[#0077b5] hover:bg-[rgba(0,119,181,0.05)] transition-all duration-300 tracking-widest"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://tryhackme.com/p/CipherMira"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block font-mono text-sm px-4 py-3 rounded-xl text-[#8b8b9e] hover:text-[#c11111] hover:bg-[rgba(193,17,17,0.05)] transition-all duration-300 tracking-widest"
              >
                TryHackMe ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
