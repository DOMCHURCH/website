"use client";

import { useEffect, useRef } from "react";
import type { Roast } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

function Label({ children }: { children: string }) {
  return (
    <p className="kicker mb-4 text-copper" style={{ fontSize: "10px" }}>
      {children}
    </p>
  );
}

/**
 * Roast detail drawer — slides in from the right with the full story: origin
 * specs, how it's made, tasting notes and a brew guide. Transform/opacity only
 * (no blur, no filters). Background scroll is frozen via Lenis stop(), which
 * adds `lenis-stopped` (html overflow:hidden) so keyboard scroll is locked too.
 * Closes on Esc, backdrop click, or the × button; focus is trapped and restored.
 */
export function RoastDrawer({
  roast,
  open,
  onClose,
}: {
  roast: Roast | null;
  open: boolean;
  onClose: () => void;
}) {
  const { stop, start } = useSmoothScroll();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      start();
      prevFocus.current?.focus?.();
      return;
    }

    prevFocus.current = document.activeElement as HTMLElement;
    stop();
    const focusT = window.setTimeout(() => closeBtn.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusT);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, stop, start, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[80] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop (no blur — cheap) */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/80 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="roast-drawer-title"
        data-lenis-prevent
        className="absolute right-0 top-0 h-full w-[min(92vw,540px)] overflow-y-auto bg-espresso shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {roast && (
          <div className="flex min-h-full flex-col px-8 py-8 sm:px-12 sm:py-12">
            {/* Header */}
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
                {roast.level}
              </span>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label="Close roast details"
                className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center text-2xl leading-none text-taupe transition-colors hover:text-cream"
              >
                ×
              </button>
            </div>

            <h2
              id="roast-drawer-title"
              className="mt-6 font-serif text-[clamp(40px,7vw,60px)] font-light leading-[0.98] text-cream"
            >
              {roast.name}
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-taupe">
              {roast.origin}
            </p>

            <p className="mt-8 max-w-prose text-[15px] font-light leading-[1.75] text-cream/80">
              {roast.description}
            </p>

            {/* Origin specs */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <Label>Origin</Label>
              <dl>
                {roast.specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-6 border-b border-white/5 py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-taupe">
                      {s.label}
                    </dt>
                    <dd className="text-right font-mono text-[13px] text-cream">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* How it's made */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <Label>How it’s made</Label>
              <p className="text-[15px] font-light leading-[1.75] text-cream/80">
                {roast.process}
              </p>
            </div>

            {/* Tasting notes */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <Label>In the cup</Label>
              <p className="font-mono text-sm uppercase leading-[1.8] tracking-[0.12em] text-cream">
                {roast.notes}
              </p>
            </div>

            {/* Brew guide */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <Label>Brew guide</Label>
              {roast.brew.map((b) => (
                <div
                  key={b.method}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 py-3 last:border-b-0"
                >
                  <span className="font-serif text-lg font-light text-cream">
                    {b.method}
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.08em] text-taupe">
                    {b.recipe}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-auto flex items-center justify-between gap-6 border-t border-white/10 pt-8">
              <span className="font-mono text-lg text-cream">{roast.price}</span>
              <Magnetic strength={10}>
                <a
                  href="#"
                  className="inline-block border border-copper px-8 py-4 text-[13px] font-medium tracking-[0.06em] text-cream transition-colors duration-200 hover:bg-copper hover:text-ink"
                >
                  Add to Bag
                </a>
              </Magnetic>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
