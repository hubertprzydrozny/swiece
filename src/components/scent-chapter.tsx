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
    <article className="border-b border-line bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 md:grid-cols-2 md:px-8 lg:gap-24">
        <div className={reverse ? "md:order-2" : undefined}>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-2xs uppercase tracking-caps text-accent font-medium">
              {product.index} / {product.location}
            </span>
            <span className="font-mono text-2xs text-muted">
              {product.character}
            </span>
          </div>

          <p className="mt-6 font-mono text-5xl md:text-6xl tracking-display text-fg/20 leading-none" style={{ letterSpacing: "-0.03em" }}>
            <ClockTime time={product.time} />
          </p>

          <h2 className="mt-4 font-display text-4xl md:text-5xl font-medium tracking-display text-fg leading-tight">
            {product.name}
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8 pt-6 border-t border-line">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted block mb-3">
              Nuty zapachowe
            </span>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3.5 py-1 rounded-full bg-surface border border-line font-mono text-2xs uppercase tracking-caps text-fg"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 font-semibold">
              <Link to="/zapach/$id" params={{ id: product.id }}>
                Poznaj zapach
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <button
              onClick={handleAddToCart}
              className="inline-flex h-14 items-center gap-2 rounded-full border border-line bg-surface px-6 font-mono text-2xs font-semibold uppercase tracking-caps text-fg hover:bg-elevated hover:border-accent transition-colors"
            >
              <ShoppingBag className="size-4" strokeWidth={1.5} />
              <span>Dodaj do koszyka</span>
            </button>
          </div>
        </div>

        {/* Apple: czyste zdjęcie bez ramek, całe na kremowym tle */}
        <div className={reverse ? "md:order-1" : undefined}>
          <Link
            to="/zapach/$id"
            params={{ id: product.id }}
            className="group relative mx-auto block overflow-hidden rounded-3xl bg-elevated transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="aspect-4/5 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="image-zoom h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-2xs uppercase tracking-caps text-white/90">
                Zobacz szczegóły →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
