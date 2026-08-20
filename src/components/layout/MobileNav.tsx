"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/animations/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/data/nav";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      const links = panel.querySelectorAll("[data-mobile-link]");

      if (prefersReducedMotion()) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (open) {
        tl.set(panel, { autoAlpha: 1 })
          .fromTo(panel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" })
          .fromTo(links, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }, "-=0.25");
      } else {
        tl.to(panel, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut" }).set(panel, {
          autoAlpha: 0,
        });
      }
    },
    { scope: panelRef, dependencies: [open] }
  );

  return (
    <div
      ref={panelRef}
      className="invisible fixed inset-0 z-40 flex flex-col bg-ink text-paper opacity-0 lg:hidden"
      style={{ clipPath: "inset(0 0 100% 0)" }}
      aria-hidden={!open}
    >
      <nav
        className="flex flex-1 flex-col items-start justify-center gap-2 px-6"
        aria-label="Mobile"
      >
        {primaryNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-mobile-link
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className={cn(
              "font-display text-4xl font-medium tracking-tight transition-opacity",
              pathname === link.href ? "opacity-100" : "opacity-70 hover:opacity-100"
            )}
          >
            {link.label}
          </Link>
        ))}

        <div data-mobile-link className="mt-8">
          <ButtonLink
            href="/projects"
            variant="inverse"
            size="lg"
            icon
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            Explore Projects
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
