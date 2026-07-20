import { PROCESS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="about" className="w-full bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 py-28 sm:px-14 sm:py-32">
        <SectionHeader label="The Process" className="mb-[72px]" />

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal as="blockquote" y={24}>
            <span
              className="block font-serif font-light italic leading-[1.08] text-cream"
              style={{ fontSize: "clamp(38px, 5vw, 68px)" }}
            >
              &ldquo;We roast to the bean, not the market.&rdquo;
            </span>
          </Reveal>

          <div className="flex flex-col gap-10">
            {PROCESS.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.12}>
                <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
                  {step.label}
                </div>
                <p className="text-base font-light leading-[1.7] text-cream/80">
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
