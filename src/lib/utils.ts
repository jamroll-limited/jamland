import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Formats a Taka amount as `৳50,000`. */
export function formatCurrency(amount: number): string {
  return `৳${Math.round(amount).toLocaleString("en-US")}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** Formats large numbers compactly, e.g. `1200000` -> `1.2M`. */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Zero-pads step/index numbers for editorial numbering, e.g. `1` -> `01`. */
export function padStep(value: number): string {
  return String(value).padStart(2, "0");
}
