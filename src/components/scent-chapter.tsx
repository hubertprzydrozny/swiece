import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { ClockTime } from "@/components/clock";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function ScentChapter({
  product,
  reverse = false,
}: {
  product: Product;
  reverse?: boolean;
}) {
  const add = useCartStore((s) => s.add);
  const { setCartOpen, setLastAdded } = useUiStore();

  const handleAddToCart = () => {
    add(product.id, 1);
    setLastAdded(product.name);
    setCartOpen(true);
  };

  return (
    <article className="border-b border-line bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:px-8 lg:gap-16">
        <div className={reverse ? "md:order-2" : undefined}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs uppercase tracking-caps text-accent font-medium">
              {product.index} / {product.location}
            </span>
            <span className="text-line font-mono text-2xs">·</span>
            <span className="font-mono text-2xs uppercase tracking-caps text-muted">
              {product.character}
            </span>
          </div>

          <p className="mt-4 font-mono text-4xl tracking-display text-fg md:text-5xl">
            <ClockTime time={product.time} />
          </p>

          <h2 className="mt-3 font-display text-4xl md:text-5xl font-medium tracking-display text-fg">
            {product.name}
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 pt-5 border-t border-line">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted block mb-2">
              Nuty zapachowe
            </span>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 rounded-full bg-surface border border-line font-mono text-2xs uppercase tracking-caps text-fg"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link to="/zapach/$id" params={{ id: product.id }}>
                Poznaj zapach
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <button
              onClick={handleAddToCart}
              className="inline-flex h-14 items-center gap-2 border border-line px-6 font-mono text-2xs uppercase tracking-caps text-fg hover:bg-surface hover:border-line-strong transition-colors"
            >
              <ShoppingBag className="size-4" strokeWidth={1.5} />
              <span>Dodaj ({product.price} zł)</span>
            </button>
          </div>
        </div>

        <div className={reverse ? "md:order-1" : undefined}>
          <Link
            to="/zapach/$id"
            params={{ id: product.id }}
            className="group relative mx-auto block overflow-hidden border border-line bg-surface p-3 transition-all duration-300 hover:border-line-strong hover:shadow-lg"
          >
            <div className="aspect-4/5 overflow-hidden border border-line">
              <img
                src={product.scene || product.image}
                alt={product.name}
                className="image-zoom h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-mono text-2xs uppercase tracking-caps text-muted">
                {product.name} — 180g
              </span>
              <span className="font-mono text-2xs text-accent">
                Zobacz szczegóły →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
