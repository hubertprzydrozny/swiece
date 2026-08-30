import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NowMoment } from "@/components/now-moment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cartCount, useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

const LINKS = [
  { to: "/sklep", label: "Sklep", hash: undefined as string | undefined },
  { to: "/jak-to-dziala", label: "Jak to działa", hash: undefined as string | undefined },
  { to: "/", label: "Zapachy", hash: "zapachy" },
  { to: "/", label: "O LOMMA", hash: "o-lomma" },
  { to: "/", label: "FAQ", hash: "faq" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = mounted ? cartCount(items) : 0;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm">
      <div className="border-b border-line/50 px-5 py-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted md:text-2xs">
        <NowMoment />
      </div>

      <div className="border-b border-line/70">
        <nav
          className={cn(
            "mx-auto max-w-7xl px-5 transition-shadow duration-300 md:px-8",
            scrolled && "shadow-[0_10px_30px_rgba(39,38,31,0.04)]",
          )}
        >
          <div className="grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="justify-self-start">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center border border-line bg-transparent text-fg transition-colors hover:border-fg md:hidden"
                aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>

              <Link
                to="/"
                className="hidden font-sans text-lg font-semibold uppercase tracking-[0.3em] text-fg transition-colors hover:text-accent md:inline-flex"
              >
                Lomma
              </Link>
            </div>

            <Link
              to="/"
              className="justify-self-center font-sans text-lg font-semibold uppercase tracking-[0.3em] text-fg md:hidden"
              aria-label="LOMMA — strona główna"
            >
              Lomma
            </Link>

            <div className="hidden justify-self-center md:block">
              <div className="flex items-center gap-8">
                {LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    hash={link.hash}
                    activeProps={{ className: "border-b border-fg pb-1 font-sans text-[11px] uppercase tracking-[0.08em] text-fg" }}
                    className="pb-1 font-sans text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-self-end gap-3 md:gap-5">
              <Button asChild size="sm" className="hidden lg:inline-flex">
                <Link to="/sklep">Odkryj zapachy</Link>
              </Button>
              <button
                type="button"
                className="text-fg transition-colors hover:text-accent"
                onClick={() => setCartOpen(true)}
                aria-label={`Koszyk, ${count} produktów`}
              >
                <span className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.08em]">
                  <ShoppingBag className="size-4" strokeWidth={1.4} />
                  <span className="hidden sm:inline">Koszyk</span>
                  <span className="tabular-nums">{count}</span>
                </span>
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="border-t border-line py-5 md:hidden">
              <div className="flex flex-col">
                {LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    hash={link.hash}
                    className="border-b border-line/60 py-4 font-display text-2xl text-fg last:border-b-0"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-5 w-full">
                  <Link to="/sklep" onClick={() => setMenuOpen(false)}>
                    Odkryj zapachy
                  </Link>
                </Button>
                <button
                  type="button"
                  className="mt-3 inline-flex h-12 w-full items-center justify-center border border-line-strong bg-transparent px-4 font-sans text-sm font-medium text-fg transition-colors hover:border-fg"
                  onClick={() => {
                    setMenuOpen(false);
                    setCartOpen(true);
                  }}
                >
                  Otwórz koszyk · {count}
                </button>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
