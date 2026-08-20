import { generalFaqs } from "@/data/faq";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";

export function Faq() {
  return (
    <Section theme="paper" id="faq">
      <Container className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
        <div>
          <Reveal>
            <Eyebrow className="text-moss">FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 max-w-2xl font-display text-5xl font-medium leading-[1.02] md:text-6xl lg:text-7xl">
              Answers before you invest.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="w-full md:max-w-3xl">
          <FaqAccordion faqs={generalFaqs} className="md:mt-20" />
        </Reveal>
      </Container>
    </Section>
  );
}
