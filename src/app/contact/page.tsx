import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { generalFaqs } from "@/data/faq";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactMap } from "@/components/contact/ContactMap";
import { FinalCta } from "@/components/home/FinalCta";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Jamland team — by phone, email, WhatsApp, or through our contact form.",
};

interface ContactPageProps {
  searchParams: Promise<{ project?: string; shares?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { project, shares } = await searchParams;
  const projects = getAllProjects();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Let's talk about", "your investment."]}
        description="Reach out with questions about any project, or start your investment directly through the form below."
        image="https://picsum.photos/seed/jamland-contact-hero/2000/1125"
        imageAlt="Jamland office exterior at dusk"
      />

      <Section theme="paper">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <ContactForm
                projects={projects}
                defaultProjectSlug={project}
                defaultShares={shares}
              />
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
              <ContactInfo />
            </div>
          </Grid>

          <div className="mt-20">
            <ContactMap />
          </div>
        </Container>
      </Section>
      
      {/* @ts-ignore: Faq component prop types mismatch in current typings */}
      <Faq faqs={generalFaqs} className="mt-20" />

      {/* <Section theme="paper" className="border-t border-line">
        <Container>
          <Reveal>
            <Eyebrow className="text-moss">Quick Help</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-medium md:text-4xl">
              Answers before you ask.
            </h2>
          </Reveal>
          <FaqAccordion faqs={generalFaqs} className="mt-10 max-w-3xl" />
        </Container>
      </Section> */}

      <FinalCta />
    </>
  );
}
