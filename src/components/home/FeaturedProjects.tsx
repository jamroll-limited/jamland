import { getFeaturedProjects } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <Section theme="paper" id="featured-projects">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Projects"
            title={["Land worth", "owning."]}
            className="mb-0"
          />
          <Reveal delay={0.15}>
            <ButtonLink href="/projects" variant="secondary" icon>
              View All Projects
            </ButtonLink>
          </Reveal>
        </div>

        <ProjectGrid projects={featured} className="mt-16 md:mt-20" />
      </Container>
    </Section>
  );
}
