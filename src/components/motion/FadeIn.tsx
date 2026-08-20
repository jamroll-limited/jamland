"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
}

/** A pure opacity fade-in, for elements where a lift would feel like too much (dividers, captions, fine print). */
export function FadeIn(props: FadeInProps) {
  return <Reveal {...props} y={0} />;
}
