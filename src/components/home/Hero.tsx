"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";

import {
  gsap,
  EASE,
  prefersReducedMotion,
} from "@/lib/animations/gsap";

import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";

interface HeroSlide {
  image: string;
  alt: string;
  headline: [string, string];
  description: string;
}

const SLIDES: HeroSlide[] = [
  {
    image:
      "https://picsum.photos/seed/jamland-hero-1/2400/1500",
    alt: "Aerial view of open land at golden hour",
    headline: ["Invest in land.", "Build your future."],
    description:
      "Discover strategic land investment opportunities through accessible shared ownership.",
  },
  {
    image:
      "https://picsum.photos/seed/jamland-hero-2/2400/1500",
    alt: "Surveyed land plots ready for development",
    headline: ["Verified title.", "Real ownership."],
    description:
      "Every project is independently verified before it's ever listed for investment.",
  },
  {
    image:
      "https://picsum.photos/seed/jamland-hero-3/2400/1500",
    alt: "A Jamland project site under a wide open sky",
    headline: ["Fixed-price shares.", "Full transparency."],
    description:
      "Share pricing, availability, and progress are disclosed in full, from day one.",
  },
  {
    image:
      "https://picsum.photos/seed/jamland-hero-4/2400/1500",
    alt: "Land marked and ready for a new Jamland project",
    headline: ["Built to last.", "Not to speculate."],
    description:
      "Land projects designed to appreciate over years — patient investing, done properly.",
  },
];

