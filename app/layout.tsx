import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nanocapital-payment-commerce.anantasuk.chatgpt.site"),
  title: {
    default: "NanoCapital | Payment and Commerce Solutions",
    template: "%s | NanoCapital",
  },
  description:
    "NanoCapital builds Korean-first payment platforms, shopping mall systems, custom software, AI integrations, and blockchain infrastructure for companies that need clear commercial terms.",
  keywords: [
    "NanoCapital",
    "Pay Solution",
    "Shopping Mall Solution",
    "USDT payment integration",
    "custom software development",
    "FinTech platform",
    "blockchain infrastructure",
    "enterprise commerce",
  ],
  alternates: {
    canonical: "/",
    languages: {
      ko: "/",
      en: "/?lang=en",
    },
  },
  openGraph: {
    title: "NanoCapital | Payment and Commerce Solutions",
    description:
      "Launch payment and commerce platforms with proven technology, transparent commercial terms, and fast custom development.",
    url: "https://nanocapital-payment-commerce.anantasuk.chatgpt.site",
    siteName: "NanoCapital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NanoCapital | Payment and Commerce Solutions",
    description:
      "Premium payment, commerce, AI, and blockchain software development for enterprise teams and business partners.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
