import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Pass an array to control exactly where each line breaks. */
  title: string | string[];
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
  theme?: "paper" | "ink";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  eyebrowClassName,
  theme = "paper",
}: SectionHeadingProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className="mb-5">
          <Eyebrow
            className={cn(theme === "ink" ? "text-brass-light" : "text-moss", eyebrowClassName)}
          >
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <TextReveal
        as="h2"
        lines={lines}
        className={cn(
          "font-display text-4xl font-medium md:text-5xl lg:text-6xl",
          titleClassName
        )}
      />
      {description && (
        <Reveal delay={0.15} className="mt-6">
          <p
            className={cn(
              "max-w-xl text-base md:text-lg",
              theme === "ink" ? "text-paper/70" : "text-ink/70",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
