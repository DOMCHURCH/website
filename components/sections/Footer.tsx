import { NAV_LINKS } from "@/lib/data";
import { MaskReveal } from "@/components/ui/MaskReveal";

export function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-ink"
      style={{ borderTop: "1px solid rgba(107,96,88,0.2)" }}
    >
      {/* Oversized wordmark statement */}
      <div className="mx-auto max-w-[1280px] px-6 pt-32 sm:px-14 sm:pt-44">
        <MaskReveal
          as="div"
          stagger={0.02}
          className="section-title text-[clamp(44px,15vw,200px)] leading-[0.82] text-cream"
        >
          Groundwork
        </MaskReveal>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1280px] flex-wrap items-center justify-between gap-7 border-t border-white/10 px-6 py-12 sm:px-14">
        <a
          href="#top"
          className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-cream"
        >
          Groundwork
        </a>
        <div className="flex gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-[3px] text-sm text-cream transition-colors duration-200 hover:border-copper hover:text-copper"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-taupe">
          Ottawa · Est. 2024
        </div>
      </div>
    </footer>
  );
}
