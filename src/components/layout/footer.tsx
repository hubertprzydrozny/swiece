import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.2fr_2fr] md:px-8">
        <div>
          <p className="font-sans text-xl font-light uppercase tracking-[0.35em] text-fg">
            Lomma
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Home Fragrance · Polska Manufaktura
          </p>
          <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted">
            Świece sojowe tworzone z myślą o uważnych porankach i spokojnych wieczorach.
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
