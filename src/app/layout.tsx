import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  organizationJsonLd,
  websiteJsonLd,
  siteNavigationJsonLd,
} from "@/lib/jsonld";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StartMessaging | DLT-Free OTP API for Indian Developers",
    template: "%s | StartMessaging",
  },
  description:
    "Send OTPs via SMS without DLT registration. Pay-as-you-go OTP API at Rs 0.25/OTP. Get started in 5 minutes with a simple REST API and 4-6 digit OTP support.",
  metadataBase: new URL("https://startmessaging.com"),
  keywords: [
    "OTP API",
    "DLT Free OTP",
    "Send OTP India",
    "OTP Service Provider",
    "Developer OTP API",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://startmessaging.com",
    siteName: "StartMessaging",
    title: "StartMessaging | DLT-Free OTP API for Indian Developers",
    description:
      "Send OTPs via SMS without DLT registration. Pay-as-you-go OTP API at Rs 0.25/OTP. Simple, fast, and reliable.",
    images: [
      {
        url: "/api/og?title=StartMessaging&desc=DLT-Free%20OTP%20API%20for%20Indian%20Developers",
        width: 1200,
        height: 630,
        alt: "StartMessaging - DLT-Free OTP API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StartMessaging | DLT-Free OTP API for Indian Developers",
    description:
      "The simplest OTP API for Indian developers. No DLT registration required.",
    images: [
      "/api/og?title=StartMessaging&desc=DLT-Free%20OTP%20API%20for%20Indian%20Developers",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://startmessaging.com",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "StartMessaging Blog RSS" },
      ],
      "application/atom+xml": [
        { url: "/atom.xml", title: "StartMessaging Blog Atom" },
      ],
    },
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationJsonLd()),
          }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
