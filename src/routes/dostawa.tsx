import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dostawa")({
  component: ShippingPage,
  head: () => ({
    meta: [{ title: "Dostawa i zwroty — LOMMA" }],
  }),
});

function ShippingPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-2xs uppercase tracking-caps text-accent">
        Informacje
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium tracking-display">
        Dostawa i zwroty
      </h1>
      <h2 className="mt-12 font-display text-2xl">Dostawa</h2>
      <p className="mt-4 leading-relaxed text-muted">
        Wysyłamy zamówienia maksymalnie do 48 godzin roboczych od potwierdzenia
        płatności. Dostawa kosztuje 13,99 zł, a przy zamówieniach od 199 zł jest
        bezpłatna.
      </p>
      <h2 className="mt-10 font-display text-2xl">Zwroty</h2>
      <p className="mt-4 leading-relaxed text-muted">
        Zgodnie z obowiązującymi przepisami masz 14 dni na odstąpienie od umowy.
        W sprawie zwrotu napisz na kontakt@lomma.pl.
      </p>
    </article>
  );
}
