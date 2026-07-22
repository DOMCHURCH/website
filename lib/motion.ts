/**
 * Motion helpers. `prefersReducedMotion()` is the single source of truth for
 * honouring the OS "reduce motion" setting — call it inside effects before
 * running any GSAP tween so reduced-motion users get static, visible content
 * instead of entrance animations, parallax, or cursor-reactive drift.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
