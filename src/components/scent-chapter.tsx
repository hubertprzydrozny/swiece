import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ClockTime } from "@/components/clock";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

export function ScentChapter({
  product,
  reverse = false,
}: {
  product: Product;
  reverse?: boolean;
}) {
  return (
    <article className="relative min-h-[100svh] overflow-hidden">
      <img
        src={product.scene}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/55 to-bg/20" />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-end gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 lg:px-10">
        <div className={reverse ? "md:order-2" : undefined}>
          <p className="font-mono text-2xs uppercase tracking-caps text-accent">
            {product.index} / {product.location}
          </p>
          <p className="mt-6 font-mono text-4xl tracking-display text-fg md:text-5xl">
            <ClockTime time={product.time} />
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-display text-fg italic md:text-5xl">
            {product.name}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-fg/80">
            {product.description}
          </p>
          <p className="mt-4 font-mono text-2xs uppercase tracking-caps text-accent">
            {product.notes.join(" · ")}
          </p>
          <Button asChild className="mt-8">
            <Link to="/zapach/$id" params={{ id: product.id }}>
              Poznaj zapach
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
        <div className={reverse ? "md:order-1" : undefined}>
          <Link
            to="/zapach/$id"
            params={{ id: product.id }}
            className="group relative mx-auto block max-w-sm overflow-hidden border border-line bg-surface/40 p-3 backdrop-blur-sm"
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
