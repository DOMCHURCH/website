"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const copy = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Hero copy entrance — h1 / p / a stagger in on load (source: y40, 1.1s).
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion() || !copy.current) return;
    const ctx = gsap.context(() => {
      gsap.from(copy.current!.querySelectorAll("h1, p, a"), {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }, copy);
    return () => ctx.revert();
  }, []);

  // Autoplay + resilience: keep the muted loop running; restart if the browser
  // stalls or pauses it (mirrors the source's watchdog). Paused under reduced
  // motion — the poster shows instead.
  useIsomorphicLayoutEffect(() => {
    const v = video.current;
    if (!v) return;
    if (prefersReducedMotion()) {
      try {
        v.pause();
      } catch {}
      return;
    }
    v.muted = true;
    const kick = () => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    kick();
    v.addEventListener("pause", () => {
      if (!v.ended) kick();
    });
    let last = -1;
    const watch = window.setInterval(() => {
      if (v.paused || v.currentTime === last) kick();
      last = v.currentTime;
    }, 500);
    return () => window.clearInterval(watch);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden [contain:paint]"
    >
      <video
        ref={video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle scrim — keeps copy legible over any frame without hiding the
          footage; barely perceptible against the already-dark video. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.35) 42%, rgba(10,10,10,0.1) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={copy}
        className="relative z-10 w-full max-w-[92%] px-6 sm:max-w-[70%] sm:px-10 lg:max-w-[46%] lg:px-14"
      >
        <h1
          className="font-serif font-light leading-[0.98] tracking-[0.01em] text-cream text-balance"
          style={{ fontSize: "clamp(52px, 6.5vw, 108px)" }}
        >
          The cup that earns the morning.
        </h1>
        <p className="mt-[30px] max-w-[40ch] text-[15px] font-light leading-[1.65] tracking-[0.02em] text-taupe">
          Single-origin roasts, pulled slow, served straight. No syrups. No
          shortcuts.
        </p>
        <a
          href="#roasts"
          className="mt-10 inline-block border border-copper px-[34px] py-4 text-sm font-medium tracking-[0.06em] text-cream transition-colors duration-[250ms] hover:bg-copper hover:text-ink"
        >
          Shop Roasts
        </a>
      </div>
    </section>
  );
}
