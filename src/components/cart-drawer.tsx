import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { QtySelector } from "@/components/qty-selector";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FREE_SHIPPING_THRESHOLD, PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const setOpen = useUiStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const totals = cartTotals(items);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-bg">
        <SheetHeader>
          <SheetTitle>Koszyk</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Jeszcze pusto."
              : `${totals.quantity} ${totals.quantity === 1 ? "świeca" : "świece"}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
              <ShoppingBag className="size-8 text-muted" strokeWidth={1.25} />
              <p className="max-w-xs text-sm text-muted">
                Wybierz chwilę, do której chcesz wracać.
              </p>
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/sklep">Odkryj zapachy</Link>
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => {
                const product = PRODUCTS[item.id];
                return (
                  <li key={item.id} className="flex gap-4">
                    <Link
                      to="/zapach/$id"
                      params={{ id: product.id }}
                      onClick={() => setOpen(false)}
                      aria-label={product.name}
                      className="size-20 shrink-0 overflow-hidden bg-surface"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg leading-tight">
                        {product.name}
                      </p>
                      <p className="mt-1 font-mono text-2xs uppercase tracking-caps text-muted">
                        {product.location} · {product.time}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
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
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {items.length > 0 ? (
          <div className="border-t border-line bg-bg px-6 py-5">
            <div className="mb-5 border-y border-line bg-transparent py-4">
              <div className="flex items-center justify-between gap-3 font-mono text-2xs uppercase tracking-caps">
                <span className={totals.missingForFree > 0 ? "text-muted" : "text-accent"}>
                  {totals.missingForFree > 0
                    ? `Brakuje ${formatPrice(totals.missingForFree)}`
                    : "Darmowa dostawa ✓"}
                </span>
                <span className="text-muted">od {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden bg-line">
                <div
                  className="h-full bg-accent transition-[width] duration-500"
                  style={{
                    width: `${Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
            {totals.discount > 0 ? (
              <div className="mb-2 flex justify-between text-sm text-accent">
                <span>Rabat za zestaw</span>
                <span>−{formatPrice(totals.discount)}</span>
              </div>
            ) : null}
            <div className="mb-5 flex justify-between font-display text-xl">
              <span>Razem</span>
              <span className="tabular-nums">{formatPrice(totals.total)}</span>
            </div>
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link to="/koszyk">Przejdź do koszyka</Link>
            </Button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
