import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}

export function getProjectProgress(
  project: Pick<Project, "soldShares" | "totalShares">
): number {
  if (project.totalShares <= 0) return 0;
  return (project.soldShares / project.totalShares) * 100;
}

export function getRemainingShares(
  project: Pick<Project, "soldShares" | "totalShares">
): number {
  return Math.max(project.totalShares - project.soldShares, 0);
}
