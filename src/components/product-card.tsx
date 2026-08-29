import { Link } from "@tanstack/react-router";
import { ClockTime } from "@/components/clock";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/zapach/$id"
      params={{ id: product.id }}
      className="group flex flex-col border border-line bg-surface p-4 transition-[border-color,transform] duration-300 ease-out hover:border-line-strong hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-elevated">
        <img
          src={product.image}
          alt={product.name}
          className="image-zoom h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 font-mono text-2xs uppercase tracking-caps text-ink/70">
          {product.index}
        </span>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="font-mono text-2xs uppercase tracking-caps text-muted">
          {product.location} · <ClockTime time={product.time} />
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium tracking-display text-fg">
          {product.name}
        </h3>
        <p className="mt-2 font-mono text-2xs uppercase tracking-caps text-accent">
          {product.notes.join(" · ")}
        </p>
        <div className="mt-auto flex items-end justify-between pt-6">
          <span className="font-mono text-sm tabular-nums">
            {formatPrice(product.price)}
          </span>
          <span className="font-mono text-2xs uppercase tracking-caps text-muted transition-colors group-hover:text-accent">
            Poznaj zapach
          </span>
        </div>
      </div>
    </Link>
  );
}
