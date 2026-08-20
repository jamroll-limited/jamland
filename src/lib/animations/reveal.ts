import { gsap, EASE, DURATION } from "./gsap";

type Targets = gsap.TweenTarget;

interface TweenOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
}

/** Fades and lifts elements into place. Pairs with the `[data-reveal]` CSS hidden-state. */
export function fadeUpIn(targets: Targets, opts: TweenOptions = {}) {
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: opts.duration ?? DURATION.base,
    delay: opts.delay ?? 0,
    stagger: opts.stagger,
    ease: EASE.outExpo,
    clearProps: "transform",
  });
}

/** Reveals an image/panel by animating a clip-path inset closed. Pairs with `[data-clip-reveal]`. */
export function clipIn(targets: Targets, opts: TweenOptions = {}) {
  return gsap.to(targets, {
    "--clip-y": "0%",
    duration: opts.duration ?? DURATION.slow,
    delay: opts.delay ?? 0,
    stagger: opts.stagger,
    ease: EASE.inOutQuart,
  });
}

/** Settles a slightly oversized image down to its natural scale. Pairs with `[data-scale-reveal]`. */
export function scaleDownIn(targets: Targets, opts: TweenOptions = {}) {
  return gsap.to(targets, {
    "--scale-from": 1,
    duration: opts.duration ?? DURATION.slow,
    delay: opts.delay ?? 0,
    ease: EASE.inOutQuart,
  });
}

/** Staggered fade-up for lists of children (grids, stat rows, nav items). */
export function staggerFadeUp(targets: Targets, opts: TweenOptions = {}) {
  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: opts.duration ?? DURATION.base,
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    ease: EASE.outExpo,
    clearProps: "transform",
  });
}

/** Slides a masked text line up into place. Pairs with `[data-line-reveal]`. */
export function lineUpIn(targets: Targets, opts: TweenOptions = {}) {
  return gsap.to(targets, {
    "--line-y": "0%",
    duration: opts.duration ?? DURATION.base,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0.08,
    ease: EASE.outExpo,
  });
}
