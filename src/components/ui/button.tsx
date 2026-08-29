import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-xs font-medium uppercase tracking-caps transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "border border-fg bg-fg text-ink hover:bg-transparent hover:text-fg",
        inverse:
          "border border-ink bg-ink text-paper hover:bg-transparent hover:text-ink",
        outline:
          "border border-line-strong bg-transparent text-fg hover:border-fg hover:bg-fg hover:text-ink",
        ghost: "border border-transparent text-fg hover:text-accent",
        accent:
          "border border-accent bg-accent text-ink hover:bg-transparent hover:text-accent",
      },
      size: {
        md: "h-12 px-7",
        lg: "h-14 px-8",
        sm: "h-10 px-4",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
