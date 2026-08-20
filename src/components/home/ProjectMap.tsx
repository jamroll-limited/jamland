import Link from "next/link";
import Image from "next/image";
import { MapPin, Ruler, Coins, Users, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

interface ProjectMapProps {
  projects: Project[];
  active: Project | undefined;
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  className?: string;
}

/** A stylized, non-cartographic map surface for plotting project pins — pairs with the abstract facility `LocationMap`. */
export function ProjectMap({ projects, active, activeSlug, onSelect, className }: ProjectMapProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-sm border border-line bg-paper-dim",
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="jamland-project-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgb(14 15 12 / 10%)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="url(#jamland-project-grid)" />
        <path d="M -5 20 Q 30 10 55 28 T 105 22" fill="none" stroke="rgb(14 15 12 / 18%)" strokeWidth="1.1" />
        <path d="M 15 -5 Q 35 35 25 80" fill="none" stroke="rgb(14 15 12 / 18%)" strokeWidth="0.9" />
        <path d="M 78 -5 Q 65 40 90 80" fill="none" stroke="rgb(14 15 12 / 18%)" strokeWidth="0.9" />
      </svg>

      {projects.map((project) => {
        const isActive = project.slug === activeSlug;
        return (
          <button
            key={project.slug}
            type="button"
            onClick={() => onSelect(project.slug)}
            style={{ left: `${project.mapPosition.x}%`, top: `${project.mapPosition.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:z-20"
            aria-pressed={isActive}
            aria-label={`Show ${project.name} on the map`}
          >
            <span
              className={cn(
                "block whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium shadow-sm transition-colors duration-200",
                isActive ? "bg-moss text-paper" : "bg-ink text-paper hover:bg-ink-soft"
              )}
            >
              {project.name}
            </span>
            <span className="relative mx-auto mt-1.5 flex h-3 w-3 items-center justify-center">
              {isActive && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-50" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-paper",
                  isActive ? "bg-moss" : "bg-ink"
                )}
              />
            </span>
          </button>
        );
      })}

      {active && (
        <div className="absolute bottom-4 left-4 right-4 z-10 max-w-xs rounded-sm border border-line bg-paper-raised p-4 shadow-lg sm:right-auto">
          {active.gallery.length > 0 && (
            <div className="flex gap-1.5">
              {active.gallery.slice(0, 4).map((image) => (
                <div key={image.id} className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xs">
                  <Image src={image.src} alt="" fill sizes="40px" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <Link href={`/projects/${active.slug}`} className="group mt-3 block">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-base font-medium leading-tight">{active.name}</h4>
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
