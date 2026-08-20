"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations/gsap";
import { createCounterTrigger } from "@/lib/animations/scroll";
import { formatNumber, padStep } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pads to two digits, e.g. `5` -> `05`. */
  pad?: boolean;
  duration?: number;
  className?: string;
}

/** Counts up to `value` once it scrolls into view; shows the final value immediately for reduced motion. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  pad = false,
  duration,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? value : 0
  );

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      createCounterTrigger(
        ref.current,
        value,
        (current) => setDisplay(Math.round(current)),
        { duration }
      );
    },
    { scope: ref, dependencies: [value, duration] }
  );

  const formatted = pad ? padStep(display) : formatNumber(display);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
