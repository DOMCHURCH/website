"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { splitWords } from "@/lib/splitWords";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div" | "blockquote";

/**
 * Editorial heading reveal: words rise up out of clipped lines, staggered, on
 * scroll (or immediately when `play` is set, for the hero). Server-renders the
 * plain text so it's correct with JS off and there's no layout shift.
 */
export function MaskReveal({
  children,
  as: Component = "h2",
  className,
  stagger = 0.08,
  duration = 1.0,
  delay = 0,
  start = "top 85%",
  play = false,
}: {
  children: string;
  as?: Tag;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  /** If true, reveal on mount instead of on scroll (hero). */
  play?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const split = splitWords(el);
    const ctx = gsap.context(() => {
      gsap.set(split.words, { yPercent: 115 });
      gsap.to(split.words, {
        yPercent: 0,
        duration,
        delay,
        ease: "power4.out",
        stagger,
        ...(play
          ? {}
          : { scrollTrigger: { trigger: el, start, once: true } }),
      });
    }, el);
    return () => {
      ctx.revert();
      split.revert();
    };
  }, [children]);

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
