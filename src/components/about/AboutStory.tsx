import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function AboutStory() {
  return (
    <Section theme="paper">
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <ParallaxImage
              src="https://picsum.photos/seed/jamland-about-story/1200/1500"
              alt="Land survey work at a Jamland project site"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 40vw, 100vw"
              containerClassName="aspect-4/5 rounded-sm"
            />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow className="text-moss">Our Story</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
                Land investment shouldn&apos;t require a fortune, or a leap of faith.
              </h2>
            </Reveal>
            <div className="mt-6 flex flex-col gap-5 text-ink/70">
              <Reveal delay={0.2}>
                <p>
                  Jamland started with a simple observation: land in Bangladesh has been
                  one of the most reliable long-term stores of value for generations —
                  but owning it outright has stayed out of reach for most people.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p>
                  We built a platform that verifies land before it&apos;s ever listed,
                  divides it into transparent, fixed-price shares, and gives investors
                  the documentation to prove real ownership — without needing to buy an
                  entire plot outright.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  Today, that model spans multiple projects across Bangladesh, each held
                  to the same standard of verification and transparency we started with.
                </p>
              </Reveal>
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
