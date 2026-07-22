"use client";

import { useState } from "react";
import { COLLECTIONS, type Collection } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { CollectionDrawer } from "@/components/ui/CollectionDrawer";

const HAIRLINE = "rgba(93,107,95,0.28)";

export function Collections() {
  const [active, setActive] = useState<Collection | null>(null);
  const [open, setOpen] = useState(false);

  const openCollection = (c: Collection) => {
    setActive(c);
    setOpen(true);
  };

  return (
    <section id="collections" className="relative w-full overflow-hidden py-32 sm:py-44">
      <IndexNumeral className="absolute -right-4 top-16 text-[30vw] sm:text-[22vw]">
        01
      </IndexNumeral>

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-14">
        <SectionHeader
          index="01"
          eyebrow="Collections"
          title="Grown under glass"
          className="mb-20 sm:mb-28"
        />

        <div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm md:grid-cols-3"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          {COLLECTIONS.map((c, i) => (
            <Reveal
              key={c.slug}
              delay={i * 0.09}
              className="card-lift group relative flex min-h-[440px] flex-col bg-canopy px-11 pb-11 pt-12"
            >
              {/* Gold hairline draws across the top edge on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
              <button
                type="button"
                onClick={() => openCollection(c)}
                aria-label={`View the ${c.name} collection`}
                className="group flex flex-1 cursor-pointer flex-col text-left"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  {c.tag}
                </div>
                <h3 className="mt-6 font-serif text-[52px] font-light leading-[0.98] text-cream">
                  {c.name}
                </h3>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-sage">
                  {c.family}
                </div>
                <div className="mt-8 max-w-[26ch] text-sm font-light leading-relaxed text-cream/70">
                  {c.summary}
                </div>

                <div className="flex-1" />

                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-sage transition-colors group-hover:text-gold">
                  View collection
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>

              <div className="mt-9 flex items-center justify-between">
                <span className="font-mono text-sm text-cream">{c.price}</span>
                <Magnetic strength={10}>
                  <a
                    href="#"
                    className="inline-block border px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-cream transition-[border-color,color,transform] duration-200 ease-out hover:border-gold hover:text-gold active:scale-[0.97]"
                    style={{ borderColor: "rgba(93,107,95,0.42)" }}
                  >
                    Enquire
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <CollectionDrawer
        collection={active}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
