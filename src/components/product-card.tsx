import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { ClockTime } from "@/components/clock";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const setAddedProduct = useUiStore((s) => s.setAddedProduct);

  const handleAdd = () => {
    add(product.id, 1);
    setAddedProduct(product.id);
  };


  return (
    <article className="group flex h-full flex-col border-t border-line bg-transparent pt-4 pb-6 transition-colors duration-300 hover:border-fg">
      <Link to="/zapach/$id" params={{ id: product.id }} className="block focus-visible:outline-offset-4">
        <div className="relative overflow-hidden bg-surface rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            className="image-zoom aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 bg-bg/90 backdrop-blur-xs px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-fg">
            {product.index}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <Link to="/zapach/$id" params={{ id: product.id }} className="block">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              {product.location} · <ClockTime time={product.time} />
            </p>
            <p className="font-mono text-xs font-medium tabular-nums text-fg">{formatPrice(product.price)}</p>
          </div>
          <h3 className="mt-2 font-display text-xl lg:text-2xl font-light leading-snug tracking-tight text-fg transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
            {product.shortDescription}
          </p>
          <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80 line-clamp-1">
            {product.notes.join(" · ")}
          </p>
        </Link>

        <div className="mt-auto pt-5 flex flex-col gap-2">
          <Button
            type="button"
            size="sm"
            className="w-full text-xs font-medium h-9 gap-1.5"
            onClick={handleAdd}
          >
            <ShoppingBag className="size-3.5" strokeWidth={1.5} />
            Dodaj do koszyka
          </Button>
          <Link
            to="/zapach/$id"
            params={{ id: product.id }}
            className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg py-1"
          >
            Poznaj zapach →
          </Link>
        </div>
      </div>
    </article>
  );
}
