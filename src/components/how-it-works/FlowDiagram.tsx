import { Fragment } from "react";
import { investmentSteps } from "@/data/how-it-works";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { padStep, cn } from "@/lib/utils";

const lastStep = investmentSteps.length - 1;
// % inset so the connecting line meets each node's center on an even n-column grid.
const CONNECTOR_INSET = 100 / (investmentSteps.length * 2);

function StepMarker({ index, className }: { index: number; className?: string }) {
  return (
    <span
      className={cn(
        "z-10 flex size-12 shrink-0 items-center justify-center rounded-full border font-display text-sm font-medium",
        index === lastStep ? "border-moss bg-moss text-paper" : "border-moss/50 bg-paper text-moss",
        className
      )}
    >
      {padStep(investmentSteps[index].step)}
    </span>
  );
}

/** A connected-node process map: EXPLORE → SELECT → INVEST → OWN. */
export function FlowDiagram() {
  return (
    <div className="relative">
      {/* Desktop: nodes strung along a single connecting line */}
      <div className="relative hidden md:block">
        <div
          aria-hidden="true"
          className="absolute top-6 h-px bg-line"
          style={{ left: `${CONNECTOR_INSET}%`, right: `${CONNECTOR_INSET}%` }}
        />
        <StaggerReveal className="relative grid grid-cols-4 gap-x-6">
          {investmentSteps.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center text-center">
              <StepMarker index={index} className="relative" />
              <p className="mt-6 font-display text-xl font-medium tracking-tight md:text-2xl">
                {step.title}
              </p>
              <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-ink/60">
                {step.description}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </div>

      {/* Mobile: vertical timeline */}
      <StaggerReveal className="flex flex-col md:hidden" itemClassName="relative pb-10 pl-16 last:pb-0">
        {investmentSteps.map((step, index) => (
          <Fragment key={step.step}>
            {index < lastStep && (
              <span aria-hidden="true" className="absolute left-6 top-12 bottom-0 w-px bg-line" />
            )}
            <StepMarker index={index} className="absolute left-0 top-0" />
            <p className="pt-2.5 font-display text-xl font-medium tracking-tight">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.description}</p>
          </Fragment>
        ))}
      </StaggerReveal>
    </div>
  );
}
