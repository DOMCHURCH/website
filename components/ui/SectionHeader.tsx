"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { MaskReveal } from "@/components/ui/MaskReveal";

/**
 * Editorial section header — an index numeral + mono eyebrow beside a hairline
 * rule that draws in on scroll, with an optional oversized serif title that
 * reveals word-by-word. The luxury "chapter opener."
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title?: string;
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
    <div className={className}>
      <div className="flex items-baseline gap-5">
        <span className="kicker text-copper">{index}</span>
        <span className="kicker">{eyebrow}</span>
        <span
          ref={line}
          className="h-px flex-1"
          style={{ backgroundColor: "rgba(107,96,88,0.28)" }}
        />
      </div>

      {title && (
        <MaskReveal
          as="h2"
          className="section-title mt-8 text-[clamp(40px,6.5vw,92px)]"
        >
          {title}
        </MaskReveal>
      )}
    </div>
  );
}
