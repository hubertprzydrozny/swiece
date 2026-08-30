import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtySelector({
  value,
  onChange,
  min = 1,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex h-14 items-stretch justify-self-start border border-line-strong bg-elevated", className)}>
      <button
        type="button"
        className="flex w-11 shrink-0 touch-manipulation select-none items-center justify-center text-fg transition-colors hover:bg-surface hover:text-accent active:bg-surface"
        aria-label="Zmniejsz liczbę"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="size-3.5" strokeWidth={1.5} />
      </button>
      <span className="flex min-w-10 items-center justify-center border-x border-line font-mono text-sm tabular-nums">
        {value}
      </span>
      <button
        type="button"
        className="flex w-11 shrink-0 touch-manipulation select-none items-center justify-center text-fg transition-colors hover:bg-surface hover:text-accent active:bg-surface"
        aria-label="Zwiększ liczbę"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
