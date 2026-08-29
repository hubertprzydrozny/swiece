import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ClockTime } from "@/components/clock";
import { ComparisonTable } from "@/components/comparison-table";
import { ProductCard } from "@/components/product-card";
import { QtySelector } from "@/components/qty-selector";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProduct,
  PRODUCT_FACTS,
  PRODUCT_LIST,
  type Product,
  type ProductId,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export const Route = createFileRoute("/zapach/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.product.name ?? "Zapach"} — LOMMA | Świeca sojowa 180g`,
      },
      {
        name: "description",
        content: loaderData?.product.description ?? "Naturalna świeca sojowa LOMMA.",
      },
    ],
  }),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const others = PRODUCT_LIST.filter((p) => p.id !== product.id);
  const [bundlePartner, setBundlePartner] = useState<ProductId>(others[0].id);
  const add = useCartStore((s) => s.add);
  const addMany = useCartStore((s) => s.addMany);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    setQty(1);
    setBundlePartner(others[0].id);
  }, [product.id]);

  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [product.id]);

  const addProduct = () => {
    add(product.id, qty);
    toast(`Dodano do koszyka: ${product.name}`, {
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-8 md:grid-cols-[1.08fr_0.92fr] md:gap-16 md:px-8 md:py-12 lg:gap-20">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="overflow-hidden bg-surface">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            LOMMA · Kolekcja 01 · {product.index}
          </p>
        </div>

        <div className="md:pt-2">
          <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted">
            {product.location} · <ClockTime time={product.time} />
          </p>
          <h1 className="mt-4 max-w-xl font-display text-5xl font-medium leading-[0.94] tracking-display text-fg md:text-6xl">
            {product.name}
          </h1>

          <div className="mt-6 border-y border-line py-5">
            <div className="flex items-baseline justify-between gap-6">
              <p className="font-display text-3xl font-medium tabular-nums text-fg">
                {formatPrice(product.price)}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                180 g · ~40 h
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            {product.description}
          </p>

          <div ref={actionsRef} className="mt-8 grid gap-3 sm:grid-cols-[auto_1fr]">
            <QtySelector value={qty} onChange={setQty} />
            <Button type="button" size="lg" className="w-full" onClick={addProduct}>
              Dodaj do koszyka · {formatPrice(product.price * qty)}
            </Button>
          </div>

          <div className="mt-7 grid divide-y border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="py-4 md:px-4 md:first:pl-0">
              <p className="font-sans text-xs font-medium text-fg">Wysyłka</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">W dni robocze, zgodnie z wybraną metodą dostawy.</p>
            </div>
            <div className="py-4 md:px-4">
              <p className="font-sans text-xs font-medium text-fg">Dostawa</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">Darmowa od 199 zł.</p>
            </div>
            <div className="py-4 md:px-4 md:last:pr-0">
              <p className="font-sans text-xs font-medium text-fg">Zwroty</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">Szczegóły w zasadach dostawy i zwrotów.</p>
            </div>
          </div>

          <div className="mt-10 border-y border-line">
            <div className="grid gap-6 py-6 sm:grid-cols-2">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.08em] text-muted">Nuty zapachowe</p>
                <p className="mt-3 font-display text-2xl text-fg">{product.notes.join(" · ")}</p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.08em] text-muted">Charakter</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{product.character}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-b border-line pb-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {PRODUCT_FACTS.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 border-t border-line pt-3 text-sm">
                  <span className="text-muted">{fact.label}</span>
                  <span className="text-right text-fg">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-b border-line pb-8">
            <h2 className="font-display text-2xl text-fg">W zestawie korzystniej</h2>
            <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-fg">Dwa zapachy · {formatPrice(169)}</p>
                  <p className="mt-1 text-xs text-muted">Oszczędzasz {formatPrice(9)}.</p>
                </div>
                <div className="flex gap-2">
                  <Select value={bundlePartner} onValueChange={(value) => setBundlePartner(value as ProductId)}>
                    <SelectTrigger aria-label="Wybierz drugi zapach" className="min-w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {others.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      addMany([product.id, bundlePartner]);
                      toast("Dodano zestaw do koszyka", {
                        action: { label: "Koszyk", onClick: () => setCartOpen(true) },
                      });
                    }}
                  >
                    Dodaj
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-fg">Cała kolekcja · {formatPrice(239)}</p>
                  <p className="mt-1 text-xs text-muted">3 świece · oszczędzasz {formatPrice(28)} · darmowa dostawa.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    addMany(["karkonosze", "ogrod", "baltyk"]);
                    toast("Dodano zestaw do koszyka", {
                      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
                    });
                  }}
                >
                  Dodaj
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/35">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8 md:py-20">
          <div>
            <h2 className="font-display text-3xl text-fg">Jak pachnie?</h2>
            <ul className="mt-7 space-y-5">
              {product.howItSmells.map((note) => (
                <li key={note.name}>
                  <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted">{note.name}</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{note.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl text-fg">Jak palić?</h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted">
              Przy pierwszym paleniu pozwól woskowi stopić się równomiernie do krawędzi. Przed kolejnym użyciem przytnij knot do 5 mm.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-fg">Świeca do Twojego wnętrza</h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted">
              Prosta forma, naturalne kolory i zapach, który ma być częścią przestrzeni — nie jej centrum.
            </p>
          </div>
        </div>
      </section>

      <ComparisonTable />

      <section className="border-t border-line px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl md:text-4xl">Pozostałe chwile</h2>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:inline">Kolekcja 01</span>
          </div>
          <div className="mt-8 grid gap-x-8 md:grid-cols-2">
            {others.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {sticky ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm">{product.name}</p>
              <p className="font-mono text-2xs tabular-nums text-muted">{formatPrice(product.price)}</p>
            </div>
            <Button type="button" size="sm" onClick={addProduct}>Dodaj do koszyka</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
