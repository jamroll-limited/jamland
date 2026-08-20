"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations/gsap";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: "top -72",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  useGSAP(
    () => {
      if (!headerRef.current || prefersReducedMotion()) return;
      gsap.from(headerRef.current, {
        yPercent: -100,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
      });
    },
    { scope: headerRef }
  );

  const solidLight = scrolled && !mobileOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          mobileOpen
            ? "border-transparent bg-ink text-paper"
            : solidLight
              ? "border-line bg-paper/95 text-ink backdrop-blur-md"
              : "border-transparent bg-transparent text-paper"
        )}
      >
        <Container className="flex h-20 items-center justify-between md:h-22">
          <Link href="/" className="font-display text-3xl font-semibold tracking-tight">
            Jamland
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-wide opacity-80 transition-opacity hover:opacity-100",
                  pathname === link.href && "opacity-100"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="/projects" variant={solidLight ? "primary" : "inverse"}>
              Explore Projects
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
