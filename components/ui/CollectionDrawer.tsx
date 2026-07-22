"use client";

import { useEffect, useRef } from "react";
import type { Collection } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/motion";

function Label({ children }: { children: string }) {
  return (
    <p className="kicker mb-4 text-gold" style={{ fontSize: "10px" }}>
      {children}
    </p>
  );
}

/**
 * Collection detail — a centred modal popup (formerly a right-side drawer) that
 * scales + fades up from the middle of the page. Shows the plant's care specs,
 * how it grows, and what's in the collection. Dark glass, light text.
 * Transform/opacity only; background scroll frozen via Lenis stop() (so the
 * backdrop blur is cheap). Closes on Esc, backdrop, or ×; focus trapped +
 * restored; honours reduced motion.
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

  const reduce = prefersReducedMotion();

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-5 sm:p-8 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop — a plain dim (NO backdrop-filter). A full-viewport blur here
          re-rasterises every frame while the modal scrolls, which is what made
          scrolling lag. The dim alone isolates the modal and is essentially free. */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[rgba(14,19,16,0.62)] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Centred square panel — springs open from the middle (back-out overshoot
          on enter), closes faster than it opens. */}
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-modal-title"
        data-lenis-prevent
        className={`glass-strong relative z-[1] aspect-square max-h-[90vh] w-[min(88vw,460px)] overflow-y-auto rounded-2xl shadow-[0_30px_90px_-30px_rgba(0,0,0,0.7)] ${
          open ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          transition: reduce
            ? "none"
            : open
              ? "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 240ms ease-out"
              : "transform 220ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease-in",
        }}
      >
        {collection && (
          <div className="flex min-h-full flex-col px-7 py-7 sm:px-9 sm:py-9">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                {collection.tag}
              </span>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label="Close collection details"
                className="-mr-2 -mt-2 flex h-10 w-10 items-center justify-center text-2xl leading-none text-onglass/60 transition-colors hover:text-onglass"
              >
                ×
              </button>
            </div>

            <h2
              id="collection-modal-title"
              className="mt-5 font-serif text-[clamp(30px,6vw,44px)] font-light leading-[1] text-onglass"
            >
              {collection.name}
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-onglass/55">
              {collection.family}
            </p>

            <p className="mt-6 max-w-prose text-[14px] font-light leading-[1.7] text-onglass/80">
              {collection.description}
            </p>

            {/* Care */}
            <div className="mt-8 border-t border-white/12 pt-6">
              <Label>Care</Label>
              <dl>
                {collection.care.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-baseline justify-between gap-6 border-b border-white/8 py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-onglass/55">
                      {c.label}
                    </dt>
                    <dd className="text-right font-mono text-[13px] text-onglass">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* How it grows */}
            <div className="mt-8 border-t border-white/12 pt-6">
              <Label>How it grows</Label>
              <p className="text-[15px] font-light leading-[1.75] text-onglass/80">
                {collection.growing}
              </p>
            </div>

            {/* In this collection */}
            <div className="mt-8 border-t border-white/12 pt-6">
              <Label>In this collection</Label>
              <ul>
                {collection.plants.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 border-b border-white/8 py-3 font-serif text-lg font-light text-onglass last:border-b-0"
                  >
                    <span className="h-1 w-1 rounded-full bg-fern" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-auto flex items-center justify-between gap-6 border-t border-white/12 pt-6">
              <span className="font-mono text-lg text-onglass">
                {collection.price}
              </span>
              <Magnetic strength={10}>
                <a
                  href="#"
                  className="inline-block border border-gold px-8 py-4 text-[13px] font-medium tracking-[0.06em] text-onglass transition-[background-color,color,transform] duration-200 ease-out hover:bg-gold hover:text-forest active:scale-[0.97]"
                >
                  Enquire
                </a>
              </Magnetic>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
