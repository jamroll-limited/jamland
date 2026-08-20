"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ButtonLink } from "@/components/ui/Button";

const CTA_IMAGE = "https://picsum.photos/seed/jamland-final-cta/2400/1350";

const propertyTags = [
  "Residential",
  "Property Share",
  "Land Investment",
  "Prime Location",
];

export function FinalCta() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-paper
      "
    >
      <Container>
        {/* =====================================================
            MAIN CTA IMAGE
        ===================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl

            md:rounded-[1.5rem]

            lg:rounded-[1.75rem]
          "
        >
          {/* Image */}

          <div
            className="
              relative
              aspect-[16/9]
              min-h-[520px]
              w-full

              md:min-h-[580px]

              lg:aspect-[2/1]
              lg:min-h-[620px]
            "
          >
            <ParallaxImage
              src={CTA_IMAGE}
              alt="Modern property available for investment"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              containerClassName="h-full w-full"
              imageClassName="object-cover"
              parallaxStrength={30}
            />

            {/* Very subtle image overlay */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black/20
                via-transparent
                to-black/10
              "
            />
          </div>

          {/* ===================================================
              PROPERTY TAGS
          =================================================== */}

          <div
            className="
              absolute
              bottom-6
              left-6
              z-20
              flex
              max-w-[calc(100%-2rem)]
              flex-wrap
              gap-2

              md:bottom-8
              md:left-8
              md:max-w-[55%]
            "
          >
            {propertyTags.map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-white/25
                  bg-black/25
                  px-3
                  py-1.5
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-white
                  backdrop-blur-md

                  md:px-4
                  md:py-2
                  md:text-[10px]
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ===================================================
              CONTACT CARD
          =================================================== */}

          <div
            className="
              absolute
              right-5
              top-5
              z-30
              hidden
              w-[320px]
              rounded-2xl
              bg-paper
              p-6
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]

              md:block

              lg:right-8
              lg:top-8
              lg:w-[350px]
              lg:p-7
            "
          >
            <ContactForm
              submitted={submitted}
              onSubmitted={() => setSubmitted(true)}
            />
          </div>
        </div>

        {/* =====================================================
            MOBILE CONTACT CARD
        ===================================================== */}

        <div
          className="
            mt-4
            rounded-2xl
            bg-paper
            p-6
            shadow-[0_12px_40px_rgba(0,0,0,0.08)]

            md:hidden
          "
        >
          <ContactForm
            submitted={submitted}
            onSubmitted={() => setSubmitted(true)}
          />
        </div>

        {/* =====================================================
            HUGE BRAND TYPOGRAPHY
        ===================================================== */}

      
      </Container>
    </section>
  );
}

/* =============================================================
   CONTACT FORM
============================================================= */

function ContactForm({
  submitted,
  onSubmitted,
}: {
  submitted: boolean;
  onSubmitted: () => void;
}) {
  if (submitted) {
    return (
      <div className="flex min-h-[300px] flex-col justify-center">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-moss">
          Thank you
        </span>

        <h3
          className="
            mt-4
            font-display
            text-3xl
            font-medium
            leading-tight
            tracking-[-0.03em]
          "
        >
          We&apos;ll be in touch.
        </h3>

        <p className="mt-4 text-sm leading-6 text-ink/50">
          Your message has been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}

      <div>
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-ink/40
          "
        >
          Start a conversation
        </p>

        <h3
          className="
            mt-2
            font-display
            text-2xl
            font-medium
            tracking-[-0.025em]
          "
        >
          Get In Touch
        </h3>
      </div>

      {/* Form */}

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitted();
        }}
      >
        {/* Name */}

        <div>
          <label htmlFor="cta-name" className="sr-only">
            Full Name
          </label>

          <input
            id="cta-name"
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="
              w-full
              border-b
              border-line
              bg-transparent
              py-3
              text-xs
              text-ink
              outline-none
              transition-colors
              placeholder:text-ink/35
              focus:border-moss
            "
          />
        </div>

        {/* Email */}

        <div>
          <label htmlFor="cta-email" className="sr-only">
            Email
          </label>

          <input
            id="cta-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            className="
              w-full
              border-b
              border-line
              bg-transparent
              py-3
              text-xs
              text-ink
              outline-none
              transition-colors
              placeholder:text-ink/35
              focus:border-moss
            "
          />
        </div>

        {/* Phone */}

        <div>
          <label htmlFor="cta-phone" className="sr-only">
            Phone Number
          </label>

          <input
            id="cta-phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="
              w-full
              border-b
              border-line
              bg-transparent
              py-3
              text-xs
              text-ink
              outline-none
              transition-colors
              placeholder:text-ink/35
              focus:border-moss
            "
          />
        </div>

        {/* Message */}

        <div>
          <label htmlFor="cta-message" className="sr-only">
            Message
          </label>

          <textarea
            id="cta-message"
            name="message"
            rows={2}
            placeholder="How can we help?"
            className="
              w-full
              resize-none
              border-b
              border-line
              bg-transparent
              py-3
              text-xs
              text-ink
              outline-none
              transition-colors
              placeholder:text-ink/35
              focus:border-moss
            "
          />
        </div>

        {/* Submit */}

        <ButtonLink
          href="#"
          size={"sm" as any}
          className="
            mt-2
            w-full
            justify-center
            !rounded-full
          "
          onClick={(event) => {
            event.preventDefault();
            onSubmitted();
          }}
        >
          Submit
        </ButtonLink>
      </form>
    </>
  );
}
