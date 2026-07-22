"use client";

import { useEffect, useRef } from "react";
import type { Collection } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

function Label({ children }: { children: string }) {
  return (
    <p className="kicker mb-4 text-gold" style={{ fontSize: "10px" }}>
      {children}
    </p>
  );
}

/**
 * Collection detail drawer — slides in from the right with the plant story:
 * care attributes, how it grows, and what's in the collection. Transform/opacity
 * only; background scroll frozen via Lenis stop() (adds lenis-stopped so keyboard
 * scroll is locked too). Closes on Esc, backdrop, or ×; focus trapped + restored.
 */
export function CollectionDrawer({
  collection,
  open,
  onClose,
}: {
  collection: Collection | null;
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
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[rgba(26,42,31,0.42)] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-drawer-title"
        data-lenis-prevent
        className="glass-strong absolute right-0 top-0 h-full w-[min(92vw,540px)] overflow-y-auto shadow-[0_0_80px_-20px_rgba(0,0,0,0.55)] transition-transform duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {collection && (
          <div className="flex min-h-full flex-col px-8 py-8 sm:px-12 sm:py-12">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                {collection.tag}
              </span>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label="Close collection details"
                className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center text-2xl leading-none text-sage transition-colors hover:text-cream"
              >
                ×
              </button>
            </div>

            <h2
              id="collection-drawer-title"
              className="mt-6 font-serif text-[clamp(40px,7vw,60px)] font-light leading-[0.98] text-cream"
            >
              {collection.name}
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-sage">
              {collection.family}
            </p>

            <p className="mt-8 max-w-prose text-[15px] font-light leading-[1.75] text-cream/80">
              {collection.description}
            </p>

            {/* Care */}
            <div className="mt-12 border-t border-cream/10 pt-8">
              <Label>Care</Label>
              <dl>
                {collection.care.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-baseline justify-between gap-6 border-b border-cream/5 py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-sage">
                      {c.label}
                    </dt>
                    <dd className="text-right font-mono text-[13px] text-cream">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* How it grows */}
            <div className="mt-12 border-t border-cream/10 pt-8">
              <Label>How it grows</Label>
              <p className="text-[15px] font-light leading-[1.75] text-cream/80">
                {collection.growing}
              </p>
            </div>

            {/* In this collection */}
            <div className="mt-12 border-t border-cream/10 pt-8">
              <Label>In this collection</Label>
              <ul>
                {collection.plants.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 border-b border-cream/5 py-3 font-serif text-lg font-light text-cream last:border-b-0"
                  >
                    <span className="h-1 w-1 rounded-full bg-fern" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-auto flex items-center justify-between gap-6 border-t border-cream/10 pt-8">
              <span className="font-mono text-lg text-cream">
                {collection.price}
              </span>
              <Magnetic strength={10}>
                <a
                  href="#"
                  className="inline-block border border-gold px-8 py-4 text-[13px] font-medium tracking-[0.06em] text-cream transition-[background-color,color,transform] duration-200 ease-out hover:bg-gold hover:text-forest active:scale-[0.97]"
                >
                  Enquire
                </a>
              </Magnetic>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
