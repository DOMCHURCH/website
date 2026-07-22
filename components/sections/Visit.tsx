import { LOCATIONS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { IndexNumeral } from "@/components/ui/IndexNumeral";

export function Visit() {
  return (
    <section id="visit" className="relative w-full overflow-hidden py-32 sm:py-44">
      <IndexNumeral className="absolute -right-4 top-16 text-[30vw] sm:text-[22vw]">
        03
      </IndexNumeral>

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-14">
        <SectionHeader
          index="03"
          eyebrow="Visit"
          title="Three glasshouses"
          className="mb-20 sm:mb-28"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {LOCATIONS.map((loc, i) => (
            <Reveal
              key={loc.name}
              delay={i * 0.09}
              className="glass glass-lift group relative rounded-2xl px-9 py-12 sm:px-11 sm:py-14"
            >
              <h3 className="font-serif text-[56px] font-light leading-none text-onglass">
                {loc.name}
              </h3>
              <div className="mt-7 font-mono text-xs leading-[2] tracking-[0.1em] text-onglass/55">
                {loc.street}
                <br />
                {loc.city}
                <br />
                <span className="text-onglass">{loc.weekday}</span>
                <br />
                <span className="text-onglass">{loc.weekend}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
