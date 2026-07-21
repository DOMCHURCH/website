"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Thin reading-progress bar pinned to the top edge. Scrubbed from page scroll
 * (scaleX, origin-left) — transform-only, so it's effectively free. A light
 * scrub smoothing keeps it snappy without lagging the pointer.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left scale-x-0 bg-gold"
    />
  );
}
