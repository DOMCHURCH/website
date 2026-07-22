"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/motion";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Magnetic } from "@/components/ui/Magnetic";

// Headline reveals as the intro curtain lifts (~1.3s).
const REVEAL_AT = 1.3;

/**
 * Hero — botanical opening over the scroll-scrubbed greenhouse canvas (which
 * lives behind everything at z-0). Text is treated for legibility with a local
 * scrim + text-shadow so it reads over the bright foliage. The headline reveals
 * word-by-word; eyebrow, sub and CTA follow.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!copy.current || !section.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Entrance — eyebrow, sub and CTA rise as the intro curtain lifts.
      gsap.from(copy.current!.querySelectorAll("[data-fade]"), {
        y: 26,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.12,
        delay: REVEAL_AT + 0.55,
      });
      // Scroll parallax — the copy drifts up and dims as the hero exits, so it
      // recedes behind the incoming section. Transform/opacity only.
      gsap.to(copy.current, {
        yPercent: -14,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden py-24 [@media(max-height:640px)]:py-16"
    >
      {/* Local paper scrim behind the copy so dark type reads over the bright
          sky/foliage of the hero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(232,238,231,0.86) 0%, rgba(232,238,231,0.45) 42%, rgba(232,238,231,0.04) 100%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={copy}
        className="relative z-10 w-full max-w-[92%] px-6 sm:max-w-[72%] sm:px-10 lg:max-w-[640px] lg:px-14"
      >
        <p
          data-fade
          className="kicker legible mb-8 text-gold [@media(max-height:640px)]:mb-4"
          style={{ fontSize: "12px" }}
        >
          Botanical Studio · Ottawa · Est. 2024
        </p>

        <MaskReveal
          as="h1"
          play
          delay={REVEAL_AT}
          stagger={0.09}
          duration={1.1}
          className="legible font-serif font-light leading-[0.96] tracking-[0.005em] text-cream [font-size:clamp(38px,min(7vw,11vh),112px)]"
        >
          Where the wild comes indoors.
        </MaskReveal>

        <p
          data-fade
          className="legible mt-9 max-w-[44ch] text-[16px] font-light leading-[1.7] tracking-[0.01em] text-cream/80 [@media(max-height:640px)]:mt-4 [@media(max-height:520px)]:hidden"
        >
          Rare plants raised under glass — grown slow, tended by hand, and sent
          home with everything they need to thrive.
        </p>

        <div data-fade className="mt-11 [@media(max-height:640px)]:mt-6">
          <Magnetic strength={16}>
            <a
              href="#collections"
              className="inline-block border border-gold px-9 py-4 text-sm font-medium tracking-[0.06em] text-cream transition-[background-color,color,transform] duration-200 ease-out hover:bg-gold hover:text-forest active:scale-[0.97]"
            >
              See the Collections
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 [@media(max-height:640px)]:hidden">
        <span className="kicker legible" style={{ fontSize: "10px" }}>
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-cream/15">
          <span className="scroll-cue-line absolute inset-x-0 top-0 block h-4 bg-gradient-to-b from-gold to-transparent" />
        </span>
      </div>
    </section>
  );
}
