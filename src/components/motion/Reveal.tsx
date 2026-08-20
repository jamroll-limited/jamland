"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}

export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.8,
  start = "top 90%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;

      if (!element || prefersReducedMotion()) return;

      // Set initial state immediately.
      gsap.set(element, {
        y,
        opacity: 0,
        willChange: "transform, opacity",
      });

      const animation = gsap.to(element, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        paused: true,
        onComplete: () => {
          gsap.set(element, {
            clearProps: "willChange",
          });
        },
      });

      ScrollTrigger.create({
        trigger: element,
        start,
        once: true,

        onEnter: () => {
          animation.play();
        },
      });

      return () => {
        animation.kill();
      };
    },
    {
      scope: ref,
    }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}