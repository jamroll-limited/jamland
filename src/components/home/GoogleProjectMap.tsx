"use client";

import Link from "next/link";
import Image from "next/image";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  RenderingType,
} from "@vis.gl/react-google-maps";
import { MapPin, Ruler, Coins, Users, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

const BANGLADESH_CENTER = { lat: 23.685, lng: 90.3563 };

interface GoogleProjectMapProps {
  projects: Project[];
  active: Project | undefined;
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  className?: string;
}

/** A real Google Maps terrain view plotting project pins — used in place of the abstract `ProjectMap` once an API key is configured. */
export function GoogleProjectMap({
  projects,
  active,
  activeSlug,
  onSelect,
  className,
}: GoogleProjectMapProps) {
  if (!GOOGLE_MAPS_API_KEY) return null;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-sm border border-line",
        className,
      )}
    >
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          mapId={GOOGLE_MAPS_MAP_ID}
          mapTypeId="terrain"
          renderingType={RenderingType.RASTER}
          center={active?.coordinates ?? BANGLADESH_CENTER}
          defaultZoom={16}
          gestureHandling="greedy"
          scrollwheel={false}
          disableDefaultUI
          zoomControl
          className="h-full w-full"
        >
          {projects.map((project) => {
            const isActive = project.slug === activeSlug;
            return (
              <AdvancedMarker
                key={project.slug}
                position={project.coordinates}
                zIndex={isActive ? 10 : 1}
                onClick={() => onSelect(project.slug)}
              >
                <button
                  type="button"
                  className="flex -translate-y-1/2 flex-col items-center focus-visible:outline-none"
                  aria-pressed={isActive}
                  aria-label={`Show ${project.name} on the map`}
                >
                  <span
                    className={cn(
                      "block whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium shadow-sm transition-colors duration-200",
                      isActive
                        ? "bg-moss text-paper"
                        : "bg-ink text-paper hover:bg-ink-soft",
                    )}
                  >
                    {project.name}
                  </span>
                  <span className="relative mt-1.5 flex h-3 w-3 items-center justify-center">
                    {isActive && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-50" />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-paper",
                        isActive ? "bg-moss" : "bg-ink",
                      )}
                    />
                  </span>
                </button>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>

      {active && (
        <div className="absolute bottom-4 left-4 right-4 z-10 max-w-xs rounded-sm border border-line bg-paper-raised p-4 shadow-lg sm:right-auto">
          {active.gallery.length > 0 && (
            <div className="flex gap-1.5">
              {active.gallery.slice(0, 4).map((image) => (
                <div
                  key={image.id}
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xs"
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <Link href={`/projects/${active.slug}`} className="group mt-3 block">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-base font-medium leading-tight">
                {active.name}
              </h4>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-ink/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/50">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              {active.location}
            </p>
          </Link>

          <div className="mt-3 flex items-center gap-3 border-t border-line pt-3 text-xs text-ink/60">
            <span className="flex items-center gap-1.5">
              <Ruler aria-hidden="true" className="size-3.5 text-ink/35" />
              {active.landAreaTotal}
            </span>
            <span className="flex items-center gap-1.5">
              <Coins aria-hidden="true" className="size-3.5 text-ink/35" />
              {formatCurrency(active.pricePerShare)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users aria-hidden="true" className="size-3.5 text-ink/35" />
              {formatNumber(getRemainingShares(active))} left
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
