"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-scrubbed image-sequence background (Apple / Awwwards technique).
 *
 * A fixed full-viewport <canvas> draws the frame matching total page-scroll
 * progress, so the floating log moves as you scroll, with all content overlaid
 * on top. A paper veil sits above it for text legibility.
 *
 * Fast first paint:
 *  - The canvas is filled paper immediately (never the default opaque black).
 *  - A small poster.jpg is fetched high-priority and drawn as an instant
 *    placeholder, so the hero shows an image while the full set streams in.
 *  - Frame 0 is high-priority; the rest are low-priority, so the first frame
 *    wins bandwidth instead of competing with all 121 at once.
 *
 * Perf / mobile:
 *  - Device-tier sets: 121 frames @1920 (desktop) vs 61 @1280 (mobile) WebP.
 *  - One canvas draw per scroll rAF (deduped by frame index) — cheap.
 *  - Draw skips any not-yet-decoded frame and keeps the previous one, so
 *    scrubbing never blocks or flashes. DPR capped at 2; redraws on resize.
 */

const PAPER = "#e8eee7";
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

    // Cover-fit an image onto the canvas (like background-size: cover).
    const paintCover = (img: HTMLImageElement) => {
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

    const draw = (idx: number, force = false) => {
      const i = Math.max(0, Math.min(set.count - 1, Math.round(idx)));
      if (i === current && !force) return;
      const img = images[i];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      current = i;
      paintCover(img);
    };

    // Instant placeholder: a single small poster, fetched ahead of the set.
    const poster = new Image();
    poster.decoding = "async";
    poster.setAttribute("fetchpriority", "high");
    poster.src = "/frames/poster.jpg";
    poster.onload = () => {
      if (current < 0) paintCover(poster);
    };

    const resize = () => {
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      // Resizing clears the canvas → repaint the best thing we have, and never
      // leave it as the default black: current frame › poster › flat paper.
      if (current >= 0 && images[current]?.complete) {
        paintCover(images[current]);
      } else if (poster.complete && poster.naturalWidth > 0) {
        paintCover(poster);
      } else {
        ctx.fillStyle = PAPER;
        ctx.fillRect(0, 0, cv.width, cv.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < set.count; i++) {
      const img = new Image();
      img.decoding = "async";
      // First frame wins the bandwidth; the rest fill in behind it.
      img.setAttribute("fetchpriority", i === 0 ? "high" : "low");
      img.src = `${set.dir}/frame-${pad(i + 1)}.webp`;
      img.onload = () => {
        if (i === Math.round(target)) draw(target, true);
      };
      images[i] = img;
    }

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
      poster.onload = null;
      images.forEach((im) => {
        im.onload = null;
      });
    };
  }, []);

  return (
    <>
      {/* Warm the placeholder before the JS runs so the hero paints ASAP */}
      <link
        rel="preload"
        as="image"
        href="/frames/poster.jpg"
        fetchPriority="high"
      />
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full"
        style={{ backgroundColor: PAPER }}
      />
      {/* Legibility veil — a paper wash top/bottom for nav + footer, the hero
          shows through the middle. Fixed, opacity-only → cheap. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(232,238,231,0.80) 0%, rgba(232,238,231,0.30) 24%, rgba(232,238,231,0.32) 60%, rgba(232,238,231,0.88) 100%)",
        }}
      />
    </>
  );
}
