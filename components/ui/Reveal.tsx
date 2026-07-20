"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type Tag = "div" | "li" | "blockquote";

/**
 * Fade-up-on-scroll, matching the source's reveal (y 34, power3.out, 0.9s,
 * fires once at "top 88%"). `delay` drives the staggered card cadence.
 * No-op under reduced motion — content stays visible.
 */
export function Reveal({
  children,
  as: Component = "div",
  className,
  y = 34,
  delay = 0,
  start = "top 88%",
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  y?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
