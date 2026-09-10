import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Flame, Scissors, Shield, Sparkles, Check, Truck } from "lucide-react";
import { toast } from "sonner";
import { FaqList } from "@/components/faq-list";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { ScentChapter } from "@/components/scent-chapter";
import { ComparisonTable } from "@/components/comparison-table";
import { Button } from "@/components/ui/button";
import {
  BUNDLE_PRICES,
  COLLECTION_IDS,
  DAY_EVENING_IDS,
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
      <BundleOffer />
      <ComparisonTable />
      <Atelier />
      <HowToBurn />
      <FaqSection />
    </>
  );
}

function Hero() {
  const scentTimes = [...PRODUCT_LIST].sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div className="w-full bg-bg p-2.5 sm:p-4">
      <section className="relative w-full h-[calc(100vh-20px)] sm:h-[calc(100vh-32px)] min-h-[580px] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#161512] text-white flex flex-col justify-between">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-85"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-still.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Top Spacer / Room for Nav */}
        <div className="relative z-10 w-full pt-6 px-6" />

        {/* Centered Hero Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-8 text-center my-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
              Kolekcja I — Polska Manufaktura
            </span>
          </div>

          {/* Headline with Instrument Serif */}
            <h1
              className="mt-6 font-display text-white font-light text-balance leading-[1.05] reveal-on-scroll"
              style={{ fontSize: "clamp(34px, 6.5vw, 68px)", letterSpacing: "-0.02em" }}
            >
              <span className="text-reveal-mask">
                <span className="text-reveal-child">Nie zatrzymasz chwili.</span>
              </span>
              <br />
              <span className="text-reveal-mask">
                <span
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  className="italic font-normal text-white/95 text-reveal-child"
                >
                  Zachowasz jej zapach.
                </span>
              </span>
            </h1>

          <p
            className="mt-5 max-w-xl text-white/80 font-light leading-relaxed px-2"
            style={{ fontSize: "clamp(13px, 2.5vw, 16px)" }}
          >
            Cztery naturalne świece sojowe inspirowane polskimi porami dnia,
            miejscami i atmosferą, do której chce się wracać.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-[#161512] hover:bg-white/90 hover:text-[#161512] border-0 px-8 font-medium text-xs tracking-wider uppercase h-12 sm:h-13"
            >
              <Link to="/sklep">Odkryj zapachy</Link>
            </Button>
            <a
              href="#zapachy"
              className="inline-flex h-12 sm:h-13 items-center gap-2 rounded-full border border-white/25 bg-black/20 backdrop-blur-md px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:border-white hover:bg-black/40 hover:text-white"
            >
              Zobacz kolekcję
              <ArrowDown className="size-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Bottom Scent Times Strip inside Hero frame */}
        <div className="relative z-10 w-full border-t border-white/10 bg-black/25 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 md:flex-nowrap md:justify-between md:px-8 md:text-2xs">
            {scentTimes.map((product) => (
              <a
                key={product.id}
                href="#zapachy"
                className="whitespace-nowrap transition-colors hover:text-white"
              >
                {product.time} {product.location}
              </a>
            ))}
            <span className="hidden whitespace-nowrap text-white md:inline">
              100% Wosk Sojowy · Ręcznie Zalewane
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickProducts() {
  return (
    <section id="zapachy" className="scroll-mt-28 bg-bg py-20 md:py-28" aria-label="Zapachy LOMMA">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-2xs uppercase tracking-caps text-accent mb-3 block">
              Pierwsza Kolekcja
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-fg">
              Cztery zapachy.<br />Wybierz swój rytuał.
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            180g · ~40h palenia · Naturalny wosk sojowy
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PRODUCT_LIST.map((product, index) => (
            <Reveal key={product.id} delay={(index % 4) * 80} className="h-full">
              <ProductCard product={product} />
            </Reveal>
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
    { n: "01", t: "Premium jakość", d: "Wosk sojowy klasy premium" },
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
    toast("Dodano: Kolekcja I — Polska", {
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  const handleAddDayEvening = () => {
    addMany(DAY_EVENING_IDS);
    toast("Dodano: Zestaw Dzień / Wieczór", {
      action: { label: "Koszyk", onClick: () => setCartOpen(true) },
    });
  };

  const bundlePrice = BUNDLE_PRICES.three;
  const separatePrice = BUNDLE_PRICES.one * COLLECTION_IDS.length;
  const savings = separatePrice - bundlePrice;
  const duoPrice = BUNDLE_PRICES.two;
  const duoSeparatePrice = BUNDLE_PRICES.one * DAY_EVENING_IDS.length;

  return (
    <section id="kolekcja" className="scroll-mt-28 border-t border-line bg-surface/40 px-5 py-24 md:py-32 md:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-line bg-elevated p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-caps text-accent mb-3">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Bestseller · Kolekcja I — Polska
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-light leading-tight text-fg">
              Cztery chwile. Cztery miejsca. Jeden rytuał.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Poranek w Ogrodzie (07:18), Popołudnie na Mazurach (15:42), Zachód nad Bałtykiem (20:46) oraz Wieczór w Karkonoszach (21:12) — pełny cykl dnia w jednym luksusowym zestawie.
            </p>
            <ul className="mt-6 space-y-3 font-mono text-2xs text-fg">
              <li className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-fg">
                  <Check className="size-3" strokeWidth={2} />
                </span>
                <span>Komplet 4 świec sojowych 180g w matowym szkle</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-fg">
                  <Check className="size-3" strokeWidth={2} />
                </span>
                <span>Darmowa wysyłka kurierem / paczkomatem</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-fg">
                  <Check className="size-3" strokeWidth={2} />
                </span>
                <span>Oszczędzasz {formatPrice(savings)} w pakiecie</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-xl bg-surface/50 p-6 md:p-8 text-center border border-line/60">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted">
              Cena zestawu
            </span>
            <div className="mt-3 flex items-baseline justify-center gap-3">
              <span className="font-display text-4xl md:text-5xl font-light tabular-nums text-fg">
                {formatPrice(bundlePrice)}
              </span>
              <span className="font-mono text-base text-muted line-through">
                {formatPrice(separatePrice)}
              </span>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-2xs uppercase tracking-caps text-accent">
              <Truck className="size-3.5" strokeWidth={1.5} />
              Darmowa dostawa w cenie
            </p>

            <Button onClick={handleAddBundle} size="lg" className="mt-6 w-full text-xs uppercase tracking-wider">
              Dodaj Kolekcję I do koszyka
            </Button>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-6 border-t border-line pt-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-2xs uppercase tracking-caps text-muted">
              Zestaw 2 · Dzień / Wieczór
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Dla tych, którzy zaczynają od dwóch: jedna świeca na dzień —
              Poranek w Ogrodzie (07:18) — i jedna na wieczór — Wieczór
              w Karkonoszach (21:12).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:justify-end">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-medium tabular-nums text-fg">
                {formatPrice(duoPrice)}
              </span>
              <span className="font-mono text-sm text-muted line-through">
                {formatPrice(duoSeparatePrice)}
              </span>
            </div>
            <Button variant="outline" onClick={handleAddDayEvening}>
              Dodaj zestaw 2
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
          Prezent, który pachnie wspomnieniem.
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
