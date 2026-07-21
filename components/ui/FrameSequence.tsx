"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-scrubbed image-sequence background (Apple / Awwwards technique).
 *
 * A fixed full-viewport <canvas> draws the frame that matches total page-scroll
 * progress, so the greenhouse pushes forward as you scroll, with all content
 * overlaid on top. A dark-verdant veil sits above it for text legibility.
 *
 * Performance / mobile:
 *  - Device-tier sets: 121 frames @2560 (desktop) vs 61 @1280 (mobile) WebP.
 *  - One canvas draw per scroll rAF (deduped by frame index) — cheap.
 *  - Frames preload as <img>; draw skips any not-yet-decoded frame and keeps
 *    the previous one, so scrubbing never blocks or flashes.
 *  - DPR capped at 2; redraws on resize.
 */

const DESKTOP = { dir: "/frames/d", count: 121 };
const MOBILE = { dir: "/frames/m", count: 61 };
const pad = (n: number) => String(n).padStart(3, "0");

export function FrameSequence() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d", { alpha: false });
    if (!cv || !ctx) return;

    const set = window.matchMedia("(max-width: 768px)").matches ? MOBILE : DESKTOP;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const images: HTMLImageElement[] = [];
    let current = -1;
    let target = 0;
    let raf = 0;

    const draw = (idx: number, force = false) => {
      const i = Math.max(0, Math.min(set.count - 1, Math.round(idx)));
      if (i === current && !force) return;
      const img = images[i];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      current = i;
      const cw = cv.width;
      const ch = cv.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * ir;
        dy = 0;
        dx = (cw - dw) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      draw(current >= 0 ? current : 0, true);
    };

    for (let i = 0; i < set.count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `${set.dir}/frame-${pad(i + 1)}.webp`;
      img.onload = () => {
        if (i === 0) resize();
        if (i === Math.round(target)) draw(target);
      };
      images[i] = img;
    }

    resize();
    window.addEventListener("resize", resize);

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        target = self.progress * (set.count - 1);
        if (!raf)
          raf = requestAnimationFrame(() => {
            raf = 0;
            draw(target);
          });
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
      st.kill();
      images.forEach((im) => {
        im.onload = null;
      });
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full"
        style={{ backgroundColor: "#0c1310" }}
      />
      {/* Legibility veil — darker top/bottom for nav + footer, greenhouse shows
          through the middle. Fixed, opacity-only → cheap. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,15,11,0.72) 0%, rgba(8,15,11,0.38) 26%, rgba(8,15,11,0.42) 62%, rgba(8,15,11,0.82) 100%)",
        }}
      />
    </>
  );
}
