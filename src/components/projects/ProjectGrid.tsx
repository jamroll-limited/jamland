import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-ink/55">
        No projects match your filters. Try adjusting them.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-5 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6",
        className
      )}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          priority={index < 2}
          className="col-span-4"
        />
      ))}
    </div>
  );
}
