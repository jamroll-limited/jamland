import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

/** A small square icon-only control, e.g. the calculator's +/- steppers. */
export function IconButton({ icon, label, className, ...rest }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-line-strong text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink",
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
