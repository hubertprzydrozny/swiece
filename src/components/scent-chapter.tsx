import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
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
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  const handleAddToCart = () => {
    add(product.id, 1);
    toast(`Dodano: ${product.name}`, {
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  return (
    <article className="border-b border-line bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 md:grid-cols-2 md:px-8 lg:gap-24">
        <div className={reverse ? "md:order-2" : undefined}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-2xs uppercase tracking-caps text-accent">
              {product.index} / {product.location}
            </p>
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
            {product.shortDescription}
          </p>

          <div className="mt-8 pt-6 border-t border-line">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted block mb-3">
              Nuty zapachowe
            </span>
            <p className="font-display text-2xl text-fg">
              {product.notes.join(" · ")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link to="/zapach/$id" params={{ id: product.id }}>
                Poznaj zapach
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleAddToCart}>
              <ShoppingBag className="size-4" strokeWidth={1.5} />
              Dodaj do koszyka
            </Button>
          </div>
        </div>

        {/* Apple: czyste zdjęcie bez ramek, całe na kremowym tle */}
        <div className={reverse ? "md:order-1" : undefined}>
          <Link
            to="/zapach/$id"
            params={{ id: product.id }}
            className="group block overflow-hidden bg-elevated"
          >
            <div className="aspect-4/5 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="image-zoom h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
