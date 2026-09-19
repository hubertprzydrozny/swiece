import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderProps {
  children: ReactNode[];
  itemCount: number;
}

export function ProductSlider({ children, itemCount }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active index
    const child = el.firstElementChild as HTMLElement | null;
    if (child) {
      const itemWidth = child.offsetWidth + 24; // width + gap
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(Math.min(newIndex, itemCount - 1));
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [itemCount]);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const child = el.firstElementChild as HTMLElement | null;
    const itemWidth = child ? child.offsetWidth + 24 : el.clientWidth * 0.75;
    const offset = direction === "left" ? -itemWidth : itemWidth;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const child = el.firstElementChild as HTMLElement | null;
    if (child) {
      const itemWidth = child.offsetWidth + 24;
      el.scrollTo({ left: index * itemWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Controls Bar / Status */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 font-mono text-2xs uppercase tracking-widest text-muted">
          <span>0{currentIndex + 1}</span>
          <span className="w-8 h-px bg-line" />
          <span>0{itemCount}</span>
        </div>

        {/* Prev / Next navigation buttons (style like GTA VI Album slider controls) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByDirection("left")}
            disabled={!canScrollPrev}
            aria-label="Poprzedni produkt"
            className="flex size-10 items-center justify-center rounded-full border border-line bg-surface/50 text-fg transition-all hover:bg-fg hover:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection("right")}
            disabled={!canScrollNext}
            aria-label="Następny produkt"
            className="flex size-10 items-center justify-center rounded-full border border-line bg-surface/50 text-fg transition-all hover:bg-fg hover:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Snap Scroll Container */}
      <div
        ref={sliderRef}
        className="scroll-snap-x -mx-5 px-5 sm:-mx-8 sm:px-8 flex gap-6 pb-6 pt-1"
        style={{ scrollPaddingLeft: "20px" }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="snap-item w-[82vw] sm:w-[340px] md:w-[380px] lg:w-[420px]"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Pagination indicators for mobile */}
      <div className="flex items-center justify-center gap-1.5 mt-4 sm:hidden">
        {Array.from({ length: itemCount }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Przejdź do slajdu ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-6 bg-fg" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
