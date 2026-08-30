const ITEMS = [
  "Ręcznie zalewane w Polsce",
  "Darmowa dostawa od 199 zł",
  "Naturalny wosk sojowy",
  "≈ 40 h palenia",
  "Zwroty do 14 dni",
];

export function TrustBar() {
  return (
    <div
      className="border-t border-line bg-surface/50 px-5 py-4"
      role="region"
      aria-label="Dlaczego LOMMA"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted md:text-2xs">
        {ITEMS.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>
  );
}
