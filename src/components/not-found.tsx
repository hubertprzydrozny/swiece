import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-start justify-center px-5 py-24 md:px-8">
      <p className="font-mono text-2xs uppercase tracking-caps text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-display italic">
        Ta chwila nie istnieje.
      </h1>
      <p className="mt-5 max-w-md text-muted">
        Wygląda na to, że szukana strona zmieniła miejsce.
      </p>
      <Button asChild className="mt-10">
        <Link to="/">Wróć na stronę główną</Link>
      </Button>
    </section>
  );
}
