"use client";

import { aboutStats } from "@/data/stats";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Counter } from "@/components/motion/Counter";
import { ButtonLink } from "@/components/ui/Button";

export function AboutJamland() {
  return (
    <Section theme="paper" id="about">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
          <Reveal className="shrink-0">
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] md:text-sm">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-current opacity-60"
              />
              About Jamland
            </span>
          </Reveal>
          <Reveal delay={0.1} className="flex-1">
            <p className="font-display text-2xl font-medium leading-snug md:text-3xl lg:text-4xl">
              We&apos;re a land-investment platform dedicated to making real
              ownership reachable. Every project we list is independently
              verified, divided into transparent shares, and backed by
              documentation you can actually hold.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20">
          <Grid>
            {/* Left Image */}
            <div className="col-span-4 md:col-span-4 lg:col-span-5">
              <ParallaxImage
                src="https://picsum.photos/seed/jamland-about-team/1200/900"
                alt="Jamland team surveying a verified land project"
                width={1200}
                height={900}
                sizes="360px"
                containerClassName="w-[360px] h-[320px] rounded-sm"
              />
            </div>

            {/* Center Content */}
            <div className="col-span-4 md:col-span-4 lg:col-span-4 mr-20 flex flex-col justify-center">
              <Reveal>
                <p className="text-ink/70">
                  Our approach stays the same on every project — verify the
                  title, divide it into fixed-price shares, and hand over
                  documentation that proves real ownership.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-8">
                <ButtonLink href="/about" variant="primary" icon>
                  Learn More About Us
                </ButtonLink>
              </Reveal>
            </div>

            {/* Right Image */}
            <div className="col-span-4 md:col-span-8 lg:col-span-3 lg:self-start">
              <ParallaxImage
                src="https://picsum.photos/seed/jamland-about-site/900/1200"
                alt="A verified Jamland project site at dusk"
                width={900}
                height={1200}
                sizes="180px"
                containerClassName="w-[180px] h-[180px] rounded-sm"
              />
            </div>
          </Grid>
        </div>

        <StaggerReveal
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-20 lg:grid-cols-4"
          itemClassName="border-t border-line pt-6"
        >
          {aboutStats.map((stat) => (
            <div key={stat.id}>
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                pad={stat.pad}
                className="font-display text-4xl font-medium md:text-5xl"
              />
              <p className="mt-2 text-sm text-ink/55">{stat.label}</p>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
