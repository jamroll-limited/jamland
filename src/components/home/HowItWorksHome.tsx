"use client";

import { investmentSteps } from "@/data/how-it-works";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

import { padStep, cn } from "@/lib/utils";

export function HowItWorksHome() {
  return (
    <Section
      id="how-it-works"
      theme="paper"
      className="relative overflow-hidden"
    >
      <Container>
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-8

            lg:flex-row
            lg:items-end
          "
        >
          <div className="max-w-3xl">
            <Eyebrow className="text-moss">How It Works</Eyebrow>

            <h2
              className="
                mt-5
                max-w-2xl
                font-display
                text-4xl
                font-medium
                leading-[0.98]
                tracking-[-0.04em]
                text-ink

                sm:text-5xl
                md:text-6xl
                lg:text-[4.5rem]
              "
            >
              From exploring
              <br />
              <span className="text-moss">to owning.</span>
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-sm
              leading-6
              text-ink/50

              md:text-base
              md:leading-7
            "
          >
            A simple, transparent process designed to make land investment
            easier, clearer, and more accessible.
          </p>
        </div>

        {/* =====================================================
            PROCESS GRID
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            border-t
            border-l
            border-line

            sm:grid-cols-2

            lg:mt-24
            lg:grid-cols-4
          "
        >
          {investmentSteps.map((step, index) => (
            <article
              key={step.step}
              className={cn(
                `
                  group
                  relative
                  min-h-[420px]
                  border-line
                  px-6
                  py-8

                  sm:min-h-[450px]
                  sm:px-7
                  sm:py-10

                  lg:min-h-[500px]
                  lg:px-8
                  lg:py-10
                `,

                /*
                 * Desktop vertical borders
                 */

                index !== 0 && "sm:border-l border-l ",

                /*
                 * Mobile / tablet borders
                 */

                index === 2 && "sm:border-l-0 lg:border-l",

                index >= 2 && "border-t sm:border-t",

                index === 1 && "lg:border-t-0 lg:border-l",

                index === 2 && "lg:border-t-0",

                index === 3 && "lg:border-t-0 border-r",
              )}
            >              
              {/* =================================================
                  GIANT BACKGROUND NUMBER
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-5
                  top-5
                  select-none
                "
              >
                <span
                  className="
                    font-display
                    text-[7rem]
                    font-medium
                    leading-none
                    tracking-[-0.08em]
                    text-moss/[0.06]

                    md:text-[8rem]
                    lg:text-[9rem]
                  "
                >
                  {padStep(step.step)}
                </span>
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  mt-24

                  md:mt-28
                  lg:mt-32
                "
              >
                {/* Small line */}

                <div
                  className="
                    mb-6
                    h-px
                    w-10
                    bg-moss
                  "
                />

                {/* Title */}

                <h3
                  className="
                    max-w-[260px]
                    font-display
                    text-2xl
                    font-medium
                    leading-[1.08]
                    tracking-[-0.025em]
                    text-ink

                    md:text-3xl
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-[280px]
                    text-sm
                    leading-6
                    text-ink/55

                    md:text-[15px]
                    md:leading-7
                  "
                >
                  {step.description}
                </p>
              </div>

              {/* =================================================
                  BOTTOM
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-8
                  left-6
                  right-6

                  md:left-7
                  md:right-7

                  lg:left-8
                  lg:right-8
                "
              >
                <div className="flex items-center justify-between border-t border-line pt-4">
                  <span
                    className="
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-ink/30
                    "
                  >
                    Investment Journey
                  </span>

                  <span
                    className="
                      font-display
                      text-xs
                      text-ink/25
                    "
                  >
                    {padStep(step.step)}
                    <span className="mx-1">/</span>
                    {padStep(investmentSteps.length)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            BOTTOM TRUST LINE
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-line
            pt-6

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p
            className="
              text-xs
              uppercase
              tracking-[0.14em]
              text-ink/35
            "
          >
            Simple process. Clear ownership.
          </p>

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-moss" />

            <span
              className="
                text-xs
                text-ink/40
              "
            >
              4 simple steps
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
