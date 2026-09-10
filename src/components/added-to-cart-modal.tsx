import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useUiStore } from "@/store/ui";

const AUTO_CLOSE_MS = 4000;

export function AddedToCartModal() {
  const addedProductId = useUiStore((s) => s.addedProductId);
  const setAddedProduct = useUiStore((s) => s.setAddedProduct);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = addedProductId !== null;
  const product = addedProductId ? PRODUCTS[addedProductId] : null;

  // Auto-close after 4s
  useEffect(() => {
    if (!open) return;
    timerRef.current = setTimeout(() => setAddedProduct(null), AUTO_CLOSE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open, addedProductId, setAddedProduct]);

  const handleGoToCart = () => {
    setAddedProduct(null);
    setCartOpen(true);
  };

  const handleClose = () => setAddedProduct(null);

  if (!product) return null;

  // ─── Desktop overlay (bottom-right corner) ───────────────────────────────
  if (isDesktop) {
    return (
      <>
        {/* invisible click-away */}
        {open && (
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
            aria-hidden="true"
          />
        )}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dodano do koszyka"
          className={[
            "fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-[#ffffff] border border-line shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden",
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none",
          ].join(" ")}
        >
          {/* Green success bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f0fdf4] border-b border-[#bbf7d0]">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#22c55e]">
              <Check className="size-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-caps text-[#15803d]">
              Dodano do koszyka
            </span>
          </div>

          {/* Product row */}
          <div className="flex gap-4 p-4">
            <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-surface">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9px] uppercase tracking-caps text-muted">
                {product.location} · {product.time}
              </p>
              <p className="mt-0.5 font-display text-base leading-snug text-fg">
                {product.name}
              </p>
              <p className="mt-1 font-mono text-xs font-medium text-fg">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 px-4 pb-4">
            <Button className="w-full text-xs h-9" onClick={handleGoToCart}>
              <ShoppingBag className="size-3.5 mr-1.5" strokeWidth={1.5} />
              Przejdź do koszyka
            </Button>
            <button
              type="button"
              onClick={handleClose}
              className="text-center font-mono text-[10px] uppercase tracking-caps text-muted hover:text-fg transition-colors py-1"
            >
              Kontynuuj zakupy
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2.5 right-3 flex size-7 items-center justify-center text-muted hover:text-fg transition-colors"
            aria-label="Zamknij"
          >
            <X className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </>
    );
  }

  // ─── Mobile bottom sheet ──────────────────────────────────────────────────
  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]",
          "transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dodano do koszyka"
        className={[
          "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#ffffff] overflow-hidden",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {/* Drag handle */}
        <div className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-line" />

        {/* Green success bar */}
        <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-line">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#22c55e]">
            <Check className="size-3 text-white" strokeWidth={3} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-caps text-fg">
            Dodano do koszyka
          </span>
        </div>

        {/* Product */}
        <div className="flex gap-5 px-6 py-6">
          <div className="w-20 shrink-0 overflow-hidden rounded-xl bg-surface aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <p className="font-mono text-[9px] uppercase tracking-caps text-muted">
              {product.location} · {product.time}
            </p>
            <p className="mt-1 font-display text-xl leading-snug text-fg">
              {product.name}
            </p>
            <p className="mt-1 font-mono text-sm font-medium text-fg">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 px-6 pb-8">
          <Button className="w-full h-12 text-sm" onClick={handleGoToCart}>
            <ShoppingBag className="size-4 mr-2" strokeWidth={1.5} />
            Przejdź do koszyka
          </Button>
          <Link
            to="/sklep"
            onClick={handleClose}
            className="text-center font-mono text-[10px] uppercase tracking-caps text-muted hover:text-fg transition-colors py-2"
          >
            Kontynuuj zakupy
          </Link>
        </div>
      </div>
    </>
  );
}
