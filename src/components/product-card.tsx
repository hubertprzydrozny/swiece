import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { ClockTime } from "@/components/clock";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  const handleAdd = () => {
    add(product.id, 1);
    toast(`Dodano: ${product.name}`, {
      action: {
        label: "Koszyk",
        onClick: () => setCartOpen(true),
      },
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-elevated p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
      <Link
        to="/zapach/$id"
        params={{ id: product.id }}
        className="block rounded-[1.35rem] focus-visible:outline-offset-2"
      >
        <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="image-zoom h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-2xs font-bold uppercase tracking-caps text-white backdrop-blur-sm">
            {product.index}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
        <Link to="/zapach/$id" params={{ id: product.id }} className="block">
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-2xs font-medium uppercase tracking-caps text-accent">
            {product.location} · <ClockTime time={product.time} />
          </span>
          <h3 className="mt-4 font-display text-3xl font-medium leading-none tracking-display text-fg transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-3 min-h-10 font-mono text-2xs uppercase tracking-caps text-muted">
            {product.notes.join(" · ")}
          </p>
        </Link>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end justify-between gap-3 border-t border-line/70 pt-4">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-caps text-muted">
                180 g · ~40 h
              </span>
              <span className="mt-1 block font-mono text-base font-semibold tabular-nums text-fg">
                {formatPrice(product.price)}
              </span>
            </div>
            <Link
              to="/zapach/$id"
              params={{ id: product.id }}
              className="font-mono text-2xs uppercase tracking-caps text-muted transition-colors hover:text-accent"
            >
              Szczegóły →
            </Link>
          </div>

          <Button
            type="button"
            size="md"
            className="w-full rounded-full"
            onClick={handleAdd}
          >
            <ShoppingBag className="size-4" strokeWidth={1.5} />
            Dodaj do koszyka
          </Button>
        </div>
      </div>
    </article>
  );
}
