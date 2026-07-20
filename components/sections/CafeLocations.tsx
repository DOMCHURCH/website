import { CAFES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const HAIRLINE = "rgba(107,96,88,0.24)";

export function CafeLocations() {
  return (
    <section id="cafes" className="relative w-full overflow-hidden bg-espresso">
      <span className="index-numeral absolute -right-4 top-16 text-[30vw] sm:text-[22vw]">
        03
      </span>

      <div className="relative mx-auto max-w-[1280px] px-6 py-32 sm:px-14 sm:py-44">
        <SectionHeader
          index="03"
          eyebrow="Visit"
          title="Three counters, one craft"
          className="mb-20 sm:mb-28"
        />

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          {CAFES.map((cafe, i) => (
            <Reveal
              key={cafe.name}
              delay={i * 0.09}
              className="card-lift bg-espresso px-11 py-14"
            >
              <h3 className="font-serif text-[56px] font-light leading-none text-cream">
                {cafe.name}
              </h3>
              <div className="mt-7 font-mono text-xs leading-[2] tracking-[0.1em] text-taupe">
                {cafe.street}
                <br />
                {cafe.city}
                <br />
                <span className="text-cream">{cafe.weekday}</span>
                <br />
                <span className="text-cream">{cafe.weekend}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
