import { createFileRoute, Link } from "@tanstack/react-router";
import { QtySelector } from "@/components/qty-selector";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart";

export const Route = createFileRoute("/koszyk")({
  component: CartPage,
  head: () => ({
    meta: [{ title: "Koszyk — LOMMA" }],
  }),
});

function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const totals = cartTotals(items);

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-start justify-center px-5 py-24 md:px-8">
        <h1 className="font-display text-5xl font-medium tracking-display">
          Twój koszyk jest pusty.
        </h1>
        <p className="mt-4 text-muted">
          Wybierz chwilę, do której chcesz wracać.
        </p>
        <Button asChild className="mt-8">
          <Link to="/sklep">Odkryj zapachy</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-5xl font-medium tracking-display">
        Twój koszyk
      </h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px] lg:items-start">
        <div>
          {totals.missingForFree > 0 ? (
            <div className="mb-6 border border-line bg-surface px-4 py-3 font-mono text-2xs uppercase tracking-caps text-muted">
              Do darmowej dostawy brakuje {formatPrice(totals.missingForFree)} ·{" "}
              <Link to="/sklep" className="text-accent hover:text-fg">
                dobierz zapach
              </Link>
            </div>
          ) : (
            <div className="mb-6 border border-line bg-surface px-4 py-3 font-mono text-2xs uppercase tracking-caps text-accent">
              Darmowa dostawa
            </div>
          )}
          <ul>
            {items.map((item) => {
              const product = PRODUCTS[item.id];
              return (
                <li
                  key={item.id}
                  className="grid grid-cols-[80px_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                >
                  <Link
                    to="/zapach/$id"
                    params={{ id: product.id }}
                    className="aspect-square overflow-hidden bg-surface"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div>
                    <p className="font-mono text-2xs uppercase tracking-caps text-muted">
                      {product.location} · {product.time}
                    </p>
                    <h2 className="mt-1 font-display text-xl">{product.name}</h2>
                    <p className="mt-1 font-mono text-2xs uppercase tracking-caps text-accent">
                      {product.notes.join(" · ")}
                    </p>
                    <div className="mt-4 flex items-center gap-4 sm:hidden">
                      <QtySelector
                        value={item.qty}
                        onChange={(qty) => setQty(item.id, qty)}
                        min={0}
                      />
                      <button
                        type="button"
                        className="font-mono text-2xs uppercase tracking-caps text-muted underline"
                        onClick={() => remove(item.id)}
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 hidden flex-col items-end gap-3 sm:col-span-1 sm:flex">
                    <p className="font-mono text-sm tabular-nums">
                      {formatPrice(product.price * item.qty)}
                    </p>
                    <QtySelector
                      value={item.qty}
                      onChange={(qty) => setQty(item.id, qty)}
                      min={0}
                    />
                    <button
                      type="button"
                      className="font-mono text-2xs uppercase tracking-caps text-muted underline-offset-4 hover:text-fg hover:underline"
                      onClick={() => remove(item.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <aside className="border border-line bg-surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Podsumowanie</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Wartość produktów</span>
              <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 ? (
              <div className="flex justify-between text-accent">
                <span>Rabat za zestaw</span>
                <span className="tabular-nums">
                  −{formatPrice(totals.discount)}
                </span>
              </div>
            ) : null}
            <div className="flex justify-between text-muted">
              <span>Dostawa</span>
              <span className="tabular-nums">
                {totals.shipping === 0 ? "Darmowa" : formatPrice(totals.shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-line pt-4 font-display text-xl text-fg">
              <span>Razem</span>
              <span className="tabular-nums">{formatPrice(totals.total)}</span>
            </div>
          </div>
          <Button asChild className="mt-8 w-full">
            <Link to="/zamowienie">Przejdź do zamówienia</Link>
          </Button>
        </aside>
      </div>
    </section>
  );
}
