"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How far the element travels relative to pointer distance from center. */
  strength?: number;
}

/** Wraps interactive content with a subtle pointer-follow pull. No-ops for touch and reduced motion. */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || matchMedia("(pointer: coarse)").matches) {
        return;
      }

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      function handlePointerMove(event: PointerEvent) {
        const rect = el!.getBoundingClientRect();
        xTo((event.clientX - rect.left - rect.width / 2) * strength);
        yTo((event.clientY - rect.top - rect.height / 2) * strength);
      }

      function handlePointerLeave() {
        xTo(0);
        yTo(0);
      }

      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        el.removeEventListener("pointermove", handlePointerMove);
        el.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    { scope: ref, dependencies: [strength] }
  );

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
