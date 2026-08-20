import type { LocationPoint as LocationPointData } from "@/types/project";
import { LocationPoint } from "@/components/shared/LocationPoint";
import { cn } from "@/lib/utils";

interface LocationMapProps {
  points: LocationPointData[];
  dark?: boolean;
  className?: string;
}

/** A stylized, non-cartographic map surface — grid streets and a couple of arterial roads — for plotting facility markers. */
export function LocationMap({ points, dark = false, className }: LocationMapProps) {
  const lineColor = dark ? "rgb(246 244 236 / 14%)" : "rgb(14 15 12 / 10%)";
  const roadColor = dark ? "rgb(246 244 236 / 24%)" : "rgb(14 15 12 / 18%)";

  return (
    <div
      className={cn(
        "relative aspect-4/3 w-full overflow-hidden rounded-sm border sm:aspect-16/10",
        dark ? "border-line-on-dark bg-ink-soft" : "border-line bg-paper-dim",
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="jamland-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke={lineColor} strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="url(#jamland-grid)" />
        <path
          d="M -5 20 Q 30 10 55 28 T 105 22"
          fill="none"
          stroke={roadColor}
          strokeWidth="1.1"
        />
        <path
          d="M 15 -5 Q 35 35 25 80"
          fill="none"
          stroke={roadColor}
          strokeWidth="0.9"
        />
        <path
          d="M 78 -5 Q 65 40 90 80"
          fill="none"
          stroke={roadColor}
          strokeWidth="0.9"
        />
      </svg>

      {points.map((point) => (
        <LocationPoint key={point.id} point={point} dark={dark} />
      ))}
    </div>
  );
}
