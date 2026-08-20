"use client";

import type { ProjectStatus, ProjectType } from "@/types/project";

export type PriceRangeKey = "all" | "under-40k" | "40k-80k" | "above-80k";

export const priceRangeLabels: Record<PriceRangeKey, string> = {
  all: "Any Price",
  "under-40k": "Under ৳40,000",
  "40k-80k": "৳40,000 – ৳80,000",
  "above-80k": "Above ৳80,000",
};

export const projectTypeLabels: Record<ProjectType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "mixed-use": "Mixed-Use",
  agricultural: "Agricultural",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  available: "Available",
  "selling-fast": "Selling Fast",
  "sold-out": "Sold Out",
  "coming-soon": "Coming Soon",
};

export interface ProjectFilterState {
  region: string;
  type: ProjectType | "all";
  status: ProjectStatus | "all";
  priceRange: PriceRangeKey;
}

export const defaultFilterState: ProjectFilterState = {
  region: "all",
  type: "all",
  status: "all",
  priceRange: "all",
};

export function matchesPriceRange(price: number, range: PriceRangeKey): boolean {
  if (range === "all") return true;
  if (range === "under-40k") return price < 40000;
  if (range === "40k-80k") return price >= 40000 && price <= 80000;
  return price > 80000;
}

interface ProjectFiltersProps {
  regions: string[];
  value: ProjectFilterState;
  onChange: (value: ProjectFilterState) => void;
}

export function ProjectFilters({ regions, value, onChange }: ProjectFiltersProps) {
  const hasActiveFilters =
    value.region !== "all" ||
    value.type !== "all" ||
    value.status !== "all" ||
    value.priceRange !== "all";

  return (
    <div
      role="group"
      aria-label="Filter projects"
      className="flex flex-wrap items-center gap-3 border-y border-line py-6"
    >
      <FilterSelect
        label="Location"
        value={value.region}
        onChange={(region) => onChange({ ...value, region })}
        options={[
          { value: "all", label: "All Locations" },
          ...regions.map((region) => ({ value: region, label: region })),
        ]}
      />
      <FilterSelect
        label="Type"
        value={value.type}
        onChange={(type) => onChange({ ...value, type: type as ProjectFilterState["type"] })}
        options={[
          { value: "all", label: "All Types" },
          ...Object.entries(projectTypeLabels).map(([v, label]) => ({ value: v, label })),
        ]}
      />
      <FilterSelect
        label="Investment Range"
        value={value.priceRange}
        onChange={(priceRange) =>
          onChange({ ...value, priceRange: priceRange as PriceRangeKey })
        }
        options={Object.entries(priceRangeLabels).map(([v, label]) => ({ value: v, label }))}
      />
      <FilterSelect
        label="Status"
        value={value.status}
        onChange={(status) =>
          onChange({ ...value, status: status as ProjectFilterState["status"] })
        }
        options={[
          { value: "all", label: "All Statuses" },
          ...Object.entries(projectStatusLabels).map(([v, label]) => ({ value: v, label })),
        ]}
      />

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => onChange(defaultFilterState)}
          className="ml-auto text-xs font-medium uppercase tracking-wide text-ink/50 transition-colors hover:text-ink"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="flex items-center gap-2 border border-line-strong px-4 py-2.5 text-sm">
      <span className="text-ink/50">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="bg-transparent font-medium focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
