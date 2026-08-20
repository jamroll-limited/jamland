import type { Project } from "@/types/project";
import { Container } from "@/components/layout/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function FinalInvestCta({ project }: { project: Project }) {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <ParallaxImage
          src={project.heroImage}
          alt={`${project.name} land`}
          fill
          sizes="100vw"
          containerClassName="h-full w-full"
          imageClassName="object-cover"
          parallaxStrength={56}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />

      <Container className="relative z-10 py-28 text-center">
        <TextReveal
          as="h2"
          lines={["Ready to own a share", `of ${project.name}?`]}
          className="mx-auto max-w-3xl font-display text-4xl font-medium leading-[1.05] md:text-6xl"
        />
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <MagneticButton>
            <ButtonLink href={`/contact?project=${project.slug}`} size="lg" icon>
              Start Investing
            </ButtonLink>
          </MagneticButton>
        </Reveal>
      </Container>
    </section>
  );
}
