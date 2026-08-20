import type { ProjectStatus } from "@/types/project";
import { cn } from "@/lib/utils";

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  available: {
    label: "Available",
    className: "bg-moss-pale text-moss",
  },
  "selling-fast": {
    label: "Selling Fast",
    className: "bg-brass-light/40 text-brass",
  },
  "sold-out": {
    label: "Sold Out",
    className: "bg-ink/8 text-ink/55",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-paper-dim text-ink/70",
  },
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide",
        config.className,
        className
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
