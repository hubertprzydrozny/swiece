import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { BUNDLE_PRICES, COLLECTION_IDS, PRODUCT_LIST } from "@/lib/products";
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
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <header className="max-w-2xl">
        <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-muted">Kolekcja 01</p>
        <h1 className="mt-4 font-display text-5xl font-medium tracking-display text-fg md:text-6xl">
          Zapisane chwile.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Trzy miejsca. Trzy pory dnia. Zapachy, które mają zostać z Tobą dłużej niż jeden wieczór.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        <span>180 g · ~40 h palenia</span>
        <span>Ręcznie zalewane w Polsce</span>
        <span>Darmowa dostawa od 199 zł</span>
      </div>

      <div className="mt-10 grid gap-x-8 md:grid-cols-3">
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="mt-20 border-y border-line py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.5fr_auto] md:items-end">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-muted">Cała kolekcja</p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-display text-fg">
              Trzy chwile. Jeden zestaw.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Karkonosze, Ogród i Bałtyk razem — {formatPrice(BUNDLE_PRICES.three)} zamiast{" "}
              <span className="line-through">{formatPrice(BUNDLE_PRICES.one * COLLECTION_IDS.length)}</span>. Darmowa dostawa w zestawie.
            </p>
          </div>
          <div className="flex items-end justify-between gap-6 md:flex-col md:items-end">
            <p className="font-display text-4xl font-medium tabular-nums">{formatPrice(BUNDLE_PRICES.three)}</p>
            <Button
              type="button"
              onClick={() => {
                addMany(COLLECTION_IDS);
                toast("Dodano: Zestaw Odkrywcy", {
                  action: { label: "Koszyk", onClick: () => setCartOpen(true) },
                });
              }}
            >
              Dodaj zestaw
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
