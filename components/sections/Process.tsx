import { PROCESS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";

export function Process() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-ink">
      <span className="index-numeral absolute -left-4 top-16 text-[30vw] sm:text-[22vw]">
        02
      </span>

      <div className="relative mx-auto max-w-[1280px] px-6 py-32 sm:px-14 sm:py-48">
        <SectionHeader index="02" eyebrow="Craft" className="mb-24 sm:mb-32" />

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <MaskReveal
            as="blockquote"
            duration={1.1}
            stagger={0.06}
            className="font-serif font-light italic text-cream [font-size:clamp(38px,5.2vw,72px)] [line-height:1.06]"
          >
            “We roast to the bean, not the market.”
          </MaskReveal>

          <div className="flex flex-col gap-12">
            {PROCESS.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.12}>
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
                  {step.label}
                </div>
                <p className="max-w-md text-[17px] font-light leading-[1.75] text-cream/80">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
