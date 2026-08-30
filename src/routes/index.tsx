import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Flame, Scissors, Shield, Sparkles, Check, Truck } from "lucide-react";
import { toast } from "sonner";
import { FaqList } from "@/components/faq-list";
import { ProductCard } from "@/components/product-card";
import { ScentChapter } from "@/components/scent-chapter";
import { ComparisonTable } from "@/components/comparison-table";
import { Button } from "@/components/ui/button";
import { BUNDLE_PRICES, COLLECTION_IDS, PRODUCT_LIST } from "@/lib/products";
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
          "LOMMA — zapachy do domu inspirowane miejscami, godzinami i atmosferą. Odkryj pierwszą kolekcję.",
      },
    ],
  }),
});

function Home() {
  return (
    <>
      <Hero />
      <QuickProducts />
      <MomentLine />
      <QualityStrip />
      <section id="zapachy" className="scroll-mt-28">
        {PRODUCT_LIST.map((product, index) => (
          <ScentChapter
            key={product.id}
            product={product}
            reverse={index % 2 === 1}
          />
        ))}
      </section>
      <BundleOffer />
      <ComparisonTable />
      <Philosophy />
      <Atelier />
      <HowToBurn />
      <GiftBand />
      <FaqSection />
      <Closing />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[78svh] overflow-hidden bg-hero-dark">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-still.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-hero-dark/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-hero-dark/90 via-hero-dark/50 to-hero-dark/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-hero-dark/40 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-14">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.28em] text-paper/80 md:text-2xs">
          Kolekcja 01
        </p>
        <h1 className="reveal reveal-delay-1 mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.9] tracking-display text-paper md:text-7xl">
          Nie zatrzymasz chwili.
          <br />
          <span className="italic text-sage-tint">Zachowasz jej zapach.</span>
        </h1>
        <div className="reveal reveal-delay-2 mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="bg-paper text-hero-dark hover:bg-sage-tint hover:text-hero-dark">
            <Link to="/sklep">Odkryj zapachy</Link>
          </Button>
          <a
            href="#zapachy"
            className="inline-flex h-14 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80 transition-colors hover:text-paper md:text-2xs"
          >
            Zobacz kolekcję
            <ArrowDown className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

function QuickProducts() {
  return (
    <section className="bg-bg py-24 md:py-32" aria-label="Zapachy LOMMA">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-accent mb-4">
              Pierwsza Kolekcja
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-fg font-medium">
              Trzy zapachy.<br />Wybierz swój rytuał.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            180g · ~40h palenia · Wosk sojowy
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCT_LIST.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}


function MomentLine() {
  return (
    <div
      className="border-y border-line bg-surface/50"
      aria-label="Trzy elementy kolekcji"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-5 py-4 font-mono text-2xs uppercase tracking-caps text-muted md:gap-10">
        <span>Miejsce</span>
        <i aria-hidden="true" className="text-accent not-italic">
          ·
        </i>
        <span>Godzina</span>
        <i aria-hidden="true" className="text-accent not-italic">
          ·
        </i>
        <span>Zapach</span>
      </div>
    </div>
  );
}

function QualityStrip() {
  const items = [
    { n: "01", t: "Ręcznie zalewane", d: "W małych partiach w Polsce" },
    { n: "02", t: "Naturalny wosk sojowy", d: "Spokojne, czyste spalanie" },
    { n: "03", t: "Około 40 h palenia", d: "180 g zapachu do domu" },
  ];
  return (
    <section className="border-b border-line py-16 bg-surface/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 md:px-8">
        {items.map((item) => (
          <div key={item.n} className="border-t border-line pt-5">
            <p className="font-mono text-2xs text-accent">{item.n}</p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-display text-fg">
              {item.t}
            </h2>
            <p className="mt-2 text-sm text-muted">{item.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BundleOffer() {
  const addMany = useCartStore((s) => s.addMany);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  const handleAddBundle = () => {
    addMany(COLLECTION_IDS);
    toast("Dodano: Zestaw Odkrywcy", {
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  const bundlePrice = BUNDLE_PRICES.three;
  const separatePrice = BUNDLE_PRICES.one * COLLECTION_IDS.length;
  const savings = separatePrice - bundlePrice;

  return (
    <section className="border-t border-line bg-surface/30 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-caps text-accent">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Bestseller · Zestaw Odkrywcy
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-fg md:text-4xl">
              Kolekcja 01 — pełny zestaw 3 świec
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Odkryj wszystkie trzy historie zapachowe: Poranek w Ogrodzie (07:15), Wieczór w Karkonoszach (19:42) oraz Wieczór nad Bałtykiem (21:05).
            </p>
            <ul className="mt-6 space-y-3 font-mono text-2xs text-fg">
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span>3x świeca sojowa 180g (Poranek, Karkonosze, Bałtyk)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span>Darmowa wysyłka w cenie pakietu</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span>Oszczędzasz {formatPrice(savings)} w porównaniu do osobnego zakupu</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center border-t border-line pt-8 text-center lg:border-l lg:border-t-0 lg:pl-10 lg:text-left">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted">
              Cena zestawu
            </span>
            <div className="mt-3 flex items-baseline justify-center gap-3 lg:justify-start">
              <span className="font-display text-5xl font-medium tabular-nums text-fg">
                {formatPrice(bundlePrice)}
              </span>
              <span className="font-mono text-base text-muted line-through">
                {formatPrice(separatePrice)}
              </span>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-2xs uppercase tracking-caps text-accent lg:justify-start">
              <Truck className="size-4" strokeWidth={1.5} />
              Darmowa dostawa
            </p>

            <Button onClick={handleAddBundle} size="lg" className="mt-6 w-full">
              Dodaj zestaw
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="o-lomma" className="scroll-mt-28 bg-surface">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
        <p className="font-mono text-2xs uppercase tracking-caps text-accent">
          Filozofia LOMMA
        </p>
        <h2 className="mt-4 font-display text-4xl font-medium tracking-display italic">
          Nie chodzi tylko o zapach.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted">
          Zapach jest jednym z najsilniejszych nośników wspomnień. LOMMA
          zapisuje je w miejscach, godzinach i atmosferze.
        </p>
      </div>
    </section>
  );
}

function Atelier() {
  const steps = [
    {
      n: "01",
      t: "Topienie",
      d: "Naturalny wosk sojowy przygotowujemy w odpowiedniej temperaturze.",
    },
    {
      n: "02",
      t: "Kompozycja",
      d: "Zapach dodajemy ręcznie, dbając o jego właściwe proporcje.",
    },
    {
      n: "03",
      t: "Zalewanie",
      d: "Świece zalewamy, studzimy i sprawdzamy przed wysyłką.",
    },
  ];
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden border border-line">
          <img
            src="/images/atelier.jpg"
            alt="Manufaktura LOMMA — ręcznie zalewane świece"
            className="aspect-4/5 w-full object-cover md:aspect-square"
          />
        </div>
        <div>
          <p className="font-mono text-2xs uppercase tracking-caps text-accent">
            Manufaktura LOMMA
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-display">
            Od wosku do słoika, krok po kroku.
          </h2>
          <p className="mt-4 text-muted">
            Każda świeca powstaje ręcznie, w małych partiach.
          </p>
          <div className="mt-10 flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.n} className="border-t border-line pt-5">
                <p className="font-mono text-2xs text-accent">{step.n}</p>
                <h3 className="mt-2 font-display text-2xl">{step.t}</h3>
                <p className="mt-2 text-sm text-muted">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToBurn() {
  const steps = [
    {
      icon: Flame,
      n: "01",
      t: "Pierwsze palenie",
      d: "Pozwól woskowi roztopić się aż do krawędzi, aby uniknąć tunelowania.",
    },
    {
      icon: Scissors,
      n: "02",
      t: "Przycinanie knota",
      d: "Przed kolejnym użyciem przytnij knot do około 5 mm.",
    },
    {
      icon: Shield,
      n: "03",
      t: "Bezpieczeństwo",
      d: "Nie pozostawiaj palącej się świecy bez nadzoru.",
    },
  ];
  return (
    <section className="border-y border-line bg-surface px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-2xs uppercase tracking-caps text-accent">
          Jak palić
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-display">
          Małe rzeczy mają znaczenie.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n}>
              <step.icon className="size-6 text-accent" strokeWidth={1.25} />
              <p className="mt-5 font-mono text-2xs text-accent">{step.n}</p>
              <h3 className="mt-2 font-display text-2xl">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftBand() {
  return (
    <section className="px-5 py-24 text-center md:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-2xs uppercase tracking-caps text-accent">
          Na prezent
        </p>
        <h2 className="mt-4 font-display text-4xl font-medium tracking-display italic">
          Idealna na prezent.
        </h2>
        <p className="mt-4 text-muted">
          Dla kogoś lub dla siebie. Gotowa do wręczenia.
        </p>
        <Button asChild className="mt-8">
          <Link to="/sklep">Odkryj zapachy</Link>
        </Button>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-line px-5 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-2xs uppercase tracking-caps text-accent">
          FAQ
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-display">
          Krótkie odpowiedzi.
        </h2>
        <div className="mt-10">
          <FaqList />
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="border-t border-line bg-surface px-5 py-24 text-center md:px-8">
      <h2 className="font-display text-4xl font-medium tracking-display italic">
        Wybierz chwilę, do której chcesz wrócić.
      </h2>
      <Button asChild className="mt-8">
        <Link to="/sklep">Odkryj zapachy</Link>
      </Button>
    </section>
  );
}
