import { ROASTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

const HAIRLINE = "rgba(107,96,88,0.24)";

export function FeaturedRoasts() {
  return (
    <section id="roasts" className="relative w-full overflow-hidden bg-espresso">
      {/* Oversized editorial index watermark */}
      <span className="index-numeral absolute -right-4 top-16 text-[30vw] sm:text-[22vw]">
        01
      </span>

      <div className="relative mx-auto max-w-[1280px] px-6 py-32 sm:px-14 sm:py-44">
        <SectionHeader
          index="01"
          eyebrow="Featured"
          title="This season’s roasts"
          className="mb-20 sm:mb-28"
        />

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          {ROASTS.map((roast, i) => (
            <Reveal
              key={roast.name}
              delay={i * 0.09}
              className="card-lift flex min-h-[440px] flex-col bg-espresso px-11 pb-11 pt-12"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
                {roast.level}
              </div>
              <h3 className="mt-6 font-serif text-[52px] font-light leading-[0.98] text-cream">
                {roast.name}
              </h3>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-taupe">
                {roast.origin}
              </div>
              <div className="mt-8 font-mono text-xs uppercase leading-[1.8] tracking-[0.12em] text-cream/75">
                {roast.notes}
              </div>

              <div className="flex-1" />

              <div className="mt-10 flex items-center justify-between">
                <span className="font-mono text-sm text-cream">
                  {roast.price}
                </span>
                <Magnetic strength={10}>
                  <a
                    href="#"
                    className="inline-block border px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-cream transition-colors duration-200 hover:border-copper hover:text-copper"
                    style={{ borderColor: "rgba(107,96,88,0.5)" }}
                  >
                    Add to Bag
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
