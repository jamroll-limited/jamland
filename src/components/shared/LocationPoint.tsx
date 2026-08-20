"use client";

import { useState } from "react";
import {
  Route,
  HeartPulse,
  GraduationCap,
  Plane,
  Building2,
  BusFront,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import type { FacilityCategory, LocationPoint as LocationPointData } from "@/types/project";
import { cn } from "@/lib/utils";

const categoryIcons: Record<FacilityCategory, LucideIcon> = {
  road: Route,
  hospital: HeartPulse,
  school: GraduationCap,
  airport: Plane,
  commercial: Building2,
  transport: BusFront,
  landmark: Landmark,
};

interface LocationPointProps {
  point: LocationPointData;
  dark?: boolean;
}

/** An animated marker positioned by percentage on a `LocationMap`. Works on tap as well as hover. */
export function LocationPoint({ point, dark = false }: LocationPointProps) {
  const [active, setActive] = useState(false);
  const Icon = categoryIcons[point.category];

  return (
    <button
      type="button"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((value) => !value)}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      aria-label={`${point.label}, ${point.distance} away`}
    >
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-50",
            dark ? "bg-brass-light" : "bg-moss"
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full ring-2",
            dark ? "bg-brass-light ring-ink" : "bg-moss ring-paper"
          )}
        />
      </span>

      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded-xs border px-3 py-1.5 text-left text-xs transition-all duration-200",
          dark
            ? "border-line-on-dark bg-ink/95 text-paper"
            : "border-line bg-paper-raised text-ink shadow-sm",
          active ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        )}
      >
        <span className="flex items-center gap-1.5 font-medium">
          <Icon aria-hidden="true" className="size-3.5" />
          {point.label}
        </span>
        <span className="opacity-60">{point.distance}</span>
      </span>
    </button>
  );
}
