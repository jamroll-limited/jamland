import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Wider mobile gutter for full-bleed hero/banner sections — leaves their spacing untouched. */
  wide?: boolean;
}

/** The shared max-width + responsive gutter wrapper every section is built on. */
export function Container({ children, className, as: Tag = "div", wide = false }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1600px]",
        wide ? "px-6 md:px-10 lg:px-16" : "px-4 md:px-10 lg:px-16",
        className
      )}
    >
      {children}
    </Tag>
  );
}
