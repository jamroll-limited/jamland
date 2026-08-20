"use client";

import { Minus, Plus } from "lucide-react";
import { useInvestmentSelection } from "@/components/project-detail/InvestmentSelectionContext";
import { IconButton } from "@/components/ui/IconButton";
import { ButtonLink } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

/** Desktop-only sticky sidebar — a condensed, always-visible version of the investment calculator. */
export function StickyInvestPanel() {
  const {
    project,
    shares,
    increment,
    decrement,
    total,
    canIncrement,
    canDecrement,
    soldOut,
  } = useInvestmentSelection();

  return (
    <aside className="border border-line-strong p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/50">Invest In</p>
      <h3 className="mt-2 font-display text-2xl font-medium">{project.name}</h3>

      <p className="mt-6 font-display text-3xl font-medium">
        {formatCurrency(project.pricePerShare)}
      </p>
      <p className="text-sm text-ink/55">per share</p>

      {soldOut ? (
        <p className="mt-6 border-t border-line pt-6 text-sm text-ink/60">
          Fully subscribed — no shares remaining.
        </p>
      ) : (
        <>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
            <span className="text-sm text-ink/60">Shares</span>
            <div className="flex items-center gap-3">
              <IconButton
                icon={<Minus className="size-4" />}
                label="Decrease shares"
                onClick={decrement}
                disabled={!canDecrement}
              />
              <span className="w-6 text-center font-display text-lg font-medium">{shares}</span>
              <IconButton
                icon={<Plus className="size-4" />}
                label="Increase shares"
                onClick={increment}
                disabled={!canIncrement}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm text-ink/60">Total</span>
            <span className="font-display text-xl font-medium">{formatCurrency(total)}</span>
          </div>

          <ButtonLink
            href={`/contact?project=${project.slug}&shares=${shares}`}
            variant="primary"
            size="lg"
            className="mt-6 w-full"
          >
            Invest Now
          </ButtonLink>
        </>
      )}
    </aside>
  );
}
