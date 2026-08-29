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
      <div className="bg-ink text-center text-paper">
        <div className="px-4 py-2">
          <NowMoment />
        </div>
      </div>
      <nav
        className={cn(
          "border-b transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-line bg-bg/92 backdrop-blur-md"
            : "border-transparent bg-bg/40 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
          <button
            type="button"
            className="flex size-11 items-center justify-center md:hidden"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} />
            )}
          </button>

          <Link
            to="/"
            className="font-sans text-lg font-medium tracking-brand uppercase"
          >
            Lomma
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className="font-mono text-2xs uppercase tracking-caps text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="flex h-11 items-center gap-2 border border-line-strong px-3 font-mono text-2xs uppercase tracking-caps transition-colors hover:border-fg hover:bg-fg hover:text-ink"
            onClick={() => setCartOpen(true)}
            aria-label={`Koszyk, ${count} produktów`}
          >
            <ShoppingBag className="size-4" strokeWidth={1.5} />
            <span className="tabular-nums">{count}</span>
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
    </header>
  );
}
