import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full border border-line bg-surface px-4 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent",
        className,
      )}
      {...props}
    />
  );
}
