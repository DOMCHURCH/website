import { ORIGINS } from "@/lib/data";

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-10 pr-10 font-mono text-sm uppercase tracking-[0.16em] text-copper"
      aria-hidden={ariaHidden || undefined}
    >
      {ORIGINS.map((origin) => (
        <span key={origin} className="inline-flex items-center gap-10">
          <span>{origin}</span>
          <span className="text-taupe">·</span>
        </span>
      ))}
    </div>
  );
}

export function OriginTicker() {
  return (
    <section
      className="w-full overflow-hidden whitespace-nowrap bg-ink py-[22px]"
      style={{
        borderTop: "1px solid rgba(107,96,88,0.2)",
        borderBottom: "1px solid rgba(107,96,88,0.2)",
      }}
      aria-label="Origins we source"
    >
      <div className="animate-ticker inline-flex">
        {/* Two identical tracks → seamless -50% loop */}
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
