import { investmentSteps } from "@/data/how-it-works";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { padStep } from "@/lib/utils";

export function InvestmentProcess() {
  return (
    <div>
      <Reveal>
        <Eyebrow className="text-moss">Investment Process</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl">
          How you&apos;ll invest.
        </h2>
      </Reveal>

      <StaggerReveal className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {investmentSteps.map((step) => (
          <div key={step.step} className="border-t border-line pt-6">
            <span className="font-display text-sm text-moss">{padStep(step.step)}</span>
            <h3 className="mt-2 font-display text-xl font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-ink/65">{step.description}</p>
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
}
