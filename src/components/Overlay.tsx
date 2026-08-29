"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Name card: fades in immediately, stays visible through most of scroll
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.75, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.05, 0.75, 0.9], [24, 0, 0, -24]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 25 });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ height: "500vh" }}
      aria-hidden="false"
    >
      <div className="sticky top-0 h-screen w-full z-20 pointer-events-none">

        {/* Name + tagline — right side */}
        <motion.div
          style={{ opacity: smoothOpacity, y: smoothY }}
          className="absolute inset-0 flex flex-col justify-center items-end px-8 sm:px-16 lg:px-24 text-right"
        >
          <div className="max-w-sm">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3">
              <span className="gradient-text-cool">ANSA</span>
              <br />
              <span className="text-[#1a1a2e]">SHAHID</span>
            </h1>

            {/* Thin accent line */}
            <div className="h-0.5 w-full bg-gradient-to-l from-[#14b8a6] to-transparent mb-4" />

            {/* Brief description */}
            <p className="font-mono text-xs sm:text-sm text-[#1e2d4a] leading-relaxed tracking-wide font-medium">
              Cybersecurity analyst expanding her expertise towards{" "}
              <span className="text-[#14b8a6] font-semibold">AI security</span>.
            </p>
          </div>
        </motion.div>

        {/* Scroll hint at bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-[#7a7a8e] tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#14b8a6] to-transparent"
          />
        </div>

      </div>
    </div>
  );
}
