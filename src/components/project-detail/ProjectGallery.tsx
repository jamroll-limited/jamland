"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: GalleryImage[];
}

const sizeSpan: Record<NonNullable<GalleryImage["size"]>, string> = {
  sm: "sm:col-span-2 sm:row-span-1",
  md: "sm:col-span-3 sm:row-span-2",
  lg: "sm:col-span-6 sm:row-span-2",
};

/** An asymmetric hover grid with a minimal built-in lightbox — no external lightbox library needed. */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:auto-rows-36">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image: ${image.alt}`}
            className={cn(
              "group relative col-span-1 row-span-1 aspect-4/3 overflow-hidden rounded-xs sm:aspect-auto",
              sizeSpan[image.size ?? "sm"]
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery"
          className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95 p-6"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery"
            className="absolute right-6 top-6 text-paper hover:opacity-70"
          >
            <X className="size-7" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null ? current : (current - 1 + images.length) % images.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-paper hover:opacity-70 md:left-8"
              >
                <ChevronLeft className="size-8" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) => (current === null ? current : (current + 1) % images.length))
                }
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-paper hover:opacity-70 md:right-8"
              >
                <ChevronRight className="size-8" />
              </button>
            </>
          )}

          <div className="relative aspect-4/3 w-full max-w-4xl">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {activeImage.caption && (
            <p className="absolute inset-x-0 bottom-8 text-center text-sm text-paper/70">
              {activeImage.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
