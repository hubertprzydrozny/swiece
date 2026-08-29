import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_2fr] md:px-8">
        <div>
          <p className="font-sans text-lg font-medium tracking-brand uppercase">
            Lomma
          </p>
          <p className="mt-3 font-mono text-2xs uppercase tracking-caps text-muted">
            Home Fragrance
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Zapachy do domu inspirowane miejscami, godzinami i atmosferą, do
            których chce się wracać.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Link
              to="/sklep"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Sklep
            </Link>
            <Link
              to="/"
              hash="zapachy"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Zapachy
            </Link>
            <Link
              to="/"
              hash="faq"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/dostawa"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Dostawa i zwroty
            </Link>
            <Link
              to="/regulamin"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Regulamin
            </Link>
            <Link
              to="/prywatnosc"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Polityka prywatności
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted">Instagram — wkrótce</span>
            <a
              href="mailto:kontakt@lomma.pl"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              kontakt@lomma.pl
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted md:flex-row md:justify-between md:px-8">
          <span>© 2026 LOMMA. Wszystkie prawa zastrzeżone.</span>
          <span>Stworzone z myślą o spokojniejszych wieczorach.</span>
        </div>
      </div>
    </footer>
  );
}
