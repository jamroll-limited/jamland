import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FlowDiagram } from "@/components/how-it-works/FlowDiagram";
import { HowItWorksDetail } from "@/components/how-it-works/HowItWorksDetail";
import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Explore, select, invest, and own — how Jamland's shared land ownership model works from start to finish.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={["From exploring", "to owning."]}
        description="Four steps stand between you and real, documented land ownership. Here's exactly how each one works."
        image="https://picsum.photos/seed/jamland-how-it-works-hero/2000/1125"
        imageAlt="Land plots seen from above"
      />

      <Section theme="paper">
        <Container>
          <Reveal>
            <Eyebrow className="text-moss">The Process</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} className="mt-5 max-w-2xl">
            <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
              Four steps, start to finish — no surprises along the way.
            </p>
          </Reveal>
          <div className="mt-16 md:mt-20">
            <FlowDiagram />
          </div>
        </Container>
      </Section>

      <HowItWorksDetail />
      <FinalCta />
    </>
  );
}
