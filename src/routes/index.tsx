import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Check, Truck } from "lucide-react";
import { toast } from "sonner";
import { FaqList } from "@/components/faq-list";
import { ProductCard } from "@/components/product-card";
import { ProductSlider } from "@/components/product-slider";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  BUNDLE_PRICES,
  COLLECTION_IDS,
  PRODUCT_LIST,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "LOMMA — Home Fragrance | Naturalne świece sojowe" },
      {
        name: "description",
        content:
          "LOMMA — zapachy do domu inspirowane polskimi porami dnia, miejscami i atmosferą. Naturalny wosk sojowy.",
      },
    ],
  }),
});

function Home() {
  return (
    <div className="flex flex-col">
      <HeroGtaStyle />
      <CollectionSliderSection />
      <BundleSection />
      <FaqSection />
    </div>
  );
}

/**
 * Czyste, wyraziste Hero inspirowane układem GTA VI The Album:
 * - Duży, szlachetny visual po lewej (okładka / zdjęcie kolekcji świec w kadrze)
 * - Tytuł, opis i wyraźne CTA po prawej
 */
function HeroGtaStyle() {
  return (
    <section className="relative w-full border-b border-line bg-surface/30 pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Obrazek produktu / kolekcji */}
          <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.04)] gta-scroll-trigger is-visible">
            <div className="aspect-square w-full">
              <img
                src="/images/hero-still.jpg"
                alt="Kolekcja świec LOMMA"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="absolute top-4 left-4 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                Kolekcja I · Polska
              </span>
            </div>
          </div>

          {/* Treść Hero */}
          <div className="flex flex-col items-start gta-scroll-trigger is-visible" style={{ animationDelay: "120ms" }}>
            <span className="font-mono text-2xs uppercase tracking-[0.25em] text-accent">
              Naturalne Świece Sojowe
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-fg text-balance">
              Nie zatrzymasz chwili.{" "}
              <span
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                className="italic font-normal block sm:inline text-fg/90"
              >
                Zachowasz jej zapach.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-muted">
              Cztery autorskie kompozycje inspirowane polskimi porami dnia i naturą.
              100% naturalny wosk sojowy, ręcznie zalewany w matowym szkle.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-full px-8 text-xs font-medium tracking-wider uppercase"
              >
                <a href="#kolekcja">
                  Odkryj zapachy
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Link
                to="/sklep"
                className="inline-flex h-13 items-center rounded-full border border-line bg-elevated px-7 font-mono text-2xs uppercase tracking-widest text-fg transition-colors hover:border-fg"
              >
                Przejdź do sklepu
              </Link>
            </div>

            {/* Subtelny pasek atrybutów */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-line/80 pt-6 font-mono text-2xs uppercase tracking-widest text-muted w-full">
              <div>
                <span className="block text-fg font-medium">100% Soja</span>
                <span>Bez parafiny</span>
              </div>
              <div>
                <span className="block text-fg font-medium">~40h</span>
                <span>Czyste spalanie</span>
              </div>
              <div>
                <span className="block text-fg font-medium">Handmade</span>
                <span>Polska Manufaktura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Sekcja Kolekcji ze Scrollem Snap z GTA VI The Album
 */
function CollectionSliderSection() {
  return (
    <section id="kolekcja" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-2xs uppercase tracking-[0.2em] text-accent mb-2 block">
              Kolekcja I
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-fg">
              Cztery zapachy. Cztery nastroje.
            </h2>
          </div>
          <p className="font-mono text-xs text-muted max-w-xs">
            Przewijaj poziomo, aby poznać poszczególne pory dnia.
          </p>
        </div>

        <Reveal>
          <ProductSlider itemCount={PRODUCT_LIST.length}>
            {PRODUCT_LIST.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductSlider>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Wyróżniony box zestawu (zwięzły, konkretny, jak sekcja Pre-save z GTA VI The Album)
 */
function BundleSection() {
  const addMany = useCartStore((s) => s.addMany);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  const handleAddBundle = () => {
    addMany(COLLECTION_IDS);
    toast("Dodano: Kolekcja I — Komplet 4 Świec", {
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  const bundlePrice = BUNDLE_PRICES.three;
  const separatePrice = BUNDLE_PRICES.one * COLLECTION_IDS.length;
  const savings = separatePrice - bundlePrice;

  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="rounded-2xl border border-line bg-elevated p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-caps text-accent mb-3">
                  <Sparkles className="size-3.5" strokeWidth={1.5} />
                  Komplet Kolekcji
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-light leading-tight text-fg">
                  Wszystkie cztery zapachy w jednym zestawie.
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
                  Poranek w Ogrodzie, Popołudnie na Mazurach, Zachód nad Bałtykiem i Wieczór w Karkonoszach. Kompletny rytuał zapachowy na każdą porę dnia.
                </p>

                <ul className="mt-6 space-y-2.5 font-mono text-2xs text-fg">
                  <li className="flex items-center gap-2.5">
                    <Check className="size-3.5 text-accent" strokeWidth={2.5} />
                    <span>4 pełnowymiarowe świece 180g (ponad 160h palenia)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="size-3.5 text-accent" strokeWidth={2.5} />
                    <span>Darmowa i szybka dostawa (Paczkomat / Kurier)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="size-3.5 text-accent" strokeWidth={2.5} />
                    <span>Oszczędzasz {formatPrice(savings)} kupując w zestawie</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col justify-center rounded-xl bg-surface/60 p-6 sm:p-8 text-center border border-line/60">
                <span className="font-mono text-2xs uppercase tracking-widest text-muted">
                  Cena zestawu
                </span>
                <div className="mt-3 flex items-baseline justify-center gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-light tabular-nums text-fg">
                    {formatPrice(bundlePrice)}
                  </span>
                  <span className="font-mono text-base text-muted line-through">
                    {formatPrice(separatePrice)}
                  </span>
                </div>
                <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-2xs uppercase tracking-caps text-accent">
                  <Truck className="size-3.5" strokeWidth={1.5} />
                  Darmowa dostawa
                </p>

                <Button
                  onClick={handleAddBundle}
                  size="lg"
                  className="mt-6 w-full h-12 text-xs uppercase tracking-wider font-medium"
                >
                  Dodaj zestaw do koszyka
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Krótka, przejrzysta sekcja pytań i odpowiedzi
 */
function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <span className="font-mono text-2xs uppercase tracking-caps text-accent block mb-2">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-fg">
            Najczęstsze pytania
          </h2>
        </div>
        <FaqList />
      </div>
    </section>
  );
}
