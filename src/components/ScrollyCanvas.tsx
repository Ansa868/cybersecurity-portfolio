"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 192;
const FRAME_PATH = (index: number) =>
  `/frames/frame_${String(index).padStart(3, "0")}_delay-0.042s.webp`;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const isLoadedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Draw frame with cover-fit logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const images = imagesRef.current;

    if (!canvas || !ctx || !images[index] || !images[index].complete) return;

    const img = images[index];
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // object-fit: cover
    const scale = Math.max(cw / iw, ch / ih);
    const scaledW = iw * scale;
    const scaledH = ih * scale;
    const offsetX = (cw - scaledW) / 2;
    const offsetY = (ch - scaledH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
  }, []);

  // Resize canvas to fill viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        // Draw first frame as soon as it's ready
        if (i === 0 && !isLoadedRef.current) {
          isLoadedRef.current = true;
          drawFrame(0);
        }
        if (loaded === TOTAL_FRAMES) {
          // All frames ready
          drawFrame(currentFrameRef.current);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  // Canvas resize handler
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Listen to scroll progress and update canvas
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(latest))
    );
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(idx);
    });
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
      id="scrolly-canvas-section"
    >
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block", background: "#c8c8cc" }}
          aria-label="Cinematic scroll animation"
        />
      </div>
    </div>
  );
}
