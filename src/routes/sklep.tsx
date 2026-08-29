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
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 font-mono text-2xs font-medium uppercase tracking-brand text-accent">
          Kolekcja 01 · 3 zapachy
        </span>
        <h1 className="mt-5 font-display text-5xl font-medium tracking-display text-fg md:text-6xl">
          Zapisane chwile.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Trzy miejsca. Trzy pory dnia. Trzy wspomnienia. Wybierz zapach, który
          przywoła Twój ulubiony moment.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {['180 g · ~40 h palenia', 'Ręcznie zalewane w Polsce', 'Darmowa dostawa od 199 zł'].map((item) => (
          <div key={item} className="rounded-2xl border border-line bg-surface/55 px-4 py-3 font-mono text-2xs uppercase tracking-caps text-muted">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-line bg-surface p-8 md:p-12 shadow-xl hover:border-accent/40 transition-all duration-300 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-2xs uppercase tracking-caps text-accent font-medium mb-3">
            Cała kolekcja
          </span>
          <h2 className="font-display text-3xl font-medium tracking-display text-fg">
            Trzy chwile. Jeden zestaw.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Karkonosze, Ogród i Bałtyk razem — {formatPrice(239)} zamiast{" "}
            <span className="line-through">{formatPrice(267)}</span>. Darmowa dostawa w zestawie.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="font-display text-4xl font-semibold text-fg">{formatPrice(239)}</p>
          <Button
            type="button"
            className="rounded-full px-8 py-3.5 text-sm font-semibold"
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
