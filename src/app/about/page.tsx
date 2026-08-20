import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AboutStory } from "@/components/about/AboutStory";
import { VisionMission } from "@/components/about/VisionMission";
import { HowModelWorks } from "@/components/about/HowModelWorks";
import { TrustValues } from "@/components/about/TrustValues";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jamland is a shared-ownership land investment platform built on verification, transparency, and long-term trust.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Jamland"
        title={["Land investment,", "built on trust."]}
        description="We verify, divide, and document strategic land so ownership starts at a fraction of the traditional entry point."
        image="https://picsum.photos/seed/jamland-about-hero/2000/1125"
        imageAlt="Open land under a wide sky"
      />
      <AboutStory />
      <VisionMission />
      <HowModelWorks />
      <TrustValues />
      <Faq />
      <FinalCta />
    </>
  );
}
