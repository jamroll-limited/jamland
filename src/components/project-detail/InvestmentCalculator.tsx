"use client";

import { Minus, Plus } from "lucide-react";
import { useInvestmentSelection } from "@/components/project-detail/InvestmentSelectionContext";
import { IconButton } from "@/components/ui/IconButton";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function InvestmentCalculator() {
  const {
    project,
    shares,
    setShares,
    increment,
    decrement,
    total,
    canIncrement,
    canDecrement,
    maxSelectable,
    soldOut,
  } = useInvestmentSelection();

  return (
    <div className="border border-line-strong p-8 md:p-10">
      <Eyebrow className="text-moss">Investment Calculator</Eyebrow>

      {soldOut ? (
        <p className="mt-6 text-ink/70">
          This project is fully subscribed. Explore our other available projects.
        </p>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <label htmlFor="shares-input" className="block text-sm text-ink/60">
                Number of Shares
              </label>
              <div className="mt-3 flex items-center gap-4">
                <IconButton
                  icon={<Minus className="size-4" />}
                  label="Decrease shares"
                  onClick={decrement}
                  disabled={!canDecrement}
                />
                <input
                  id="shares-input"
                  type="number"
                  inputMode="numeric"
                  value={shares}
                  min={project.minSharesPerInvestor}
                  max={maxSelectable}
                  onChange={(event) => setShares(Number(event.target.value) || 0)}
                  className="w-16 border-0 bg-transparent text-center font-display text-2xl font-medium focus:outline-none"
                />
                <IconButton
                  icon={<Plus className="size-4" />}
                  label="Increase shares"
                  onClick={increment}
                  disabled={!canIncrement}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-ink/60">Price Per Share</p>
              <p className="mt-1 font-display text-2xl font-medium">
                {formatCurrency(project.pricePerShare)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
            <span className="text-sm text-ink/60">Total Investment</span>
            <span className="font-display text-3xl font-medium md:text-4xl">
              {formatCurrency(total)}
            </span>
          </div>

          <ButtonLink
            href={`/contact?project=${project.slug}&shares=${shares}`}
            variant="primary"
            size="lg"
            icon
            className="mt-8 w-full"
          >
            Continue Investment
          </ButtonLink>

          <p className="mt-4 text-xs text-ink/45">
            {formatNumber(maxSelectable)} shares available to you · min{" "}
            {formatNumber(project.minSharesPerInvestor)}, max{" "}
            {formatNumber(project.maxSharesPerInvestor)} per investor.
          </p>
        </>
      )}
    </div>
  );
}
