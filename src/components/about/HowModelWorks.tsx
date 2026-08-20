import { investmentSteps } from "@/data/how-it-works";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { padStep } from "@/lib/utils";

export function HowModelWorks() {
  return (
    <Section theme="paper">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow className="text-moss">How The Model Works</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
                Ownership, made accessible.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <ButtonLink href="/how-it-works" variant="secondary" icon>
              See the full process
            </ButtonLink>
          </Reveal>
        </div>

        <StaggerReveal className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {investmentSteps.map((step) => (
            <div key={step.step} className="border-t border-line pt-6">
              <span className="font-display text-sm text-moss">{padStep(step.step)}</span>
              <h3 className="mt-2 font-display text-xl font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{step.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
