import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NowMoment } from "@/components/now-moment";
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-line/60 bg-surface/90 backdrop-blur-xs text-center text-muted font-mono text-2xs py-1.5 px-4">
        <NowMoment />
      </div>
      <div className="px-3 pt-2 pb-1 md:px-5">
        <nav
          className={cn(
            "mx-auto max-w-5xl rounded-full border transition-all duration-300 shadow-sm",
            scrolled
              ? "border-line bg-surface/95 backdrop-blur-md shadow-md"
              : "border-line/60 bg-surface/80 backdrop-blur-sm",
          )}
        >
        <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-line md:hidden"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="size-4" strokeWidth={1.5} />
            ) : (
              <Menu className="size-4" strokeWidth={1.5} />
            )}
          </button>

          <Link
            to="/"
            className="font-sans text-lg font-semibold tracking-brand uppercase text-fg px-2"
          >
            Lomma
          </Link>

          <div className="hidden items-center gap-1 md:flex bg-bg/50 p-1 rounded-full border border-line/40">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="font-mono text-2xs uppercase tracking-caps text-muted px-4 py-1.5 rounded-full transition-colors hover:bg-surface hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-full border border-line bg-elevated px-4 font-mono text-2xs uppercase tracking-caps text-fg transition-all hover:bg-accent hover:text-ink hover:border-accent"
            onClick={() => setCartOpen(true)}
            aria-label={`Koszyk, ${count} produktów`}
          >
            <ShoppingBag className="size-3.5" strokeWidth={1.5} />
            <span>Koszyk</span>
            <span className="ml-1 rounded-full bg-accent/20 px-1.5 py-0.5 text-2xs font-bold text-accent group-hover:bg-ink group-hover:text-paper">
              {count}
            </span>
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-line bg-bg px-5 py-6 md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className="flex h-12 items-center font-display text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
      </div>
    </header>
  );
}
