import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ClockTime } from "@/components/clock";
import { ProductCard } from "@/components/product-card";
import { QtySelector } from "@/components/qty-selector";
import { ComparisonTable } from "@/components/comparison-table";
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
        content:
          loaderData?.product.description ??
          "Naturalna świeca sojowa LOMMA.",
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
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
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
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:gap-16 md:px-8 md:py-16">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-4/5 w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="md:sticky md:top-28 md:self-start">
          <p className="font-mono text-2xs uppercase tracking-caps text-accent">
            {product.location} · <ClockTime time={product.time} />
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-display md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-xl tabular-nums">
            {formatPrice(product.price)}
          </p>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            {product.description}
          </p>
          <p className="mt-4 font-mono text-2xs uppercase tracking-caps text-muted">
            180 g · ~40 h palenia · ręcznie zalewana w Polsce
          </p>

          <div ref={actionsRef} className="mt-8 flex flex-wrap items-center gap-3">
            <QtySelector value={qty} onChange={setQty} />
            <Button type="button" className="flex-1 min-w-40" onClick={addProduct}>
              Dodaj do koszyka
            </Button>
          </div>
          <p className="mt-3 font-mono text-2xs uppercase tracking-caps text-accent">
            Darmowa dostawa od 199 zł
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-mono text-2xs uppercase tracking-caps text-accent">
              Nuty zapachowe
            </p>
            <p className="mt-3 font-mono text-sm uppercase tracking-caps">
              {product.notes.join(" · ")}
            </p>
            <p className="mt-6 font-mono text-2xs uppercase tracking-caps text-muted">
              Charakter
            </p>
            <p className="mt-2 text-sm">{product.character}</p>
          </div>

          <div className="mt-10 border border-line bg-surface p-5 md:p-6">
            <p className="font-display text-xl">W zestawie korzystniej</p>
            <div className="mt-5 border-t border-line pt-5">
              <p className="text-sm">Dwa zapachy</p>
              <p className="mt-1 text-xs text-muted">
                {product.name} + drugi · {formatPrice(169)} · oszczędzasz{" "}
                {formatPrice(9)}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Select
                  value={bundlePartner}
                  onValueChange={(value) =>
                    setBundlePartner(value as ProductId)
                  }
                >
                  <SelectTrigger aria-label="Wybierz drugi zapach">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {others.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    addMany([product.id, bundlePartner]);
                    toast("Dodano zestaw do koszyka", {
                      action: {
                        label: "Koszyk",
                        onClick: () => setCartOpen(true),
                      },
                    });
                  }}
                >
                  Dodaj zestaw
                </Button>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm">Cała kolekcja</p>
                <p className="mt-1 text-xs text-muted">
                  Karkonosze + Ogród + Bałtyk · {formatPrice(239)} · oszczędzasz{" "}
                  {formatPrice(28)} · darmowa dostawa
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  addMany(["karkonosze", "ogrod", "baltyk"]);
                  toast("Dodano zestaw do koszyka", {
                    action: {
                      label: "Koszyk",
                      onClick: () => setCartOpen(true),
                    },
                  });
                }}
              >
                Dodaj zestaw
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
          <div>
            <h2 className="font-display text-2xl">Szczegóły</h2>
            <ul className="mt-6">
              {PRODUCT_FACTS.map((fact) => (
                <li
                  key={fact.label}
                  className="flex items-center justify-between border-t border-line py-3 font-mono text-2xs uppercase tracking-caps last:border-b"
                >
                  <span className="text-muted">{fact.label}</span>
                  <span>{fact.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Jak pachnie?</h2>
            <ul className="mt-6 space-y-4">
              {product.howItSmells.map((note) => (
                <li key={note.name}>
                  <p className="font-mono text-2xs uppercase tracking-caps text-accent">
                    {note.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{note.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl">Jak palić?</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Pamiętaj, aby przy pierwszym paleniu pozwolić woskowi stopić się
              równomiernie do krawędzi. Zawsze przycinaj knot do 5 mm przed
              kolejnym użyciem.
            </p>
          </div>
        </div>
      </section>

      <ComparisonTable />

      <section className="border-t border-line px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl">Pozostałe chwile</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {sticky ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm">{product.name}</p>
              <p className="font-mono text-2xs tabular-nums text-muted">
                {formatPrice(product.price)}
              </p>
            </div>
            <Button type="button" size="sm" onClick={addProduct}>
              Dodaj
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
