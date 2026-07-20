"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Magnetic } from "@/components/ui/Magnetic";

// Headline reveals as the intro curtain lifts (~1.3s), for the "text arrives
// with the reveal" moment.
const REVEAL_AT = 1.3;

/**
 * Hero — the launch video plays AT ALL TIMES (muted/looping/autoplay,
 * independent of reduced-motion), with a watchdog that restarts it on any
 * stall. The headline reveals word-by-word; eyebrow, sub and CTA follow.
 */
export function Hero() {
  const copy = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!copy.current) return;
    const ctx = gsap.context(() => {
      gsap.from(copy.current!.querySelectorAll("[data-fade]"), {
        y: 26,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.12,
        delay: REVEAL_AT + 0.55,
      });
    }, copy);
    return () => ctx.revert();
  }, []);

  // Bulletproof autoplay — device-appropriate encode, forced muted inline
  // playback, watchdog + visibility restart.
  useIsomorphicLayoutEffect(() => {
    const v = video.current;
    if (!v) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    v.src = mobile ? "/hero-mobile.mp4" : "/hero.mp4";
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    try {
      v.load();
    } catch {}

    const kick = () => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    kick();

    const onPause = () => {
      if (!v.ended) kick();
    };
    v.addEventListener("pause", onPause);
    let last = -1;
    const watch = window.setInterval(() => {
      if (v.paused || v.currentTime === last) kick();
      last = v.currentTime;
    }, 500);
    const onVis = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      window.clearInterval(watch);
    };
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
        className="hero-video absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.74) 0%, rgba(10,10,10,0.36) 44%, rgba(10,10,10,0.08) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={copy}
        className="relative z-10 w-full max-w-[92%] px-6 sm:max-w-[72%] sm:px-10 lg:max-w-[52%] lg:px-14"
      >
        <p
          data-fade
          className="kicker mb-8 text-copper"
          style={{ fontSize: "12px" }}
        >
          Single Origin · Ottawa · Est. 2024
        </p>

        <MaskReveal
          as="h1"
          play
          delay={REVEAL_AT}
          stagger={0.09}
          duration={1.1}
          className="font-serif font-light leading-[0.96] tracking-[0.005em] text-cream [font-size:clamp(52px,7vw,116px)]"
        >
          The cup that earns the morning.
        </MaskReveal>

        <p
          data-fade
          className="mt-9 max-w-[42ch] text-[16px] font-light leading-[1.7] tracking-[0.01em] text-taupe"
        >
          Single-origin roasts, pulled slow, served straight. No syrups. No
          shortcuts.
        </p>

        <div data-fade className="mt-11">
          <Magnetic strength={16}>
            <a
              href="#roasts"
              className="inline-block border border-copper px-9 py-4 text-sm font-medium tracking-[0.06em] text-cream transition-colors duration-[250ms] hover:bg-copper hover:text-ink"
            >
              Shop Roasts
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
