import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  dark?: boolean;
}

export function Divider({ className, dark = false }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-t",
        dark ? "border-line-on-dark" : "border-line",
        className
      )}
    />
  );
}
