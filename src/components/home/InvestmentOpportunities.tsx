"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Coins,
  BadgeCheck,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import type { ProjectStatus, ProjectType } from "@/types/project";
import {
  priceRangeLabels,
  projectStatusLabels,
  projectTypeLabels,
  matchesPriceRange,
  type PriceRangeKey,
} from "@/components/projects/ProjectFilters";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PropertyCard } from "@/components/home/PropertyCard";
import { cn } from "@/lib/utils";

const typeTabs: { value: ProjectType | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  ...(Object.entries(projectTypeLabels) as [ProjectType, string][]).map(
    ([value, label]) => ({ value, label }),
  ),
];

interface FilterState {
  type: ProjectType | "all";
  region: string;
  priceRange: PriceRangeKey;
  status: ProjectStatus | "all";
}

const defaultFilters: FilterState = {
  type: "all",
  region: "all",
  priceRange: "all",
  status: "all",
};

const VISIBLE_LIMIT = 6;

export function InvestmentOpportunities() {
  const projects = getAllProjects();
  const regions = useMemo(
    () => Array.from(new Set(projects.map((project) => project.region))).sort(),
    [projects],
  );

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (filters.type !== "all" && project.projectType !== filters.type)
        return false;
      if (filters.region !== "all" && project.region !== filters.region)
        return false;
      if (filters.status !== "all" && project.status !== filters.status)
        return false;
      if (!matchesPriceRange(project.pricePerShare, filters.priceRange))
        return false;
      return true;
    });
  }, [projects, filters]);

  const visible = filtered.slice(0, VISIBLE_LIMIT);
  const hasActiveFilters =
    filters.type !== "all" ||
    filters.region !== "all" ||
    filters.priceRange !== "all" ||
    filters.status !== "all";

  return (
    <Section theme="paper" id="investment-opportunities">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Investment Opportunities"
            title={["Find the land", "that will be yours."]}
            className="mb-0"
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm text-ink/55 md:text-right">
              Every project is title-verified before listing. Search by type,
              location, and investment range to find your fit.
            </p>
          </Reveal>
        </div>

        {/* Search / filter panel */}
        <Reveal delay={0.1} className="mt-12 md:mt-14">
          <div className="rounded-md border border-line bg-paper-raised p-4 shadow-sm md:p-5">
            <div className="inline-flex w-fit flex-wrap gap-1 rounded-sm bg-paper-dim p-1">
              {typeTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      type: tab.value,
                    }))
                  }
                  aria-pressed={filters.type === tab.value}
                  className={cn(
                    "rounded-xs px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors duration-200",
                    filters.type === tab.value
                      ? "bg-paper-raised text-ink shadow-sm"
                      : "text-ink/50 hover:text-ink",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <FilterSelect
                icon={MapPin}
                ariaLabel="Location"
                value={filters.region}
                onChange={(region) =>
                  setFilters((prev) => ({ ...prev, region }))
                }
                options={[
                  { value: "all", label: "All Locations" },
                  ...regions.map((region) => ({
                    value: region,
                    label: region,
                  })),
                ]}
              />
              <FilterSelect
                icon={Coins}
                ariaLabel="Investment range"
                value={filters.priceRange}
                onChange={(priceRange) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: priceRange as PriceRangeKey,
                  }))
                }
                options={Object.entries(priceRangeLabels).map(
                  ([value, label]) => ({
                    value,
                    label,
                  }),
                )}
              />
              <FilterSelect
                icon={BadgeCheck}
                ariaLabel="Availability"
                value={filters.status}
                onChange={(status) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: status as ProjectStatus | "all",
                  }))
                }
                options={[
                  { value: "all", label: "Any Availability" },
                  ...Object.entries(projectStatusLabels).map(
                    ([value, label]) => ({
                      value,
                      label,
                    }),
                  ),
                ]}
              />

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => setFilters(defaultFilters)}
                  className="text-xs font-medium uppercase tracking-wide text-ink/50 transition-colors hover:text-ink"
                >
                  Clear Filters
                </button>
              )}

              <ButtonLink
                href="/projects"
                variant="primary"
                className="ml-auto"
              >
                Show Properties
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* Results */}
        <div className="mt-14 flex items-end justify-between gap-4 md:mt-16">
          <h3 className="font-display text-xl font-medium md:text-2xl">
            {hasActiveFilters ? "Matching Projects" : "Featured Land Projects"}
          </h3>
          <p className="shrink-0 text-sm text-ink/50">
            {filtered.length} project{filtered.length === 1 ? "" : "s"} found
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-sm text-ink/55">
            No projects match your filters. Try adjusting them.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-x-5 gap-y-10 md:grid-cols-8 md:gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            {visible.map((project, index) => (
              <PropertyCard
                key={project.slug}
                project={project}
                priority={index < 3}
                className="col-span-4"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

interface FilterSelectProps {
  icon: LucideIcon;
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function FilterSelect({
  icon: Icon,
  ariaLabel,
  value,
  onChange,
  options,
}: FilterSelectProps) {
  return (
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40"
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        className="appearance-none rounded-sm border border-line bg-paper py-3 pl-10 pr-9 text-sm font-medium text-ink focus:border-ink/40 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink/40"
      />
    </div>
  );
}
