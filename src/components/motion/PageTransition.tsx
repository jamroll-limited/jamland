"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";

/** Mounted fresh per route by `app/template.tsx` to give each page a soft settle-in. */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          // A leftover `transform` here (even an identity matrix) would create a
          // new containing block for every `position: fixed` descendant on the
          // page — clear it once the settle-in finishes.
          clearProps: "transform",
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
