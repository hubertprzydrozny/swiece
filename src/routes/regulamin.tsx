import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/regulamin")({
  component: TermsPage,
  head: () => ({
    meta: [{ title: "Regulamin — LOMMA" }],
  }),
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-2xs uppercase tracking-caps text-accent">
        Informacje
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium tracking-display">
        Regulamin
      </h1>
      <p className="mt-8 leading-relaxed text-muted">
        Sklep internetowy LOMMA jest obecnie wersją demonstracyjną. Szczegółowy
        regulamin sprzedaży zostanie opublikowany przed uruchomieniem płatności
        online.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        Kontakt: kontakt@lomma.pl
      </p>
    </article>
  );
}
