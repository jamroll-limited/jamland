import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jamland.com"),
  title: {
    default: "Jamland — Invest in Land. Build Your Future.",
    template: "%s — Jamland",
  },
  description:
    "Jamland is a shared-ownership land investment platform, connecting investors to verified, strategically located land projects across Bangladesh.",
  openGraph: {
    title: "Jamland — Invest in Land. Build Your Future.",
    description:
      "Discover strategic land investment opportunities through accessible shared ownership.",
    siteName: "Jamland",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamland — Invest in Land. Build Your Future.",
    description:
      "Discover strategic land investment opportunities through accessible shared ownership.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-clip-reveal],[data-scale-reveal],[data-line-reveal]{opacity:1 !important;transform:none !important;clip-path:none !important;}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-svh flex-col font-sans">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
