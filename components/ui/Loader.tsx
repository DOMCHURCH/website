"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Minimal intro — the wordmark and a thin progress rule resolve, then the
 * overlay lifts to reveal the hero (the greenhouse frame sequence is already
 * drawing behind it). Brief by design (~1.4s); scroll is locked only for that
 * beat. Skipped entirely under reduced motion — no curtain, no scroll lock.
 */
export function Loader() {
  const overlay = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Reduced motion: no curtain, no scroll lock — reveal content immediately.
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }

    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            root.style.overflow = prev;
            setDone(true);
          },
        })
        .from(mark.current, { opacity: 0, y: 12, duration: 0.7, ease: "power3.out" })
        .fromTo(
          bar.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          0.2,
        )
        .to(mark.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(
          overlay.current,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "-=0.1",
        );
    }, overlay);

    return () => {
      ctx.revert();
      root.style.overflow = prev;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlay}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-forest"
    >
      <span
        ref={mark}
        className="font-mono text-sm font-medium uppercase tracking-[0.4em] text-cream"
      >
        Groundwork
      </span>
      <span
        ref={bar}
        className="mt-6 h-px w-40 origin-left bg-gradient-to-r from-gold to-transparent"
      />
    </div>
  );
}
