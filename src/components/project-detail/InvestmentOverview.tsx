import type { Project } from "@/types/project";
import { ProjectStats } from "@/components/projects/ProjectStats";
import { ProjectProgress } from "@/components/projects/ProjectProgress";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

export function InvestmentOverview({ project }: { project: Project }) {
  return (
    <div>
      <Reveal>
        <Eyebrow className="text-moss">Investment Overview</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">Funding progress</h2>
      </Reveal>
      <Reveal delay={0.2} className="mt-8">
        <ProjectProgress soldShares={project.soldShares} totalShares={project.totalShares} />
      </Reveal>
      <Reveal delay={0.25} className="mt-8">
        <ProjectStats project={project} />
      </Reveal>
    </div>
  );
}
