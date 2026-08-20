import { getProjectProgress } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectProgressProps {
  soldShares: number;
  totalShares: number;
  className?: string;
  showLabel?: boolean;
}

/** A funded-percentage bar. Progress is always derived, never passed in as a static number. */
export function ProjectProgress({
  soldShares,
  totalShares,
  className,
  showLabel = true,
}: ProjectProgressProps) {
  const progress = getProjectProgress({ soldShares, totalShares });

  return (
    <div className={cn("w-full", className)}>
      <div className="h-[3px] w-full overflow-hidden bg-current/10">
        <div
          className="h-full origin-left bg-current transition-transform duration-700 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-xs uppercase tracking-wide opacity-55">
          {progress.toFixed(1)}% funded
        </p>
      )}
    </div>
  );
}
