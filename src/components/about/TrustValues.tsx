import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

const values = [
  {
    title: "Verify before we list",
    description: "No project reaches investors without an independent title check first.",
  },
  {
    title: "Disclose everything",
    description:
      "Pricing, availability, and progress are always visible — nothing is negotiated privately.",
  },
  {
    title: "Document every share",
    description: "Every investment is backed by real, traceable ownership documentation.",
  },
];

export function TrustValues() {
  return (
    <Section theme="paper">
      <Container>
        <Reveal>
          <Eyebrow className="text-moss">What We Stand For</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-medium md:text-4xl">
            Trust isn&apos;t a tagline here — it&apos;s the product.
          </h2>
        </Reveal>

        <StaggerReveal className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl font-medium">{value.title}</h3>
              <p className="mt-3 text-sm text-ink/65">{value.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </Section>
  );
}
