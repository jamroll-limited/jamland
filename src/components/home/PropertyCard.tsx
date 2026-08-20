import Link from "next/link";
import { MapPin, Ruler, Layers, Users } from "lucide-react";
import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

interface PropertyCardProps {
  project: Project;
  priority?: boolean;
  className?: string;
}

/** A light, listing-style card for the homepage search grid — pairs with `ProjectCard` (the dark overlay variant used on /projects). */
export function PropertyCard({ project, priority = false, className }: PropertyCardProps) {
  const remaining = getRemainingShares(project);

  return (
    <Link href={`/projects/${project.slug}`} className={cn("group block", className)}>
      <article className="overflow-hidden rounded-sm border border-line bg-paper-raised transition-shadow duration-300 hover:shadow-lg hover:shadow-ink/5">
        <div className="relative aspect-4/3 overflow-hidden">
          <ParallaxImage
            src={project.cardImage}
            alt={`${project.name} land plots in ${project.location}`}
            width={900}
            height={675}
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            containerClassName="absolute inset-0 h-full w-full"
            imageClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 z-10">
            <StatusBadge status={project.status} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-medium leading-snug">
              {project.name}
            </h3>
            <p className="shrink-0 text-sm font-semibold text-moss">
              {formatCurrency(project.pricePerShare)}
            </p>
          </div>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/50">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
            {project.location}
          </p>

          <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-xs text-ink/60">
            <span className="flex items-center gap-1.5">
              <Ruler aria-hidden="true" className="size-3.5 text-ink/35" />
              {project.landAreaTotal}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers aria-hidden="true" className="size-3.5 text-ink/35" />
              {formatNumber(project.totalShares)} shares
            </span>
            <span className="flex items-center gap-1.5">
              <Users aria-hidden="true" className="size-3.5 text-ink/35" />
              {formatNumber(remaining)} left
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
