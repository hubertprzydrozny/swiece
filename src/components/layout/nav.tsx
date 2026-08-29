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
      <div className="border-b border-line/60 bg-surface/90 px-4 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:text-2xs">
        <NowMoment />
      </div>

      <div className="px-3 pb-2 pt-2 md:px-5">
        <nav
          className={cn(
            "mx-auto max-w-6xl overflow-hidden rounded-full border transition-all duration-300",
            scrolled
              ? "border-line bg-elevated/95 shadow-md backdrop-blur-md"
              : "border-line/70 bg-elevated/90 shadow-sm backdrop-blur-sm",
          )}
        >
          <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 sm:px-4 md:px-5">
            <div className="flex min-w-0 items-center justify-self-start gap-2">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-line bg-bg/50 transition-colors hover:border-accent hover:text-accent md:hidden"
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
                className="font-sans text-lg font-semibold uppercase tracking-brand text-fg transition-colors hover:text-accent"
              >
                Lomma
              </Link>
            </div>

            <div className="hidden justify-self-center md:flex">
              <div className="flex items-center gap-0.5 rounded-full border border-line/50 bg-bg/40 p-1">
                {LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    hash={link.hash}
                    activeProps={{ className: "rounded-full bg-surface px-3.5 py-2 font-mono text-2xs uppercase tracking-caps text-fg shadow-sm" }}
                    className="rounded-full px-3.5 py-2 font-mono text-2xs uppercase tracking-caps text-muted transition-colors hover:bg-surface/80 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="group flex h-10 items-center justify-self-end rounded-full border border-line bg-bg/50 px-2.5 text-fg transition-all hover:border-accent hover:bg-accent hover:text-ink"
              onClick={() => setCartOpen(true)}
              aria-label={`Koszyk, ${count} produktów`}
            >
              <ShoppingBag className="size-3.5" strokeWidth={1.6} />
              <span
                className={cn(
                  "ml-1.5 min-w-5 rounded-full px-1.5 py-1 text-center text-[10px] font-bold leading-none transition-colors",
                  count > 0
                    ? "bg-accent text-ink group-hover:bg-ink group-hover:text-paper"
                    : "bg-line text-muted group-hover:bg-ink/10 group-hover:text-ink",
                )}
              >
                {count}
              </span>
              <span className="ml-2 hidden font-mono text-2xs uppercase tracking-caps sm:inline">
                Koszyk
              </span>
            </button>
          </div>

          {menuOpen ? (
            <div className="border-t border-line bg-bg px-4 py-4 md:hidden">
              <div className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    hash={link.hash}
                    className="flex min-h-12 items-center rounded-xl px-3 font-display text-2xl transition-colors hover:bg-surface hover:text-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-fg px-4 font-mono text-2xs uppercase tracking-caps text-ink"
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
