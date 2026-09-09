import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cartCount, useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

const LINKS = [
  { to: "/sklep", label: "Sklep", hash: undefined as string | undefined },
  { to: "/jak-to-dziala", label: "Jak używać świec", hash: undefined as string | undefined },
  { to: "/", label: "Zapachy", hash: "zapachy" },
  { to: "/", label: "O LOMMA", hash: "o-lomma" },
  { to: "/", label: "FAQ", hash: "faq" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });
  const count = mounted ? cartCount(items) : 0;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let suppressUntil = 0;
    const THRESHOLD = 12;
    const onScroll = () => {
      const st = window.scrollY;
      const now = performance.now();
      if (now < suppressUntil) {
        // w trakcie animacji wysokości headera scroll-anchoring generuje
        // fałszywe eventy — śledzimy pozycję, ale nie przełączamy paska
        lastY = st;
        return;
      }
      if (st <= 0) {
        setBannerVisible(true);
        lastY = st;
      } else if (st > lastY + THRESHOLD) {
        setBannerVisible(false);
        lastY = st;
        suppressUntil = now + 350;
      } else if (st < lastY - THRESHOLD) {
        setBannerVisible(true);
        lastY = st;
        suppressUntil = now + 350;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setBannerVisible(true);
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-4 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto mx-auto max-w-[820px] rounded-full border border-neutral-200/80 bg-white/90 px-4 sm:px-6 py-2 shadow-sm backdrop-blur-md transition-all duration-300",
          scrolled && "shadow-md bg-white/95 border-neutral-300/80",
        )}
      >
        <div className="flex h-11 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full bg-neutral-100 text-fg transition-colors hover:bg-neutral-200 md:hidden"
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>

            <Link
              to="/"
              className="font-sans text-base font-semibold tracking-[0.25em] uppercase text-fg transition-colors hover:opacity-80"
              aria-label="LOMMA — strona główna"
            >
              LOMMA
            </Link>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className={cn(
                  "font-sans text-xs tracking-wider uppercase transition-colors",
                  (link.hash ? link.hash === hash : pathname === link.to)
                    ? "text-fg font-medium"
                    : "text-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full px-4 h-8 text-[11px] font-medium tracking-wider uppercase bg-fg text-ink hover:opacity-90">
              <Link to="/sklep">Sklep</Link>
            </Button>
            <button
              type="button"
              className="flex h-8 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 text-fg transition-colors hover:bg-neutral-100"
              onClick={() => setCartOpen(true)}
              aria-label={`Koszyk, ${count} produktów`}
            >
              <ShoppingBag className="size-3.5" strokeWidth={1.5} />
              <span className="font-mono text-xs font-semibold tabular-nums">{count}</span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mt-3 border-t border-neutral-200/80 pt-3 pb-2 md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className="rounded-xl px-3 py-2.5 font-sans text-sm tracking-wide text-fg hover:bg-neutral-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full rounded-full text-xs uppercase tracking-wider">
                <Link to="/sklep" onClick={() => setMenuOpen(false)}>
                  Odkryj zapachy
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
