import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse every Jamland land investment project — filter by location, project type, investment range, and availability.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={["Every project,", "fully transparent."]}
        description="From residential land outside Dhaka to commercial frontage on the coast — explore every project we've verified and listed."
        image="https://picsum.photos/seed/jamland-projects-hero/2000/1125"
        imageAlt="Wide aerial view of plotted land"
      />

      <Section theme="paper">
        <Container>
          <Reveal>
            <p className="max-w-2xl text-lg text-ink/70 md:text-xl">
              Every project below has passed independent title verification before
              listing. Use the filters to narrow by location, type, investment
              range, or availability.
            </p>
          </Reveal>

          <div className="mt-12">
            <ProjectsExplorer projects={projects} />
          </div>
        </Container>
      </Section>
    </>
  );
}
