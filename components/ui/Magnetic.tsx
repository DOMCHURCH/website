"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Magnetic wrapper — the child gently pulls toward the cursor on hover and
 * springs back on leave. Fine-pointer only; transform-driven via quickTo.
 * `strength` is the max travel in px.
 */
export function Magnetic({
  children,
  strength = 14,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    // Cache the rect on enter so pointermove never reads layout (no thrash).
    let cx = 0;
    let cy = 0;
    let halfW = 1;
    let halfH = 1;
    const enter = () => {
      const r = el.getBoundingClientRect();
      halfW = r.width / 2;
      halfH = r.height / 2;
      cx = r.left + halfW;
      cy = r.top + halfH;
    };
    const move = (e: PointerEvent) => {
      xTo(((e.clientX - cx) / halfW) * strength);
      yTo(((e.clientY - cy) / halfH) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
