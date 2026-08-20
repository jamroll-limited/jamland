import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const items = [
  {
    id: "vision",
    eyebrow: "Vision",
    title: "A future where land ownership is accessible to everyone.",
    description:
      "We imagine a Bangladesh where meaningful land ownership isn't limited by how much capital you start with.",
  },
  {
    id: "mission",
    eyebrow: "Mission",
    title: "Verified land, transparent shares, real documentation.",
    description:
      "We source, verify, and divide strategic land into accessible shares — and stand behind every project we list.",
  },
];

export function VisionMission() {
  return (
    <Section theme="ink">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          {items.map((item) => (
            <div key={item.id}>
              <Reveal>
                <Eyebrow className="text-brass-light">{item.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="mt-5 font-display text-3xl font-medium md:text-4xl">
                  {item.title}
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-md text-paper/70">{item.description}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
