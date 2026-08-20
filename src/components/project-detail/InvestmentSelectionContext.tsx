"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Project } from "@/types/project";
import { getRemainingShares } from "@/lib/projects";
import { clamp } from "@/lib/utils";

interface InvestmentSelectionValue {
  project: Project;
  shares: number;
  setShares: (value: number) => void;
  increment: () => void;
  decrement: () => void;
  total: number;
  maxSelectable: number;
  canIncrement: boolean;
  canDecrement: boolean;
  soldOut: boolean;
}

const InvestmentSelectionContext = createContext<InvestmentSelectionValue | null>(null);

interface InvestmentSelectionProviderProps {
  project: Project;
  children: ReactNode;
}

/**
 * Owns the selected share count for a project detail page so the inline
 * calculator, the desktop sticky panel, and the mobile bottom bar all stay
 * in sync without duplicating the increment/clamp/total logic three times.
 */
export function InvestmentSelectionProvider({
  project,
  children,
}: InvestmentSelectionProviderProps) {
  const remaining = getRemainingShares(project);
  const soldOut = remaining <= 0 || project.status === "sold-out";
  const maxSelectable = soldOut
    ? 0
    : Math.max(Math.min(project.maxSharesPerInvestor, remaining), project.minSharesPerInvestor);

  const [shares, setSharesState] = useState(() =>
    soldOut ? 0 : Math.min(project.minSharesPerInvestor, maxSelectable)
  );

  const value = useMemo<InvestmentSelectionValue>(() => {
    const setShares = (nextValue: number) => {
      if (soldOut) return;
      setSharesState(clamp(nextValue, project.minSharesPerInvestor, maxSelectable));
    };

    return {
      project,
      shares,
      setShares,
      increment: () => setShares(shares + 1),
      decrement: () => setShares(shares - 1),
      total: shares * project.pricePerShare,
      maxSelectable,
      canIncrement: !soldOut && shares < maxSelectable,
      canDecrement: !soldOut && shares > project.minSharesPerInvestor,
      soldOut,
    };
  }, [project, shares, maxSelectable, soldOut]);

  return (
    <InvestmentSelectionContext.Provider value={value}>
      {children}
    </InvestmentSelectionContext.Provider>
  );
}

export function useInvestmentSelection(): InvestmentSelectionValue {
  const context = useContext(InvestmentSelectionContext);
  if (!context) {
    throw new Error("useInvestmentSelection must be used within an InvestmentSelectionProvider");
  }
  return context;
}
