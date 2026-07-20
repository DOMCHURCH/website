import { ROASTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const HAIRLINE = "rgba(107,96,88,0.24)";

export function FeaturedRoasts() {
  return (
    <section id="roasts" className="w-full bg-espresso">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-14 sm:py-32">
        <SectionHeader label="Featured Roasts" className="mb-16" />

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          {ROASTS.map((roast, i) => (
            <Reveal
              key={roast.name}
              delay={i * 0.09}
              className="card-lift flex min-h-[380px] flex-col bg-espresso px-10 pb-10 pt-11"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
                {roast.level}
              </div>
              <h3 className="mt-5 font-serif text-[46px] font-light leading-[1.02] text-cream">
                {roast.name}
              </h3>
              <div className="mt-2.5 font-mono text-xs uppercase tracking-[0.14em] text-taupe">
                {roast.origin}
              </div>
              <div className="mt-7 font-mono text-xs uppercase leading-[1.7] tracking-[0.12em] text-cream/75">
                {roast.notes}
              </div>

              <div className="flex-1" />

              <div className="mt-9 flex items-center justify-between">
                <span className="font-mono text-sm text-cream">
                  {roast.price}
                </span>
                <a
                  href="#"
                  className="border px-6 py-3 text-[13px] font-medium tracking-[0.06em] text-cream transition-colors duration-200 hover:border-copper hover:text-copper"
                  style={{ borderColor: "rgba(107,96,88,0.5)" }}
                >
                  Add to Bag
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
