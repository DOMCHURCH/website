import { NAV_LINKS } from "@/lib/data";
import { MaskReveal } from "@/components/ui/MaskReveal";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Oversized wordmark statement over the greenhouse */}
      <div className="mx-auto max-w-[1280px] px-6 pt-32 sm:px-14 sm:pt-44">
        <MaskReveal
          as="div"
          stagger={0.02}
          className="section-title legible text-[clamp(44px,15vw,200px)] leading-[0.82] text-cream"
        >
          Groundwork
        </MaskReveal>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1280px] flex-wrap items-center justify-between gap-7 border-t border-cream/10 px-6 py-12 sm:px-14">
        <a
          href="#top"
          className="legible font-mono text-sm font-medium uppercase tracking-[0.28em] text-cream"
        >
          Groundwork
        </a>
        <div className="flex gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="legible border-b border-transparent pb-[3px] text-sm text-cream transition-colors duration-150 hover:border-gold hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="legible font-mono text-xs uppercase tracking-[0.14em] text-sage">
          Ottawa · Est. 2024
        </div>
      </div>
    </footer>
  );
}
