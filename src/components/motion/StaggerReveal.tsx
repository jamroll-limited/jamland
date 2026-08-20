"use client";

import {
  Children,
  isValidElement,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useGSAP } from "@gsap/react";

import {
  gsap,
  ScrollTrigger,
  EASE,
  prefersReducedMotion,
} from "@/lib/animations/gsap";

import { cn } from "@/lib/utils";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  y?: number;
  stagger?: number;
  start?: string;
}

/**
 * Smooth staggered scroll reveal.
 *
 * Animation:
 *
 * opacity: 0 → 1
 * y:      24px → 0
 * blur:   8px → 0
 *
 * Each item follows the previous item with a subtle delay.
 */
export function StaggerReveal({
  children,
  className,
  itemClassName,
  y = 32,
  stagger = 0.1,
  start = "top 85%",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;

      if (!root) return;

      const items =
        root.querySelectorAll<HTMLElement>(
          "[data-reveal]"
        );

      if (!items.length) return;

      /**
       * Reduced motion
       */
      if (prefersReducedMotion()) {
        gsap.set(items, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        return;
      }

      /**
       * Initial state.
       */
      gsap.set(items, {
        opacity: 0,
        y,
        filter: "blur(8px)",
        willChange: "transform, opacity, filter",
      });

      /**
       * Scroll-triggered animation.
       */
      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",

        duration: 0.9,

        stagger: {
          each: stagger,
          from: "start",
        },

        ease: EASE.outExpo,

        scrollTrigger: {
          trigger: root,
          start,
          once: true,

          toggleActions:
            "play none none none",
        },

        onComplete: () => {
          /**
           * Remove will-change after animation.
           */
          gsap.set(items, {
            clearProps: "willChange",
          });
        },
      });
    },
    {
      scope: ref,
    }
  );

  return (
    <div
      ref={ref}
      className={cn(className)}
    >
      {Children.map(children, (child, index) =>
        isValidElement(child) ? (
          <div
            key={index}
            data-reveal
            style={
              {
                "--reveal-y": `${y}px`,
              } as CSSProperties
            }
            className={cn(itemClassName)}
          >
            {child}
          </div>
        ) : (
          child
        )
      )}
    </div>
  );
}