import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { investmentSteps } from "@/data/how-it-works";
import { padStep, cn } from "@/lib/utils";

const stepImages: Record<number, string> = {
  1: "https://picsum.photos/seed/jamland-step-explore/1400/1000",
  2: "https://picsum.photos/seed/jamland-step-select/1400/1000",
  3: "https://picsum.photos/seed/jamland-step-invest/1400/1000",
  4: "https://picsum.photos/seed/jamland-step-own/1400/1000",
};

const stepDetails: Record<number, string[]> = {
  1: [
    "Browse every verified project with full location detail, land documentation, and transparent pricing.",
    "Compare projects by region, type, and investment range until you find the one that fits your goals.",
  ],
  2: [
    "Use the investment calculator on any project page to choose how many shares you'd like to hold.",
    "Your total updates instantly, with no hidden fees added later.",
  ],
  3: [
    "Complete your investment through a secure, guided process, with confirmation at every step.",
    "Our team is available throughout to answer questions before you commit.",
  ],
  4: [
    "Receive real ownership documentation naming your share of the project.",
    "Track your holding as the project moves through to completion.",
  ],
};

export function HowItWorksDetail() {
  return (
    <Section theme="paper">
      <Container>
        <div className="flex flex-col gap-24 md:gap-32">
          {investmentSteps.map((step, index) => {
            const reversed = index % 2 === 1;
            return (
              <Grid key={step.step}>
                <div
                  className={cn(
                    "col-span-4 md:col-span-8 lg:col-span-7",
                    reversed && "lg:order-2 lg:col-start-6"
                  )}
                >
                  <ParallaxImage
                    src={stepImages[step.step]}
                    alt={`Illustration of the ${step.title} step`}
                    width={1400}
                    height={1000}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    containerClassName="aspect-16/11 rounded-sm"
                  />
                </div>
                <div
                  className={cn(
                    "col-span-4 md:col-span-8 lg:col-span-4",
                    reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"
                  )}
                >
                  <div className="flex h-full flex-col justify-center">
                    <Reveal>
                      <span className="font-display text-sm text-moss">
                        {padStep(step.step)}
                      </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <h3 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                        {step.title}
                      </h3>
                    </Reveal>
                    <div className="mt-5 flex flex-col gap-3">
                      {stepDetails[step.step].map((paragraph) => (
                        <Reveal key={paragraph.slice(0, 24)} delay={0.15}>
                          <p className="text-ink/70">{paragraph}</p>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
