import { Check, X } from "lucide-react";

export function ComparisonTable() {
  const comparisonData = [
    {
      feature: "Baza wosku",
      lomma: "100% Naturalny Wosk Sojowy",
      others: "Parafina (pochodna ropy naftowej)",
    },
    {
      feature: "Czystość spalania",
      lomma: "Bez benzenu, toluenu i czarnego dymu",
      others: "Wydziela toksyczne związki i kopci",
    },
    {
      feature: "Knot",
      lomma: "Czysta bawełna niebielona",
      others: "Knoty syntetyczne / rdzenie metalowe",
    },
    {
      feature: "Kompozycja zapachowa",
      lomma: "Naturalne olejki z Grasse (Francja)",
      others: "Syntetyczne, tanie aromaty",
    },
    {
      feature: "Czas palenia (180g)",
      lomma: "~40 godzin wolnego spalania",
      others: "~20-25 godzin (szybkie tunelowanie)",
    },
    {
      feature: "Naczynie i ekologia",
      lomma: "Szkło z bambusowym wieczkiem (Upcycling)",
      others: "Jednorazowy pojemnik bez nakrycia",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-line bg-bg">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-14">
          <span className="font-mono text-2xs uppercase tracking-caps text-accent block mb-3">
            Rzemiosło i Skład
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-fg">
            Świeca sojowa LOMMA vs Masowa parafina
          </h2>
          <p className="mt-3 text-muted text-sm max-w-lg mx-auto leading-relaxed">
            Świadomy wybór dla czystego powietrza, spokoju i domowej atmosfery.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-elevated shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-line bg-surface/60">
                <th className="py-4 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Cecha</th>
                <th className="py-4 px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg font-medium w-1/3">
                  LOMMA (Sojowa)
                </th>
                <th className="py-4 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70 w-1/3">
                  Inne (Parafina)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-surface/30">
                  <td className="py-4 px-5 font-medium text-fg text-xs">{row.feature}</td>
                  <td className="py-4 px-5 text-fg text-xs">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-fg" strokeWidth={1.75} />
                      <span className="font-medium">{row.lomma}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-muted text-xs">
                    <div className="flex items-center gap-2">
                      <X className="size-4 shrink-0 text-muted/50" strokeWidth={1.5} />
                      <span>{row.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
