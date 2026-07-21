import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://new-landingpages-test-ui-ai-speednano.vercel.app"),
  title: {
    default: "Nexus One | Korean Web3 Portfolio Investment Reference",
    template: "%s | Nexus One",
  },
  description:
    "Nexus One is a new Korean corporation in formation for Web3 portfolio inheritance, Busan Blockchain Special Zone development, and Thailand blockchain platform operations.",
  keywords: [
    "Nexus One",
    "Busan Blockchain Special Zone",
    "Korean investment",
    "Web3 portfolio",
    "Logiconfire",
    "RealSun",
    "decentralized OTC platform",
    "ILOVEKOREA.AI",
    "Thailand blockchain platform",
  ],
  alternates: {
    canonical: "/",
    languages: {
      ko: "/",
      en: "/?lang=en",
    },
  },
  openGraph: {
    title: "Nexus One | Korean Web3 Portfolio Investment Reference",
    description:
      "Organized diligence surface for Nexus One corporation formation, major Web3 portfolio references, and scheduled investment conditions.",
    url: "https://new-landingpages-test-ui-ai-speednano.vercel.app",
    siteName: "Nexus One",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus One | Korean Web3 Portfolio Investment Reference",
    description:
      "Korean-first investor diligence page for Nexus One, Busan Blockchain Special Zone, and Web3 portfolio operations.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