const SLIDE_INTERVAL = 3000;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  const indexRef = useRef(0);
  const animatingRef = useRef(false);

  const timerRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * =========================================================
   * GO TO NEXT SLIDE
   * =========================================================
   *
   * The image itself NEVER slides horizontally.
   *
   * Instead:
   *
   * - Next image sits in exactly the same position.
   * - clip-path reveals it.
   * - Image moves slightly underneath the mask.
   * - Text transitions at the same time.
   */
  function goToNext() {
    if (animatingRef.current) return;
    if (prefersReducedMotion()) return;

    const root = rootRef.current;

    if (!root) return;

    const current = indexRef.current;
    const next = (current + 1) % SLIDES.length;

    const currentImage = root.querySelector<HTMLElement>(
      `[data-hero-slide-image="${current}"]`
    );

    const nextImage = root.querySelector<HTMLElement>(
      `[data-hero-slide-image="${next}"]`
    );

    const currentText = root.querySelector<HTMLElement>(
      `[data-hero-slide-text="${current}"]`
    );

    const nextText = root.querySelector<HTMLElement>(
      `[data-hero-slide-text="${next}"]`
    );

    if (
      !currentImage ||
      !nextImage ||
      !currentText ||
      !nextText
    ) {
      return;
    }

    const currentParallax =
      currentImage.querySelector<HTMLElement>(
        "[data-hero-slide-parallax]"
      );

    const nextParallax =
      nextImage.querySelector<HTMLElement>(
        "[data-hero-slide-parallax]"
      );

    const nextLines =
      nextText.querySelectorAll<HTMLElement>(
        "[data-line-reveal]"
      );

    if (!currentParallax || !nextParallax) {
      return;
    }

    animatingRef.current = true;

    /**
     * -------------------------------------------------------
     * ACTIVATE NEXT SLIDE
     * -------------------------------------------------------
     */

    nextImage.dataset.active = "true";
    nextText.dataset.active = "true";

    /**
     * Next image starts completely hidden.
     */
    gsap.set(nextImage, {
      zIndex: 2,
      clipPath: "inset(0 100% 0 0)",
    });

    /**
     * Initial parallax position.
     */
    gsap.set(nextParallax, {
      "--parallax-scale": 1.18,
      "--parallax-x": "-7%",
    });

    /**
     * Next text starts invisible and slightly below.
     */
    gsap.set(nextText, {
      opacity: 0,
      y: 20,
    });

    /**
     * Hide next text lines.
     */
    gsap.set(nextLines, {
      "--line-y": "110%",
    });

    /**
     * -------------------------------------------------------
     * MAIN TIMELINE
     * -------------------------------------------------------
     */

    const tl = gsap.timeline({
      onComplete: () => {
        /**
         * Disable old slide.
         */
        currentImage.dataset.active = "false";
        currentText.dataset.active = "false";

        /**
         * Reset old image.
         */
        gsap.set(currentImage, {
          zIndex: 0,
          clipPath: "inset(0 0% 0 0)",
        });

        /**
         * Make next image the active background.
         */
        gsap.set(nextImage, {
          zIndex: 1,
          clipPath: "inset(0 0% 0 0)",
        });

        /**
         * Final parallax state.
         */
        gsap.set(nextParallax, {
          "--parallax-scale": 1.08,
          "--parallax-x": "0%",
        });

        /**
         * Update index.
         */
        indexRef.current = next;

        animatingRef.current = false;
      },
    });

    /**
     * =======================================================
     * IMAGE REVEAL
     * =======================================================
     */

    tl.to(
      nextImage,
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: EASE.inOutQuart,
      },
      0
    )

      /**
       * =====================================================
       * IMAGE PARALLAX
       * =====================================================
       *
       * The actual image moves underneath the reveal.
       */
      .to(
        nextParallax,
        {
          "--parallax-scale": 1.08,
          "--parallax-x": "0%",
          duration: 1.8,
          ease: EASE.inOutQuart,
        },
        0
      )

      /**
       * =====================================================
       * CURRENT IMAGE
       * =====================================================
       *
       * Subtle zoom out.
       *
       * No horizontal slide.
       */
      .to(
        currentParallax,
        {
          "--parallax-scale": 1.02,
          duration: 1.5,
          ease: EASE.inOutQuart,
        },
        0
      )

      /**
       * =====================================================
       * OLD TEXT
       * =====================================================
       */
      .to(
        currentText,
        {
          opacity: 0,
          y: -15,
          duration: 0.45,
          ease: EASE.out,
        },
        0.15
      )

      /**
       * =====================================================
       * NEW TEXT
       * =====================================================
       */
      .to(
        nextText,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: EASE.outExpo,
        },
        0.55
      )

      /**
       * =====================================================
       * TEXT LINE REVEAL
       * =====================================================
       */
      .to(
        nextLines,
        {
          "--line-y": "0%",
          duration: 0.8,
          stagger: 0.1,
          ease: EASE.outExpo,
        },
        0.62
      );
  }

  /**
   * =========================================================
   * STOP TIMER
   * =========================================================
   *
   * Used only when browser tab is hidden.
   *
   * Mouse hover DOES NOT stop slider.
   */
  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  /**
   * =========================================================
   * START TIMER
   * =========================================================
   */

  function startTimer() {
    stopTimer();

    if (prefersReducedMotion()) {
      return;
    }

    timerRef.current = setInterval(
      goToNext,
      SLIDE_INTERVAL
    );
  }

  /**
   * =========================================================
   * INITIAL HERO ANIMATION
   * =========================================================
   */

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) return;

      const eyebrow =
        root.querySelector<HTMLElement>(
          "[data-hero-eyebrow]"
        );

      const ctas =
        root.querySelector<HTMLElement>(
          "[data-hero-ctas]"
        );

      const scrollIndicator =
        root.querySelector<HTMLElement>(
          "[data-hero-scroll]"
        );

      const firstImage =
        root.querySelector<HTMLElement>(
          '[data-hero-slide-image="0"]'
        );

      const firstParallax =
        firstImage?.querySelector<HTMLElement>(
          "[data-hero-slide-parallax]"
        ) ?? null;

      const firstLines =
        root.querySelectorAll<HTMLElement>(
          '[data-hero-slide-text="0"] [data-line-reveal]'
        );

      if (prefersReducedMotion()) {
        return;
      }

      /**
       * Initial image scale.
       */
      gsap.set(firstParallax, {
        "--parallax-scale": 1.18,
        "--parallax-x": "0%",
      });

      /**
       * Initial animation timeline.
       */
      gsap
        .timeline({
          defaults: {
            ease: EASE.outExpo,
          },
        })

        /**
         * Slow image settle.
         */
        .to(
          firstParallax,
          {
            "--parallax-scale": 1.08,
            duration: 2,
            ease: EASE.inOutQuart,
          },
          0
        )

        /**
         * Eyebrow.
         */
        .to(
          eyebrow,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          0.4
        )

        /**
         * Headline.
         */
        .to(
          firstLines,
          {
            "--line-y": "0%",
            duration: 0.9,
            stagger: 0.12,
            ease: EASE.outExpo,
          },
          0.55
        )

        /**
         * CTA.
         */
        .to(
          ctas,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          1.15
        )

        /**
         * Scroll indicator.
         */
        .to(
          scrollIndicator,
          {
            opacity: 1,
            duration: 0.6,
          },
          1.6
        );
    },
    {
      scope: rootRef,
    }
  );

  /**
   * =========================================================
   * AUTOPLAY
   * =========================================================
   *
   * Slider keeps running even when mouse is over it.
   *
   * Only pauses when browser tab becomes hidden.
   */
  useEffect(() => {
    startTimer();

    function handleVisibility() {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      stopTimer();

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex h-svh min-h-[46rem] w-full items-end overflow-hidden bg-ink text-paper"
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            data-hero-slide
            data-hero-slide-image={i}
            data-active={i === 0}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: i === 0 ? 1 : 0,
              clipPath:
                i === 0
                  ? "inset(0 0% 0 0)"
                  : "inset(0 100% 0 0)",
            }}
          >
            {/* =================================================
                PARALLAX IMAGE
                ================================================= */}

            <div
              data-hero-slide-parallax
              className="absolute inset-[-6%]"
              style={
                {
                  "--parallax-scale": 1.08,
                  "--parallax-x": "0%",
                  transform:
                    "translate3d(var(--parallax-x), 0, 0) scale(var(--parallax-scale))",
                  willChange: "transform",
                } as CSSProperties
              }
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        {/* =====================================================
            CINEMATIC OVERLAY
            ===================================================== */}

        <div className="pointer-events-none absolute inset-0 z-[5]">
          {/* Overall image darkening */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Bottom darkness for white text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Left-side subtle darkness */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <Container wide className="relative z-10 pb-20 pt-40 md:pb-28">
        <div className="max-w-4xl">
          {/* =================================================
              EYEBROW
              ================================================= */}

          <span
            data-hero-eyebrow
            data-reveal
            style={
              {
                "--reveal-y": "12px",
              } as CSSProperties
            }
            className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] md:text-sm"
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-current opacity-60"
            />

            Shared-Ownership Land Investment
          </span>

          {/* =================================================
              SLIDE TEXT
              ================================================= */}

          <div className="grid">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.image}
                data-hero-slide
                data-hero-slide-text={i}
                data-active={i === 0}
                className="[grid-area:1/1]"
                style={{
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {/* =========================================
                    HEADLINE
                    ========================================= */}

                <h1 className="font-display text-4xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  {slide.headline.map((line) => (
                    <span
                      key={line}
                      className="block overflow-hidden"
                    >
                      <span
                        data-line-reveal
                        className="block"
                        style={
                          {
                            "--line-y":
                              i === 0 ? "0%" : "110%",
                          } as CSSProperties
                        }
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                </h1>

                {/* =========================================
                    DESCRIPTION
                    ========================================= */}

                <span className="block max-w-lg overflow-hidden">
                  <span
                    data-line-reveal
                    className="mt-8 block text-base text-paper/80 md:text-lg"
                    style={
                      {
                        "--line-y":
                          i === 0 ? "0%" : "110%",
                      } as CSSProperties
                    }
                  >
                    {slide.description}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* =================================================
              CTA
              ================================================= */}

          <div
            data-hero-ctas
            data-reveal
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton>
              <ButtonLink
                href="/projects"
                size="lg"
                icon
              >
                Explore Projects
              </ButtonLink>
            </MagneticButton>

            <ButtonLink
              href="/how-it-works"
              variant="inverse"
              size="lg"
            >
              How It Works
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* =====================================================
          SCROLL INDICATOR
          ===================================================== */}

      <div
        data-hero-scroll
        data-reveal
        style={
          {
            "--reveal-y": "0px",
          } as CSSProperties
        }
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <span className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-paper/70">
          Scroll

          <ChevronDown className="size-4 motion-safe:animate-bounce" />
        </span>
      </div>
    </section>
  );
}