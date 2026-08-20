import { investmentStats } from "@/data/stats";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Counter } from "@/components/motion/Counter";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

export function InvestmentStats() {
  return (
    <Section theme="ink" id="investment-statistics">
      <Container>
        <Reveal>
          <Eyebrow className="text-brass-light">By the Numbers</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-medium md:text-5xl">
            Growing steadily, transparently.
          </h2>
        </Reveal>

        <StaggerReveal
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4"
          itemClassName="border-t border-line-on-dark pt-6"
        >
          {investmentStats.map((stat) => (
            <div key={stat.id}>
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                pad={stat.pad}
                className="font-display text-5xl font-medium md:text-6xl"
              />
              <p className="mt-3 text-sm uppercase tracking-wide text-paper/55">{stat.label}</p>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
