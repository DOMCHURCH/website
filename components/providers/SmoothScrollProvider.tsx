"use client";

import Lenis from "lenis";
import { type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Lenis smooth scroll wired into the GSAP ticker (duration 1.15, expo-out
 * easing — from the source design). Always active so the cinematic scroll feel
 * is consistent; ScrollTrigger is refreshed after fonts/asset load so reveal
 * positions stay exact.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts) document.fonts.ready.then(refresh).catch(() => {});

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
