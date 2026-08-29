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
    <section className="py-16 md:py-24 border-t border-line bg-surface/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="font-mono text-2xs uppercase tracking-caps text-accent block mb-2">
            Dlaczego LOMMA?
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-fg">
            Świeca sojowa LOMMA vs Zwykłe świece parafinowe
          </h2>
          <p className="mt-3 text-muted text-sm max-w-xl mx-auto">
            Świadomy wybór dla Twojego zdrowia, wnętrza i domowej atmosfery.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-line bg-bg">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-line bg-elevated">
                <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-muted">Cecha</th>
                <th className="py-4 px-4 font-display text-base text-accent font-medium w-1/3">
                  LOMMA Świece Sojowe
                </th>
                <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-muted w-1/3">
                  Zwykłe Świece (Parafina)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-fg">{row.feature}</td>
                  <td className="py-4 px-4 text-fg bg-accent/5">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-full bg-accent/20 text-accent shrink-0">
                        <Check className="size-4" />
                      </span>
                      <span>{row.lomma}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-full bg-danger/10 text-danger shrink-0">
                        <X className="size-4" />
                      </span>
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
