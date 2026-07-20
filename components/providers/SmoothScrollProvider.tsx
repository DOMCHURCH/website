"use client";

import Lenis from "lenis";
import { type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Lenis smooth scroll wired into the GSAP ticker — matches the source design's
 * config (duration 1.15, expo-out easing). Skipped under reduced motion so
 * native scroll drives ScrollTrigger.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) document.fonts.ready.then(refresh).catch(() => {});

    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return () => window.removeEventListener("load", refresh);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
