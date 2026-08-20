import type { FacilityCategory, Project } from "@/types/project";
import { LocationMap } from "@/components/shared/LocationMap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

const categoryLabels: Record<FacilityCategory, string> = {
  road: "Road",
  hospital: "Hospital",
  school: "School",
  airport: "Airport",
  commercial: "Commercial",
  transport: "Transport",
  landmark: "Landmark",
};

export function LocationSurroundings({ project }: { project: Project }) {
  return (
    <div>
      <Reveal>
        <Eyebrow className="text-moss">Location &amp; Surrounding Area</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">What&apos;s nearby.</h2>
      </Reveal>

      <Reveal delay={0.2} className="mt-10">
        <LocationMap points={project.facilities} />
      </Reveal>

      <StaggerReveal className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {project.facilities.map((facility) => (
          <div
            key={facility.id}
            className="flex items-center justify-between gap-4 border-b border-line py-3 text-sm"
          >
            <span className="text-ink/75">
              <span className="text-ink/45">{categoryLabels[facility.category]} · </span>
              {facility.label}
            </span>
            <span className="shrink-0 font-medium text-ink/60">{facility.distance}</span>
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
}
