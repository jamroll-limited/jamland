"use client";

import { useInvestmentSelection } from "@/components/project-detail/InvestmentSelectionContext";
import { ButtonLink } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

/** Mobile/tablet equivalent of the sticky sidebar — a fixed bottom bar. */
export function MobileInvestBar() {
  const { project, shares, total, soldOut } = useInvestmentSelection();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-4 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50">
            {soldOut ? "Status" : `${shares} share${shares === 1 ? "" : "s"}`}
          </p>
          <p className="font-display text-lg font-medium">
            {soldOut ? "Sold Out" : formatCurrency(total)}
          </p>
        </div>
        {soldOut ? (
          <ButtonLink href="/projects" variant="primary">
            Browse Projects
          </ButtonLink>
        ) : (
          <ButtonLink href={`/contact?project=${project.slug}&shares=${shares}`} variant="primary">
            Invest Now
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
