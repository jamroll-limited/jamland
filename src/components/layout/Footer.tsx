import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { company } from "@/data/company";
import { footerNav } from "@/data/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-paper text-ink">
      <Container className="pt-18 md:pt-20 lg:pt-24">
        {/* =====================================================
            TOP FOOTER
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-14

            md:grid-cols-2
            md:gap-16

            lg:grid-cols-12
            lg:gap-x-10
          "
        >
          {/* ===================================================
              BRAND
          =================================================== */}

          <div className="lg:col-span-5">
            <Link
              href="/"
              className="
                inline-block
                font-display
                text-3xl
                font-semibold
                leading-none
                tracking-[-0.04em]
              "
            >
              Jamland.
            </Link>

            <h2
              className="
                mt-8
                max-w-xl
                font-display
                text-3xl
                font-medium
                leading-[1.02]
                tracking-[-0.035em]

                sm:text-4xl
                md:text-[2.75rem]
                lg:text-[3.25rem]
              "
            >
              Invest in land.
              <br />
              <span className="text-moss">
                Own a piece of tomorrow.
              </span>
            </h2>
          </div>

          {/* ===================================================
              CONTACT / NEWSLETTER
          =================================================== */}

          <div className="md:ml-auto md:w-full lg:col-span-4 lg:col-start-9">
            <p
              className="
                max-w-md
                text-sm
                leading-6
                text-ink/65
              "
            >
              Discover verified land opportunities and stay
              informed about new investment projects across
              Bangladesh.
            </p>

            {/* Newsletter */}

            <form className="mt-8">
              <div
                className="
                  flex
                  items-center
                  border-b
                  border-line
                "
              >
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    py-3
                    text-sm
                    text-ink
                    outline-none
                    placeholder:text-ink/35
                  "
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    text-ink/50
                    transition-colors
                    hover:text-moss
                  "
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="
                    mt-0.5
                    size-3.5
                    shrink-0
                    appearance-none
                    border
                    border-ink/30
                    bg-transparent
                    checked:border-moss
                    checked:bg-moss
                  "
                />

                <span className="text-[11px] leading-5 text-ink/40">
                  I agree to receive updates and investment
                  opportunities from Jamland.
                </span>
              </label>
            </form>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div
          className="
            mt-20
            grid
            grid-cols-2
            gap-y-12
            border-t
            border-line
            pt-8

            md:grid-cols-4
            md:gap-x-8
            md:gap-y-0

            
          "
        >
          {footerNav.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="col-span-1"
            >
              {/* Group title */}

              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-ink/35
                "
              >
                {group.title}
              </p>

              {/* Links */}

              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-ink/70
                        transition-colors
                        hover:text-ink
                      "
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        className="
                          size-3
                          opacity-0
                          transition-all
                          duration-200
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:opacity-50
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* ===================================================
              CONTACT
          =================================================== */}

          <div className="col-span-1">
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-ink/35
              "
            >
              Contact
            </p>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={company.phoneHref}
                  className="
                    text-ink/70
                    transition-colors
                    hover:text-ink
                  "
                >
                  {company.phone}
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="
                    text-ink/70
                    transition-colors
                    hover:text-ink
                  "
                >
                  {company.email}
                </a>
              </li>

              <li className="leading-6 text-ink/45">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.city}
              </li>
            </ul>
          </div>
        </div>

        {/* =====================================================
            GIANT BRAND TYPOGRAPHY
        ===================================================== */}

        <div
          className="
            relative
            mt-20
            h-[12vw]
            min-h-[140px]
            max-h-[360px]
            overflow-hidden

            
          "
        >
          <div
            className="
              absolute
              bottom-[-2vw]
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
            "
          >
            <span
              className="
                block
                select-none
                font-display
                text-[22vw]
                font-semibold
                leading-[0.72]
                tracking-[-0.09em]
                text-ink
              "
            >
              Jamland
            </span>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-line
            py-6
            text-[10px]
            uppercase
            tracking-[0.12em]
            text-ink/35

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-ink"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-ink"
            >
              Terms & Conditions
            </Link>

            {company.social.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}