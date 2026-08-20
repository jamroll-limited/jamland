"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import {
  ProjectFilters,
  defaultFilterState,
  matchesPriceRange,
  type ProjectFilterState,
} from "@/components/projects/ProjectFilters";

interface ProjectsExplorerProps {
  projects: Project[];
}

/** Owns filter state and derives the visible project list — ready to swap `projects` for an API/CMS fetch later. */
export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const regions = useMemo(
    () => Array.from(new Set(projects.map((project) => project.region))).sort(),
    [projects]
  );

  const [filters, setFilters] = useState<ProjectFilterState>(defaultFilterState);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (filters.region !== "all" && project.region !== filters.region) return false;
      if (filters.type !== "all" && project.projectType !== filters.type) return false;
      if (filters.status !== "all" && project.status !== filters.status) return false;
      if (!matchesPriceRange(project.pricePerShare, filters.priceRange)) return false;
      return true;
    });
  }, [projects, filters]);

  return (
    <div>
      <ProjectFilters regions={regions} value={filters} onChange={setFilters} />
      <p className="py-6 text-sm text-ink/55">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} found
      </p>
      <ProjectGrid projects={filtered} />
    </div>
  );
}
