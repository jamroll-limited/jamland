import { Container } from "@/components/layout/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: string[];
  description?: string;
  image: string;
  imageAlt: string;
}

/** The shared dark, image-backed hero used by every secondary page — gives the header something to overlay transparently. */
export function PageHero({ eyebrow, title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[38rem] w-full items-end overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <ParallaxImage
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          containerClassName="h-full w-full"
          imageClassName="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15"
      />

      <Container wide className="relative z-10 pb-20 pt-40 md:pb-24">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="text-brass-light">{eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            lines={title}
            immediate
            className="mt-6 font-display text-5xl font-medium leading-[0.98] md:text-7xl"
          />
          {description && (
            <Reveal delay={0.3} className="mt-6 max-w-xl">
              <p className="text-base text-paper/75 md:text-lg">{description}</p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
