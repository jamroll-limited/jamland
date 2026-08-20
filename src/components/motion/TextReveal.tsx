"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/animations/gsap";
import { lineUpIn } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** Each entry renders as its own masked line — split copy at the word boundaries you want to control. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  /** Runs the reveal immediately instead of waiting for scroll (hero headlines). */
  immediate?: boolean;
}

/**
 * Reveals headline copy one line at a time via a masked slide-up. Operates on
 * whole lines rather than characters, so it never touches glyph shaping and
 * is safe for Bangla or any other multilingual text.
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      const targets = ref.current.querySelectorAll("[data-line-reveal]");

      if (immediate) {
        lineUpIn(targets, { delay, stagger });
        return;
      }

      ScrollTrigger.create({
        trigger: ref.current,
        start,
        once: true,
        onEnter: () => lineUpIn(targets, { delay, stagger }),
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="contents">
      <Tag className={cn(className)}>
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden">
            <span data-line-reveal className={cn("block", lineClassName)}>
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
