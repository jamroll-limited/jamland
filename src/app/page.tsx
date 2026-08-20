import { Hero } from "@/components/home/Hero";
import { AboutJamland } from "@/components/home/AboutJamland";
import { InvestmentOpportunities } from "@/components/home/InvestmentOpportunities";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { SurroundingArea } from "@/components/home/SurroundingArea";
import { HowItWorksHome } from "@/components/home/HowItWorksHome";
import { Faq } from "@/components/home/Faq";
import { InvestmentStats } from "@/components/home/InvestmentStats";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutJamland />
      <InvestmentOpportunities />
      {/* <FeaturedProjects /> */}
      <ProjectShowcase />
      <HowItWorksHome />
      <SurroundingArea />
      <Faq />
      {/* <InvestmentStats /> */}
      <FinalCta />
    </>
  );
}
