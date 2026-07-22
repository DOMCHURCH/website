"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor — a tight dot + a lagging ring that swells over interactive
 * elements (the Groundwork signature). Fine-pointer devices only; the
 * native cursor is hidden while active (via the `cursor-active` class, which
 * also reveals these nodes in CSS — so no render state is needed here).
 * Transform-driven via GSAP quickTo → stays on the compositor, near-zero cost.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-active");

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

    const move = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const INTERACTIVE = "a, button, [data-cursor]";
    const over = (e: Event) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE))
        ring.current?.classList.add("is-hover");
    };
    const out = (e: Event) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE))
        ring.current?.classList.remove("is-hover");
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="gw-cursor gw-cursor-ring" aria-hidden="true" />
      <div ref={dot} className="gw-cursor gw-cursor-dot" aria-hidden="true" />
    </>
  );
}
