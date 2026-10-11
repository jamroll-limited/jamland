"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/animations/gsap";
import { getFeaturedProjects } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { padStep } from "@/lib/utils";

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const projects = getFeaturedProjects();

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;

      if (!container || !track || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const RELEASE_SPACE = 180;
        const getScrollDistance = () => Math.max(0, track.scrollWidth - container.clientWidth);

        gsap.set(track, { x: 0, force3D: true });

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance() + RELEASE_SPACE}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      const images = Array.from(track.querySelectorAll<HTMLImageElement>("img"));
      const pendingImages = images.filter((img) => !img.complete);
      const loadHandlers: Array<{ img: HTMLImageElement; handler: () => void }> = [];

      if (pendingImages.length > 0) {
        let loaded = 0;

        const handleLoad = () => {
          loaded += 1;
          if (loaded >= pendingImages.length) requestAnimationFrame(() => ScrollTrigger.refresh());
        };

        pendingImages.forEach((img) => {
          img.addEventListener("load", handleLoad, { once: true });
          loadHandlers.push({ img, handler: handleLoad });
        });
      }

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshId);
        loadHandlers.forEach(({ img, handler }) => img.removeEventListener("load", handler));
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink text-paper" aria-label="Project showcase">
      <Container className="pt-20 md:pt-28 lg:pt-28">
        <Eyebrow className="text-brass-light">Project Showcase</Eyebrow>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.05] md:text-5xl lg:text-6xl">
          A closer look at where your investment goes.
        </h2>
      </Container>

      <div ref={containerRef} className="mt-10 overflow-hidden lg:mt-0 lg:h-screen">
        <div ref={trackRef} className="flex flex-col gap-14 pb-20 lg:h-full lg:flex-row lg:items-center lg:gap-10 lg:pb-0 lg:pl-56 lg:pr-56">
          {projects.map((project, index) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group block w-full shrink-0 px-6 md:px-10 lg:w-[52vw] lg:px-0 xl:w-[40vw]">
              <div className="flex items-baseline gap-4 text-brass-light">
                <span className="font-display text-sm">{padStep(index + 1)}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Project</span>
              </div>

              <ParallaxImage
                src={project.heroImage}
                alt={`${project.name} showcase image`}
                width={1600}
                height={842}
                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 52vw, 90vw"
                containerClassName="mt-4 aspect-[1.9/1] rounded-sm"
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="mt-5 flex items-end justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-medium leading-tight md:text-3xl">{project.name}</h3>
                  <p className="mt-1 text-sm text-paper/55">{project.location}</p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-paper/20 transition-all duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}