import { Link } from "@tanstack/react-router";
import { ClockTime } from "@/components/clock";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/zapach/$id"
      params={{ id: product.id }}
      className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 ease-out hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-elevated border border-line/60">
        <img
          src={product.image}
          alt={product.name}
          className="image-zoom h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 rounded-full bg-bg/80 backdrop-blur-xs px-2.5 py-0.5 font-mono text-2xs font-bold uppercase tracking-caps text-fg border border-line">
          {product.index}
        </span>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="mb-2">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-2xs uppercase tracking-caps text-accent font-medium">
            {product.location} · <ClockTime time={product.time} />
          </span>
        </div>
        <h3 className="font-display text-2xl font-medium tracking-display text-fg group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 font-mono text-2xs uppercase tracking-caps text-muted">
          {product.notes.join(" · ")}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-line/60">
          <span className="font-mono text-sm font-semibold text-fg">
            {formatPrice(product.price)}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-caps text-accent font-medium group-hover:underline">
            Poznaj zapach →
          </span>
        </div>
      </div>
    </Link>
  );
}
