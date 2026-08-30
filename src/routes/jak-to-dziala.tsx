import { createFileRoute, Link } from "@tanstack/react-router";
import { ComparisonTable } from "@/components/comparison-table";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, Clock, Recycle, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/jak-to-dziala")({
  component: JakToDzialaComponent,
});

function JakToDzialaComponent() {
  const steps = [
    {
      num: "01",
      icon: Flame,
      title: "Pierwsze Palenie (Płaski Basen)",
      desc: "Pozwól świecy palić się przez około 2–3 godziny przy pierwszym zapaleniu, aż stopiony wosk sięgnie samych brzegów naczynia. Zapobiega to powstawaniu tak zwanego 'tunelu' i wydłuża żywotność świecy.",
    },
    {
      num: "02",
      icon: Scissors,
      title: "Przycinanie Knota",
      desc: "Przed każdym kolejnym paleniem skróć bawełniany knot do długości około 4–5 mm. Dzięki temu płomień pozostanie równy i czysty, a świeca nie będzie kopcić.",
    },
    {
      num: "03",
      icon: Clock,
      title: "Czas i Bezpieczeństwo",
      desc: "Zalecany optymalny czas jednego palenia to 2 do 4 godzin. W tym czasie naczynie nie ulega przegrzaniu, a olejki zapachowe z Grasse idealnie wypełniają całą przestrzeń.",
    },
    {
      num: "04",
      icon: Recycle,
      title: "Drugie Życie Naczynia (Upcycling)",
      desc: "Po skończonym użytkowaniu umyj naczynie ciepłą wodą z mydłem. Transparentne szkło z bambusową pokrywką doskonale sprawdzi się jako pojemnik na drobiazgi, biżuterię lub kosmetyki.",
    },
  ];

  return (
    <div className="min-h-svh bg-bg text-fg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <span className="font-mono text-2xs uppercase tracking-brand text-accent block mb-3">
          Sztuka & Rytuał Palenia Świec
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-fg leading-tight">
          Jak prawidłowo używać świec sojowych LOMMA?
        </h1>
        <p className="mt-6 text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Poznaj proste zasady, które pozwolą Ci cieszyć się czystym płomieniem, głębią zapachu i maksymalnym czasem palenia aż do 40 godzin.
        </p>
      </section>

      {/* Steps Grid */}
      <section className="py-12 md:py-16 border-t border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex flex-col justify-between border-t border-line pt-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xl text-accent font-medium">
                        {step.num}
                      </span>
                      <IconComp className="size-6 text-accent" strokeWidth={1.25} />
                    </div>
                    <h3 className="font-display text-2xl text-fg mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <ComparisonTable />

      {/* CTA Section */}
      <section className="py-16 md:py-24 text-center px-4 sm:px-6 bg-surface/50 border-t border-line">
        <div className="max-w-2xl mx-auto">
          <p className="flex items-center justify-center gap-2 font-mono text-2xs uppercase tracking-caps text-accent mb-4">
            <ShieldCheck className="size-4" strokeWidth={1.5} />
            Gwarancja satysfakcji
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-fg mb-4">
            Odkryj nasze zapachy
          </h2>
          <p className="text-muted text-sm mb-8">
            Cztery wyjątkowe kompozycje inspirowane miejscami i czasem. Wybierz swój ulubiony zapach lub zamów pełną Kolekcję 01 w darmowej dostawie.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/">
                Zobacz Kolekcję 01
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
