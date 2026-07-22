"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Oversized editorial index numeral (01 / 02 / 03) that lives behind a section
 * as a faint watermark. Two independent transform layers keep it cheap and
 * conflict-free:
 *   - outer: scroll-scrubbed parallax drift (depth as the page moves)
 *   - inner: cursor-reactive drift toward the pointer (fine-pointer only)
 * Both are compositor-only (translate). No-ops entirely under reduced motion.
 */
export function IndexNumeral({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const o = outer.current;
    const inr = inner.current;
    if (!o || !inr || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        o,
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: o,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        },
      );
    });

    // Cursor reactivity — normalised to viewport centre so pointermove never
    // reads layout (no thrash). quickTo keeps it on the compositor.
    let cleanupCursor = () => {};
    if (window.matchMedia("(pointer: fine)").matches) {
      const STRENGTH = 18;
      const xTo = gsap.quickTo(inr, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(inr, "y", { duration: 0.7, ease: "power3" });
      const move = (e: PointerEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * 2 * STRENGTH);
        yTo((e.clientY / window.innerHeight - 0.5) * 2 * STRENGTH);
      };
      window.addEventListener("pointermove", move);
      cleanupCursor = () => window.removeEventListener("pointermove", move);
    }

    return () => {
      ctx.revert();
      cleanupCursor();
    };
  }, []);

  return (
    <span ref={outer} aria-hidden="true" className={`index-numeral ${className}`}>
      <span ref={inner} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
