import { NAV_LINKS } from "@/lib/data";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-[30px] lg:px-14">
      <a
        href="#top"
        className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-cream"
      >
        Groundwork
      </a>
      <div className="flex gap-6 sm:gap-9 lg:gap-11">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="border-b border-transparent pb-[3px] text-[13px] tracking-[0.04em] text-cream transition-colors duration-200 hover:border-copper hover:text-copper sm:text-sm"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
