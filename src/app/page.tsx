"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

// Dynamic import for canvas/scroll components (client-only)
const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{ height: "500vh", background: "#c8c8cc" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#14b8a6] border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-[#7a7a8e] tracking-widest">
          LOADING...
        </span>
      </div>
    </div>
  ),
});

const Overlay = dynamic(() => import("@/components/Overlay"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative bg-[#c8c8cc]">
      <Navbar />

      {/* Scrollytelling section — canvas + overlay stacked */}
      <div className="relative" style={{ height: "500vh" }}>
        <ScrollyCanvas />
        <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: "500vh" }}>
          <Overlay />
        </div>
      </div>

      {/* Below-the-fold sections */}
      <Profile />
      <Projects />
      <Footer />
    </main>
  );
}
