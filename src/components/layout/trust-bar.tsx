const ITEMS = [
  { label: "Ręcznie zalewane w Polsce", className: "" },
  { label: "Darmowa dostawa od 199 zł", className: "" },
  { label: "Naturalny wosk sojowy", className: "hidden sm:inline" },
  { label: "≈ 40 h palenia", className: "hidden sm:inline" },
  { label: "Zwroty do 14 dni", className: "hidden md:inline" },
];

export function TrustBar() {
  return (
    <div
      className="bg-surface/50 px-5 py-2"
      role="region"
      aria-label="Dlaczego LOMMA"
    >
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted md:text-2xs">
        {ITEMS.map((item) => (
          <li key={item.label} className={item.className}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
