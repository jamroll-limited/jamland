import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";

interface ProjectStatsProps {
  project: Pick<Project, "pricePerShare" | "totalShares" | "soldShares">;
  className?: string;
}

/** Share Price / Total Shares / Shares Sold / Shares Remaining — the core investment-overview stat row. */
export function ProjectStats({ project, className }: ProjectStatsProps) {
  const stats = [
    { label: "Share Price", value: formatCurrency(project.pricePerShare) },
    { label: "Total Shares", value: formatNumber(project.totalShares) },
    { label: "Shares Sold", value: formatNumber(project.soldShares) },
    { label: "Remaining", value: formatNumber(getRemainingShares(project)) },
  ];

  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-xs uppercase tracking-wide opacity-55">{stat.label}</dt>
          <dd className="mt-1.5 font-display text-xl font-medium md:text-2xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
