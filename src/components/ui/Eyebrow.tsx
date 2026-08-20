import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase kicker label used above section headlines. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] md:text-sm",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      {children}
    </span>
  );
}
