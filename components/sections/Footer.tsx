import { NAV_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer
      className="w-full bg-ink"
      style={{ borderTop: "1px solid rgba(107,96,88,0.2)" }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-7 px-6 py-14 sm:px-14">
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
