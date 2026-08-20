"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
} from "@/lib/animations/gsap";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  imageClassName?: string;

  /**
   * Kept for API compatibility.
   * Parallax is intentionally disabled.
   */
  parallax?: boolean;

  /**
   * Kept for API compatibility.
   */
  parallaxStrength?: number;
}

export function ParallaxImage({
  containerClassName,
  imageClassName,
  alt,
  ...imageProps
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const image = imageRef.current;

      if (!wrapper || !image) return;

      /*
       * Reduced motion:
       * Immediately show the final state.
       */
      if (prefersReducedMotion()) {
        gsap.set(image, {
          scale: 1,
        });

        return;
      }

      /*
       * Initial reveal state.
       *
       * Only scale changes.
       * No Y movement.
       * No height change.
       */
      gsap.set(image, {
        scale: 1.06,
        transformOrigin: "center center",
        force3D: true,
      });

      /*
       * Smooth scale reveal.
       */
      gsap.to(image, {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: wrapper,
          start: "top 88%",
          once: true,
        },
      });
    },
    {
      scope: wrapperRef,
    }
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative overflow-hidden",
        containerClassName
      )}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          {...imageProps}
          alt={alt}
          className={cn(
            "h-full w-full object-cover",
            imageClassName
          )}
        />
      </div>
    </div>
  );
}