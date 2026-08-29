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
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  return (
    <article className="group flex h-full flex-col border-t border-line bg-transparent py-5 md:py-6">
      <Link to="/zapach/$id" params={{ id: product.id }} className="block focus-visible:outline-offset-4">
        <div className="relative overflow-hidden bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="image-zoom aspect-[4/5] h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 bg-bg/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-fg">
            {product.index}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <Link to="/zapach/$id" params={{ id: product.id }} className="block">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted">
              {product.location} · <ClockTime time={product.time} />
            </p>
            <p className="font-mono text-sm tabular-nums text-fg">{formatPrice(product.price)}</p>
          </div>
          <h3 className="mt-3 font-display text-3xl font-medium leading-none tracking-display text-fg transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {product.description}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {product.notes.join(" · ")}
          </p>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <Link
            to="/zapach/$id"
            params={{ id: product.id }}
            className="font-sans text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            Poznaj zapach
          </Link>
          <Button type="button" size="sm" className="shrink-0" onClick={handleAdd}>
            <ShoppingBag className="size-4" strokeWidth={1.5} />
            Dodaj do koszyka
          </Button>
        </div>
      </div>
    </article>
  );
}
