import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { InvestmentSelectionProvider } from "@/components/project-detail/InvestmentSelectionContext";
import { ProjectHero } from "@/components/project-detail/ProjectHero";
import { InvestmentOverview } from "@/components/project-detail/InvestmentOverview";
import { ProjectStory } from "@/components/project-detail/ProjectStory";
import { LandDetails } from "@/components/project-detail/LandDetails";
import { InvestmentCalculator } from "@/components/project-detail/InvestmentCalculator";
import { LocationSurroundings } from "@/components/project-detail/LocationSurroundings";
import { ProjectGallery } from "@/components/project-detail/ProjectGallery";
import { InvestmentProcess } from "@/components/project-detail/InvestmentProcess";
import { FinalInvestCta } from "@/components/project-detail/FinalInvestCta";
import { StickyInvestPanel } from "@/components/project-detail/StickyInvestPanel";
import { MobileInvestBar } from "@/components/project-detail/MobileInvestBar";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, 3);

  return (
    <InvestmentSelectionProvider project={project}>
      <ProjectHero project={project} />

      <Section theme="paper">
        <Container>
          <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 flex flex-col gap-28 md:col-span-8 lg:col-span-7 lg:gap-32">
              <InvestmentOverview project={project} />
              <ProjectStory project={project} />
              <LandDetails project={project} />
              <div id="invest">
                <InvestmentCalculator />
              </div>
              <LocationSurroundings project={project} />
              <div>
                <Reveal>
                  <Eyebrow className="text-moss">Gallery</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
                    A closer look.
                  </h2>
                </Reveal>
                <div className="mt-10">
                  <ProjectGallery images={project.gallery} />
                </div>
              </div>
              <InvestmentProcess />
              {project.faqs.length > 0 && (
                <div>
                  <Reveal>
                    <Eyebrow className="text-moss">FAQ</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
                      Common questions.
                    </h2>
                  </Reveal>
                  <FaqAccordion faqs={project.faqs} className="mt-10" />
                </div>
              )}
            </div>

            <div className="col-span-4 hidden md:col-span-8 lg:col-span-4 lg:col-start-9 lg:block">
              <div className="sticky top-32">
                <StickyInvestPanel />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section theme="paper" className="border-t border-line">
          <Container>
            <Reveal>
              <Eyebrow className="text-moss">Related Projects</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
                Explore more.
              </h2>
            </Reveal>
            <ProjectGrid projects={related} className="mt-12" />
          </Container>
        </Section>
      )}

      <FinalInvestCta project={project} />
      <MobileInvestBar />
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </InvestmentSelectionProvider>
  );
}
