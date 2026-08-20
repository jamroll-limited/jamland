"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X, CircleCheck } from "lucide-react";
import { getAllProjects, getRemainingShares } from "@/lib/projects";
import type { ProjectStatus } from "@/types/project";
import { projectStatusLabels } from "@/components/projects/ProjectFilters";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectProgress } from "@/components/projects/ProjectProgress";
import { ProjectMap } from "@/components/home/ProjectMap";
import { GoogleProjectMap } from "@/components/home/GoogleProjectMap";
import { Reveal } from "@/components/motion/Reveal";
import { formatNumber, cn } from "@/lib/utils";

const statusTabs: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.entries(projectStatusLabels) as [ProjectStatus, string][]).map(
    ([value, label]) => ({ value, label })
  ),
];

export function SurroundingArea() {
  const projects = getAllProjects();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [activeSlug, setActiveSlug] = useState<string | null>(projects[0]?.slug ?? null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      if (status !== "all" && project.status !== status) return false;
      if (query && !`${project.name} ${project.location}`.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });
  }, [projects, search, status]);

  const active = filtered.find((project) => project.slug === activeSlug) ?? filtered[0];

  return (
    <Section theme="paper" id="project-map">
      <Container>
        <SectionHeading
          eyebrow="Project Map"
          title={["Every project,", "plotted and verified."]}
          description="Browse every Jamland project on the map, or search the list to find one by name or location."
          className="mb-14 md:mb-16"
        />

        <Reveal>
          <div className="flex flex-col gap-6 lg:h-[640px] lg:flex-row">
            <div className="flex flex-col lg:h-full lg:w-[360px] lg:shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium">Project List</h3>
                <span className="text-sm text-ink/50">
                  {filtered.length} of {projects.length}
                </span>
              </div>

              <div className="relative mt-4">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search project or location"
                  aria-label="Search projects"
                  className="w-full rounded-sm border border-line bg-paper-raised py-2.5 pl-10 pr-9 text-sm focus:border-ink/40 focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 transition-colors hover:text-ink"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setStatus(tab.value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors duration-200",
                      status === tab.value
                        ? "border-ink bg-ink text-paper"
                        : "border-line-strong text-ink/60 hover:border-ink hover:text-ink"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                {filtered.length === 0 ? (
                  <p className="py-10 text-center text-sm text-ink/55">
                    No projects match your search.
                  </p>
                ) : (
                  filtered.map((project) => {
                    const remaining = getRemainingShares(project);
                    const isActive = project.slug === active?.slug;

                    return (
                      <button
                        key={project.slug}
                        type="button"
                        onClick={() => setActiveSlug(project.slug)}
                        aria-pressed={isActive}
                        className={cn(
                          "flex gap-3 rounded-sm border p-3 text-left transition-colors duration-200",
                          isActive ? "border-ink bg-paper-raised" : "border-line hover:border-line-strong"
                        )}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xs">
                          <Image
                            src={project.cardImage}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] uppercase tracking-wide text-ink/45">
                            {project.region}
                          </p>
                          <p className="mt-0.5 truncate font-display text-sm font-medium">
                            {project.name}
                          </p>
                          <div className="mt-1.5 flex items-center gap-3 text-xs text-ink/60">
                            <span className="flex items-center gap-1 text-moss">
                              <CircleCheck aria-hidden="true" className="size-3.5" />
                              {formatNumber(project.soldShares)} sold
                            </span>
                            <span>{formatNumber(remaining)} left</span>
                          </div>
                          <ProjectProgress
                            soldShares={project.soldShares}
                            totalShares={project.totalShares}
                            className="mt-2"
                          />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="aspect-4/3 lg:aspect-auto lg:h-full lg:flex-1">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <GoogleProjectMap
                  projects={filtered}
                  active={active}
                  activeSlug={active?.slug ?? null}
                  onSelect={setActiveSlug}
                />
              ) : (
                <ProjectMap
                  projects={filtered}
                  active={active}
                  activeSlug={active?.slug ?? null}
                  onSelect={setActiveSlug}
                />
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
