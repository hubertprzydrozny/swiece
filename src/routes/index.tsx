import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Flame, Scissors, Shield, Sparkles, Check, Truck } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { ProductCard } from "@/components/product-card";
import { ScentChapter } from "@/components/scent-chapter";
import { ComparisonTable } from "@/components/comparison-table";
import { Button } from "@/components/ui/button";
import { PRODUCT_LIST } from "@/lib/products";
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
      <TimeInterlude />
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
      <CollectionPreview />
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
    <section className="relative isolate min-h-[78svh] overflow-hidden bg-[#100e0c] text-[#f4efe6]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-still.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#100e0c]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c] via-[#100e0c]/30 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-14">
        <p className="reveal font-mono text-2xs uppercase tracking-caps text-[#8b9278]">
          Kolekcja 01 — zapisane chwile
        </p>
        <h1 className="reveal reveal-delay-1 mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-display text-[#f4efe6]">
          Nie zatrzymasz chwili.
          <br />
          <span className="italic text-[#8b9278]">Zachowasz jej zapach.</span>
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-md text-base leading-relaxed text-[#f4efe6]/80">
          Trzy zapachy inspirowane miejscami, godzinami i atmosferą, do których
          chce się wracać.
        </p>
        <p className="reveal reveal-delay-3 mt-4 font-mono text-2xs uppercase tracking-caps text-[#f4efe6]/70">
          180 g · ~40 h palenia · ręcznie zalewane w Polsce
        </p>
        <div className="reveal reveal-delay-4 mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="bg-[#f4efe6] text-[#141210] hover:bg-[#8b9278] hover:text-[#141210]">
            <Link to="/sklep">Odkryj zapachy</Link>
          </Button>
          <a
            href="#zapachy"
            className="inline-flex h-14 items-center gap-2 font-mono text-2xs uppercase tracking-caps text-[#f4efe6]/80 transition-colors hover:text-[#f4efe6]"
          >
            Zobacz kolekcję
            <ArrowDown className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Apple #1: Giant typographic interlude ─────────────────────────────────
function TimeInterlude() {
  return (
    <div className="overflow-hidden bg-bg border-b border-line/40 py-20 md:py-32 px-5 text-center">
      <p className="font-mono text-2xs uppercase tracking-caps text-accent mb-6">
        Kolekcja 01 · Trzy chwile
      </p>
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-center md:gap-10">
        {[
          { time: "07:15", label: "Poranek w Ogrodzie" },
          { time: "19:42", label: "Wieczór w Karkonoszach" },
          { time: "21:05", label: "Wieczór nad Bałtykiem" },
        ].map(({ time, label }) => (
          <div key={time} className="group flex flex-col items-center">
            <span
              className="font-mono font-bold leading-none text-fg/10 group-hover:text-fg transition-colors duration-700"
              style={{ fontSize: "clamp(3.5rem, 14vw, 9rem)", letterSpacing: "-0.03em" }}
            >
              {time}
            </span>
            <span className="mt-2 font-mono text-2xs uppercase tracking-caps text-muted group-hover:text-accent transition-colors duration-500">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-10 font-mono text-2xs uppercase tracking-caps text-muted/60 max-w-xs mx-auto">
        Najedź na godzinę, żeby ją odkryć
      </p>
    </div>
  );
}

function QuickProducts() {
  const add = useCartStore((s) => s.add);
  const { setCartOpen, setLastAdded } = useUiStore();

  const handleAddToCart = (product: typeof PRODUCT_LIST[number], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, 1);
    setLastAdded(product.name);
    setCartOpen(true);
  };

  return (
    <section className="bg-bg py-24 md:py-32" aria-label="Zapachy LOMMA">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-2xs uppercase tracking-brand text-accent font-medium mb-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCT_LIST.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between"
            >
              <Link to={`/zapach/${product.id}`} className="block">
                {/* Apple: czyste zdjęcie bez ramek na kremowym tle */}
                <div className="aspect-4/5 rounded-3xl overflow-hidden bg-elevated mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="image-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-2xs uppercase tracking-caps text-accent font-medium">
                    {product.location} · {product.time}
                  </span>
                  <span className="font-mono text-xs font-semibold text-fg">
                    {product.price} zł
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-fg group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </Link>

              <div className="mt-6 flex items-center justify-between gap-3">
                <Link
                  to={`/zapach/${product.id}`}
                  className="font-mono text-2xs uppercase tracking-caps text-muted hover:text-fg transition-colors"
                >
                  Poznaj zapach →
                </Link>
                <Button
                  size="sm"
                  onClick={(e) => handleAddToCart(product, e)}
                  className="rounded-full px-5 py-2 text-xs font-medium"
                >
                  Dodaj
                </Button>
              </div>
            </div>
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
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3 md:px-8">
        {items.map((item) => (
          <div
            key={item.n}
            className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:border-accent/40 hover:-translate-y-1"
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-2xs text-accent font-semibold mb-3">
              {item.n}
            </span>
            <h2 className="font-display text-2xl font-medium tracking-display text-fg">
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
  const { setCartOpen, setLastAdded } = useUiStore();

  const handleAddBundle = () => {
    addMany(["ogrod", "karkonosze", "baltyk"]);
    setLastAdded("Zestaw Odkrywcy (3 świece)");
    setCartOpen(true);
  };

  return (
    <section className="border-t border-line bg-surface/30 py-16 md:py-24 px-5 md:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-line bg-surface p-8 md:p-12 shadow-xl hover:border-accent/40 transition-all duration-300">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-2xs uppercase tracking-brand font-medium mb-4">
              <Sparkles className="size-3.5" />
              <span>Bestseller · Zestaw Odkrywcy</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-fg font-medium leading-tight">
              Kolekcja 01 — Pełen Zestaw 3 Świec
            </h2>
            <p className="mt-3 text-muted text-sm leading-relaxed">
              Odkryj wszystkie trzy historie zapachowe: Poranek w Ogrodzie (07:15), Wieczór w Karkonoszach (19:42) oraz Wieczór nad Bałtykiem (21:05).
            </p>
            <ul className="mt-6 space-y-3 font-mono text-2xs text-fg">
              <li className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-accent/20 text-accent">
                  <Check className="size-3.5" />
                </span>
                <span>3x Świeca Sojowa 180g (Poranek, Karkonosze, Bałtyk)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-accent/20 text-accent">
                  <Check className="size-3.5" />
                </span>
                <span>Darmowa Wysyłka w cenie pakietu</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-accent/20 text-accent">
                  <Check className="size-3.5" />
                </span>
                <span>Oszczędzasz 28 zł w porównaniu do osobnego zakupu</span>
              </li>
            </ul>
          </div>

          <div className="bg-elevated border border-line p-8 rounded-xl text-center flex flex-col justify-center">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted">
              Promocyjna cena zestawu
            </span>
            <div className="mt-3 flex items-baseline justify-center gap-3">
              <span className="font-display text-5xl text-fg font-semibold">239 zł</span>
              <span className="font-mono text-base text-muted line-through">267 zł</span>
            </div>
            <div className="mt-2 inline-flex items-center justify-center gap-1.5 text-accent font-mono text-2xs uppercase tracking-caps font-medium">
              <Truck className="size-4" />
              <span>Darmowa Dostawa</span>
            </div>

            <Button onClick={handleAddBundle} size="lg" className="mt-6 w-full rounded-full py-4 text-sm font-semibold">
              Dodaj Zestaw do Koszyka
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionPreview() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-2xs uppercase tracking-caps text-accent">
          Kolekcja zapachów
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-medium tracking-display">
          Trzy miejsca. Trzy chwile.
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Pierwsza kolekcja LOMMA — trzy różne sposoby, żeby wrócić do chwili.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRODUCT_LIST.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
          <Link to="/sklep">Wybierz prezent</Link>
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
