import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const EASE = {
  out: "power3.out",
  outExpo: "expo.out",
  inOutQuart: "power4.inOut",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.9,
  slow: 1.3,
} as const;

/** Reads the live value of `prefers-reduced-motion`. Client-only. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
