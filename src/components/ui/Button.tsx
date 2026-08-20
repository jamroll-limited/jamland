import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xs font-medium uppercase tracking-wide transition-colors duration-300 ease-out disabled:pointer-events-none disabled:opacity-40";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-moss",
  secondary: "border text-ink border-line-strong hover:border-ink bg-transparent",
  ghost: "text-ink hover:text-moss px-0",
  /** For use over dark hero imagery, e.g. the header CTA before scroll. */
  inverse: "border border-paper/40 text-paper hover:bg-paper hover:text-ink",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-xs md:text-sm",
  lg: "px-8 py-4 text-sm md:text-base",
};

interface ButtonStyleProps { 
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps): string {
  return cn(
    baseClasses,
    variant !== "ghost" && sizeClasses[size],
    variantClasses[variant],
    className
  );
}

interface ButtonProps
  extends ButtonStyleProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean;
  children: ReactNode;
}

/** Native `<button>` — use for calculator controls, form submits, and other in-page actions. */
export function Button({
  variant,
  size,
  icon = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {icon && <ArrowUpRight aria-hidden="true" className="size-4" />}
    </button>
  );
}

interface ButtonLinkProps
  extends ButtonStyleProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  icon?: boolean;
  children: ReactNode;
}

/** `next/link`-backed button — use for navigational CTAs. */
export function ButtonLink({
  href,
  variant,
  size,
  icon = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {icon && <ArrowUpRight aria-hidden="true" className="size-4" />}
    </Link>
  );
}
