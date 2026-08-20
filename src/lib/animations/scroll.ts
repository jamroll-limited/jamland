import { gsap, ScrollTrigger } from "./gsap";

interface HorizontalScrollOptions {
  scrub?: number | boolean;
}

/**
 * Pins `container` and translates `track` horizontally as the user scrolls
 * vertically past it — powers the cinematic project showcase on desktop.
 */
export function createHorizontalScroll(
  container: HTMLElement,
  track: HTMLElement,
  opts: HorizontalScrollOptions = {}
) {
  const getDistance = () => track.scrollWidth - container.clientWidth;

  const tween = gsap.to(track, {
    x: () => -getDistance(),
    ease: "none",
  });

  return ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: () => `+=${getDistance()}`,
    pin: true,
    scrub: opts.scrub ?? 1,
    invalidateOnRefresh: true,
    animation: tween,
  });
}

/** Animates a numeric counter from 0 to `value` once `el` enters the viewport. */
export function createCounterTrigger(
  el: Element,
  value: number,
  onUpdate: (current: number) => void,
  opts: { duration?: number } = {}
) {
  const proxy = { value: 0 };
  return ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(proxy, {
        value,
        duration: opts.duration ?? 2,
        ease: "power2.out",
        onUpdate: () => onUpdate(proxy.value),
      });
    },
  });
}

/**
 * Tracks which of a series of step elements sits nearest the viewport
 * center, reporting the active index — powers sticky storytelling sections.
 */
export function createActiveStepTracker(
  steps: Element[],
  onChange: (index: number) => void
) {
  return steps.map((step, index) =>
    ScrollTrigger.create({
      trigger: step,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) onChange(index);
      },
    })
  );
}
