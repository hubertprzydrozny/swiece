import { useState, useEffect } from "react";
import { type Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { ShoppingBag, ArrowRight } from "lucide-react";

type StickyBuyBarProps = {
  product: Product;
};

export function StickyBuyBar({ product }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);
  const add = useCartStore((s) => s.add);
  const { setCartOpen, setLastAdded } = useUiStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 400px
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const handleAddToCart = () => {
    add(product.id, 1);
    setLastAdded(product.name);
    setCartOpen(true);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line px-4 py-3 shadow-lg transition-transform duration-300 transform translate-y-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={product.image}
            alt={product.name}
            className="size-10 rounded object-cover border border-line shrink-0"
          />
          <div className="min-w-0">
            <span className="font-mono text-2xs uppercase tracking-caps text-muted block truncate">
              Świeca Sojowa {product.location}
            </span>
            <span className="font-display text-base text-fg font-medium truncate block">
              {product.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-base text-fg font-medium hidden sm:inline">
            {product.price} zł
          </span>
          <button
            onClick={handleAddToCart}
            className="px-5 py-2.5 bg-fg text-ink font-medium text-sm rounded hover:bg-accent transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Dodaj do koszyka</span>
            <span className="sm:hidden">{product.price} zł · Dodaj</span>
            <ArrowRight className="size-4 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
