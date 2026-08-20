import type { Project } from "@/types/project";
import { projectTypeLabels } from "@/components/projects/ProjectFilters";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { formatNumber } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function LandDetails({ project }: { project: Project }) {
  const details = [
    { label: "Total Land Area", value: project.landAreaTotal },
    { label: "Area Per Share", value: project.landAreaPerShare },
    { label: "Project Type", value: projectTypeLabels[project.projectType] },
    { label: "Total Shares", value: formatNumber(project.totalShares) },
    { label: "Launch Date", value: formatDate(project.launchDate) },
    { label: "Expected Completion", value: formatDate(project.expectedCompletion) },
  ];

  return (
    <div>
      <Reveal>
        <Eyebrow className="text-moss">Land Details</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
          The land, in detail.
        </h2>
      </Reveal>

      <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-0 border-t border-line sm:grid-cols-2">
        {details.map((detail, index) => (
          <Reveal key={detail.label} delay={0.05 * index}>
            <div className="flex items-baseline justify-between border-b border-line py-4">
              <dt className="text-sm text-ink/55">{detail.label}</dt>
              <dd className="font-medium">{detail.value}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
