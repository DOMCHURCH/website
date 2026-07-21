import { LOCATIONS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const HAIRLINE = "rgba(151,162,145,0.24)";

export function Visit() {
  return (
    <section id="visit" className="relative w-full overflow-hidden py-32 sm:py-44">
      <span className="index-numeral absolute -right-4 top-16 text-[30vw] sm:text-[22vw]">
        03
      </span>

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-14">
        <SectionHeader
          index="03"
          eyebrow="Visit"
          title="Three glasshouses"
          className="mb-20 sm:mb-28"
        />

        <div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm md:grid-cols-3"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          {LOCATIONS.map((loc, i) => (
            <Reveal
              key={loc.name}
              delay={i * 0.09}
              className="card-lift bg-canopy px-11 py-14"
            >
              <h3 className="font-serif text-[56px] font-light leading-none text-cream">
                {loc.name}
              </h3>
              <div className="mt-7 font-mono text-xs leading-[2] tracking-[0.1em] text-sage">
                {loc.street}
                <br />
                {loc.city}
                <br />
                <span className="text-cream">{loc.weekday}</span>
                <br />
                <span className="text-cream">{loc.weekend}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
