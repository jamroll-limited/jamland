import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  theme?: "paper" | "ink";
  id?: string;
  as?: ElementType;
}

/** Consistent vertical rhythm + theme (light/dark) wrapper for full-bleed page sections. */
export function Section({
  children,
  className,
  theme = "paper",
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-18 md:py-20 lg:py-24",
        theme === "ink" ? "bg-ink text-paper" : "bg-paper text-ink",
        className
      )}
    >
      {children}
    </Tag>
  );
}
