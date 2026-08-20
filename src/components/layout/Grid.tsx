import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  className?: string;
}

/** The 4/8/12-column editorial grid: 4 columns on mobile, 8 on tablet, 12 on desktop. */
export function Grid({ children, className }: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-5 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:gap-x-6",
        className
      )}
    >
      {children}
    </div>
  );
}
