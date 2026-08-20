"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/project";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  faqs: FaqItem[];
  className?: string;
}

export function FaqAccordion({ faqs, className }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <div className={cn("border-t border-line", className)}>
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div key={faq.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-lg font-medium md:text-xl">{faq.question}</span>
              <Plus
                aria-hidden="true"
                className={cn(
                  "size-5 shrink-0 transition-transform duration-300",
                  open && "rotate-45"
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-ink/65">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
