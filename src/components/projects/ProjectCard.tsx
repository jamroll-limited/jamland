import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ProjectProgress } from "@/components/projects/ProjectProgress";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  priority = false,
  className,
}: ProjectCardProps) {
  const remaining = getRemainingShares(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
    >
      <article className="relative overflow-hidden rounded-sm bg-ink text-white">

        {/* Image */}
        <div className="relative aspect-[4/4.5] overflow-hidden">
          <ParallaxImage
            src={project.cardImage}
            alt={`${project.name} land plots in ${project.location}`}
            width={900}
            height={1012}
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            containerClassName="absolute inset-0 h-full w-full"
            imageClassName="
              h-full w-full object-cover
              transition-transform duration-1000 ease-out
              group-hover:scale-[1.06]
            "
          />

          {/* Gradient */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/85
              via-black/25
              to-black/5
            "
          />

          {/* Status */}
          <div className="absolute left-4 top-4 z-10">
            <StatusBadge status={project.status} />
          </div>

          {/* Arrow */}
          <div
            className="
              absolute right-4 top-4 z-10
              flex size-10 items-center justify-center
              rounded-full border border-white/30
              bg-white/10 backdrop-blur-md
              transition-all duration-500
              group-hover:bg-white
              group-hover:text-ink
            "
          >
            <ArrowUpRight
              aria-hidden="true"
              className="
                size-4
                transition-transform duration-500
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-white/60">
                  {project.location}
                </p>

                <h3 className="font-display text-2xl font-medium leading-tight md:text-3xl">
                  {project.name}
                </h3>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/50">
                  From
                </p>

                <p className="text-sm font-medium">
                  {formatCurrency(project.pricePerShare)}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <ProjectProgress
                soldShares={project.soldShares}
                totalShares={project.totalShares}
                className="[&_*]:text-white"
              />

              <div className="mt-2 flex items-center justify-between text-[11px] text-white/55">
                <span>
                  {formatNumber(project.soldShares)} /{" "}
                  {formatNumber(project.totalShares)} shares
                </span>

                <span>
                  {formatNumber(remaining)} remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}