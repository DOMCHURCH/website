import { CAFES } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const HAIRLINE = "rgba(107,96,88,0.24)";

export function CafeLocations() {
  return (
    <section id="cafes" className="w-full bg-espresso">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-14 sm:py-32">
        <SectionHeader label="Café Locations" className="mb-16" />

        <div
          className="grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          {CAFES.map((cafe, i) => (
            <Reveal
              key={cafe.name}
              delay={i * 0.09}
              className="card-lift bg-espresso px-10 py-12"
            >
              <h3 className="font-serif text-[52px] font-light leading-none text-cream">
                {cafe.name}
              </h3>
              <div className="mt-6 font-mono text-xs leading-[1.9] tracking-[0.1em] text-taupe">
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
