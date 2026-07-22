"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

/**
 * Scroll-aware nav: transparent over the hero, then settles onto a light paper
 * bar with a hairline once you scroll in. The link for the section you're
 * currently viewing lights gold — motion that guides the eye. On mobile the
 * links collapse into a toggled dropdown so the bar never overflows.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close the mobile menu on Escape.
  useIsomorphicLayoutEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Solid bar when scrolled in OR when the mobile menu is open (legibility).
  const barSolid = scrolled || menuOpen;

  return (
    <>
      <nav
        className={`nav-enter fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-5 transition-[background-color,border-color,padding] duration-200 ease-out sm:px-10 lg:px-14 ${
          barSolid
            ? "border-cream/10 bg-forest/90 py-4"
            : "border-transparent bg-transparent py-6 sm:py-[30px]"
        }`}
      >
        <a
          href="#top"
          className="legible font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-cream sm:text-sm sm:tracking-[0.28em]"
        >
          Groundwork
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 sm:flex sm:gap-9 lg:gap-11">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`legible border-b pb-[3px] text-sm tracking-[0.04em] transition-colors duration-150 ${
                active === link.href
                  ? "border-gold text-gold"
                  : "border-transparent text-cream hover:border-gold hover:text-gold"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle — two lines that morph into an X */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
          className="relative h-6 w-6 sm:hidden"
        >
          <span
            className={`absolute left-0 top-1/2 block h-px w-6 bg-cream transition-transform duration-200 ease-out ${
              menuOpen ? "rotate-45" : "-translate-y-[3px]"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-px w-6 bg-cream transition-transform duration-200 ease-out ${
              menuOpen ? "-rotate-45" : "translate-y-[3px]"
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown — slides down behind the bar */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-0 z-40 origin-top border-b px-5 pb-6 pt-[68px] transition-[opacity,transform] duration-200 ease-out sm:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 border-cream/10 bg-forest/95 opacity-100 backdrop-blur-sm"
            : "pointer-events-none -translate-y-2 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`legible border-b border-cream/10 py-3 text-sm tracking-[0.04em] transition-colors duration-150 last:border-b-0 ${
                active === link.href ? "text-gold" : "text-cream"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
