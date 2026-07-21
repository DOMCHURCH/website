import { BOTANICALS } from "@/lib/data";

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-10 pr-10 font-mono text-sm uppercase italic tracking-[0.14em] text-fern"
      aria-hidden={ariaHidden || undefined}
    >
      {BOTANICALS.map((name) => (
        <span key={name} className="inline-flex items-center gap-10">
          <span>{name}</span>
          <span className="text-sage/70 not-italic">·</span>
        </span>
      ))}
    </div>
  );
}

export function BotanicalTicker() {
  return (
    <section
      className="relative w-full overflow-hidden whitespace-nowrap bg-forest/70 py-[22px]"
      style={{
        borderTop: "1px solid rgba(151,162,145,0.2)",
        borderBottom: "1px solid rgba(151,162,145,0.2)",
      }}
      aria-label="Plants in the glasshouse"
    >
      <div className="animate-ticker inline-flex">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
