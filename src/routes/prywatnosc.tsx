import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/prywatnosc")({
  component: PrivacyPage,
  head: () => ({
    meta: [{ title: "Polityka prywatności — LOMMA" }],
  }),
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-2xs uppercase tracking-caps text-accent">
        Informacje
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium tracking-display">
        Polityka prywatności
      </h1>
      <p className="mt-8 leading-relaxed text-muted">
        Dbamy o prywatność osób odwiedzających stronę LOMMA. Dane podane w
        formularzu zamówienia służą wyłącznie do obsługi zamówienia i kontaktu.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        W sprawach dotyczących danych napisz na kontakt@lomma.pl.
      </p>
    </article>
  );
}
