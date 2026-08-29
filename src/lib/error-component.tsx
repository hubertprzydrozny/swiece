import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-8" strokeWidth={1.5} />
      </span>
      <h1 className="font-display text-2xl font-medium tracking-display">
        Coś poszło nie tak
      </h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "Wystąpił nieoczekiwany błąd. Odśwież stronę."}
      </p>
    </main>
  );
}
