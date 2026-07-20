"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Hero — the launch video is the centerpiece and plays AT ALL TIMES (muted,
 * looping, autoplay), independent of prefers-reduced-motion, per product
 * requirement. A watchdog restarts it if the browser ever stalls or pauses it.
 * Copy staggers in on load; the video carries a slow cinematic drift.
 */
export function Hero() {
  const copy = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Copy entrance — h1 / p / a stagger in on load.
  useIsomorphicLayoutEffect(() => {
    if (!copy.current) return;
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

  // Bulletproof autoplay: pick the device-appropriate encode, force muted
  // inline playback, and keep it running with a watchdog (mirrors the source).
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

    // Restart if playback stalls (tab refocus, decode hiccup, etc.).
    let last = -1;
    const watch = window.setInterval(() => {
      if (v.paused || v.currentTime === last) kick();
      last = v.currentTime;
    }, 500);

    // Resume immediately when the tab becomes visible again.
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

      {/* Legibility scrim — subtle, keeps copy readable over any frame. */}
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
