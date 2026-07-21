"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Scroll-aware nav: transparent over the hero, then settles onto a solid ink
 * bar with a hairline once you scroll in. The link for the section you're
 * currently viewing lights copper — motion that guides the eye rather than
 * decorates. Solid background (no backdrop-filter) keeps it cheap.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useIsomorphicLayoutEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Settle the bar once past the first stretch of the hero.
    triggers.push(
      ScrollTrigger.create({
        start: 60,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      }),
    );

    // Light the link whose section is centered in the viewport.
    for (const link of NAV_LINKS) {
      const el = document.querySelector(link.href);
      if (!el) continue;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(link.href);
          },
        }),
      );
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav
      className={`nav-enter fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 transition-[background-color,border-color,padding] duration-200 ease-out sm:px-10 lg:px-14 ${
        scrolled
          ? "border-cream/10 bg-forest/90 py-4"
          : "border-transparent bg-transparent py-6 sm:py-[30px]"
      }`}
    >
      <a
        href="#top"
        className="legible font-mono text-sm font-medium uppercase tracking-[0.28em] text-cream"
      >
        Groundwork
      </a>
      <div className="flex gap-6 sm:gap-9 lg:gap-11">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`legible border-b pb-[3px] text-[13px] tracking-[0.04em] transition-colors duration-150 sm:text-sm ${
              active === link.href
                ? "border-gold text-gold"
                : "border-transparent text-cream hover:border-gold hover:text-gold"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
