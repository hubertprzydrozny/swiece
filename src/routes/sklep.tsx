import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCT_LIST } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export const Route = createFileRoute("/sklep")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Sklep — LOMMA | Kolekcja Zapachów" },
      {
        name: "description",
        content:
          "Odkryj kolekcję zapachów LOMMA. Naturalne świece sojowe inspirowane konkretnymi miejscami i wspomnieniami.",
      },
    ],
  }),
});

function ShopPage() {
  const addMany = useCartStore((s) => s.addMany);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="font-mono text-2xs uppercase tracking-caps text-accent">
        Kolekcja
      </p>
      <h1 className="mt-3 font-display text-5xl font-medium tracking-display">
        Zapisane chwile.
      </h1>
      <p className="mt-5 max-w-xl text-muted">
        Trzy miejsca. Trzy pory dnia. Trzy wspomnienia. Wybierz zapach, który
        przywoła Twój ulubiony moment.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16 grid gap-8 border border-line bg-surface p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
        <div>
          <p className="font-mono text-2xs uppercase tracking-caps text-accent">
            Cała kolekcja
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-display">
            Trzy chwile. Jeden zestaw.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Karkonosze, Ogród i Bałtyk razem — {formatPrice(239)} zamiast{" "}
            {formatPrice(267)}. Darmowa dostawa w zestawie.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="font-mono text-lg tabular-nums">{formatPrice(239)}</p>
          <Button
            type="button"
            onClick={() => {
              addMany(["karkonosze", "ogrod", "baltyk"]);
              toast("Dodano zestaw do koszyka", {
                action: {
                  label: "Koszyk",
                  onClick: () => setCartOpen(true),
                },
              });
            }}
          >
            Dodaj zestaw
          </Button>
        </div>
      </div>
    </div>
  );
}
