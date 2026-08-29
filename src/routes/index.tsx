import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Flame, Scissors, Shield } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { ProductCard } from "@/components/product-card";
import { ScentChapter } from "@/components/scent-chapter";
import { Button } from "@/components/ui/button";
import { PRODUCT_LIST } from "@/lib/products";

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
      <CollectionPreview />
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
    <section className="relative isolate min-h-[78svh] overflow-hidden">
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
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-14">
        <p className="reveal font-mono text-2xs uppercase tracking-caps text-accent">
          Kolekcja 01 — zapisane chwile
        </p>
        <h1 className="reveal reveal-delay-1 mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-display text-fg">
          Nie zatrzymasz chwili.
          <br />
          <span className="italic text-accent">Zachowasz jej zapach.</span>
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-md text-base leading-relaxed text-fg/80">
          Trzy zapachy inspirowane miejscami, godzinami i atmosferą, do których
          chce się wracać.
        </p>
        <p className="reveal reveal-delay-3 mt-4 font-mono text-2xs uppercase tracking-caps text-fg/70">
          180 g · ~40 h palenia · ręcznie zalewane w Polsce
        </p>
        <div className="reveal reveal-delay-4 mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link to="/sklep">Odkryj zapachy</Link>
          </Button>
          <a
            href="#zapachy"
            className="inline-flex h-14 items-center gap-2 font-mono text-2xs uppercase tracking-caps text-fg/80 transition-colors hover:text-fg"
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
    <section className="border-b border-line bg-bg" aria-label="Zapachy LOMMA">
      <div className="mx-auto max-w-6xl px-5 py-5 md:px-8 md:py-6">
        <div className="flex snap-x gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
          {PRODUCT_LIST.map((product) => (
            <Link
              key={product.id}
              to={`/zapach/${product.id}`}
              className="group flex min-w-[78vw] snap-start items-center gap-4 border border-line bg-surface p-3 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:min-w-[330px] md:min-w-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="size-20 shrink-0 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="min-w-0">
                <span className="block font-mono text-2xs uppercase tracking-caps text-accent">
                  {product.location} · {product.time}
                </span>
                <span className="mt-1 block truncate font-display text-xl leading-tight text-fg">
                  {product.name}
                </span>
                <span className="mt-1 block font-mono text-xs text-muted">
                  {product.price} zł <span className="text-accent">→</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MomentLine() {
  return (
    <div
      className="border-y border-line bg-surface"
      aria-label="Trzy elementy kolekcji"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-5 py-5 font-mono text-2xs uppercase tracking-caps text-muted md:gap-10">
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
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
        {items.map((item) => (
          <div key={item.n}>
            <p className="font-mono text-2xs text-accent">{item.n}</p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-display">
              {item.t}
            </h2>
            <p className="mt-2 text-sm text-muted">{item.d}</p>
          </div>
        ))}
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
