import { GLASSHOUSE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { IndexNumeral } from "@/components/ui/IndexNumeral";

export function Glasshouse() {
  return (
    <section id="glasshouse" className="relative w-full overflow-hidden py-32 sm:py-48">
      <IndexNumeral className="absolute -left-4 top-16 text-[30vw] sm:text-[22vw]">
        02
      </IndexNumeral>

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-14">
        <SectionHeader index="02" eyebrow="The Glasshouse" className="mb-24 sm:mb-32" />

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <MaskReveal
            as="blockquote"
            duration={1.1}
            stagger={0.06}
            className="legible font-serif font-light italic text-cream [font-size:clamp(38px,5.2vw,72px)] [line-height:1.06]"
          >
            “We grow to the plant, not the shelf.”
          </MaskReveal>

          {/* Body steps sit on a liquid-glass panel so dark type stays legible */}
          <div className="glass rounded-2xl px-7 py-9 sm:px-9 sm:py-10">
            <div className="flex flex-col gap-12">
              {GLASSHOUSE.map((step, i) => (
                <Reveal key={step.label} delay={i * 0.12}>
                  <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                    {step.label}
                  </div>
                  <p className="max-w-md text-[17px] font-light leading-[1.75] text-cream/85">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
