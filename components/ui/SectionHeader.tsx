"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Section eyebrow: a mono label beside a hairline rule that draws in from the
 * left on scroll (scaleX 0→1, power3.out) — matches the source design.
 */
export function SectionHeader({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const line = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = line.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`flex items-baseline gap-5 ${className}`}>
      <span className="kicker whitespace-nowrap">{label}</span>
      <span
        ref={line}
        className="h-px flex-1 bg-taupe/28"
        style={{ backgroundColor: "rgba(107,96,88,0.28)" }}
      />
    </div>
  );
}
