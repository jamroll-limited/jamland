import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function ProjectHero({ project }: { project: Project }) {
  const remaining = getRemainingShares(project);

  return (
    <section className="relative flex min-h-[44rem] w-full items-end overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <ParallaxImage
          src={project.heroImage}
          alt={`${project.name} aerial view`}
          fill
          priority
          sizes="100vw"
          containerClassName="h-full w-full"
          imageClassName="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10"
      />

      <Container wide className="relative z-10 pb-16 pt-40 md:pb-20">
        <Reveal className="mb-6 flex flex-wrap items-center gap-4">
          <Eyebrow className="text-brass-light">{project.location}</Eyebrow>
          <StatusBadge status={project.status} />
        </Reveal>

        <TextReveal
          as="h1"
          lines={[project.name]}
          immediate
          className="max-w-4xl font-display text-5xl font-medium leading-[0.98] md:text-7xl"
        />

        <Reveal delay={0.25} className="mt-6 max-w-xl">
          <p className="text-base text-paper/75 md:text-lg">{project.tagline}</p>
        </Reveal>

        <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-paper/50">Share Price</p>
            <p className="mt-1 font-display text-2xl font-medium">
              {formatCurrency(project.pricePerShare)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-paper/50">Shares Available</p>
            <p className="mt-1 font-display text-2xl font-medium">{formatNumber(remaining)}</p>
          </div>
          <MagneticButton>
            <ButtonLink href="#invest" size="lg" icon>
              Invest Now
            </ButtonLink>
          </MagneticButton>
        </Reveal>
      </Container>
    </section>
  );
}
