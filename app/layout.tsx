import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://groundwork.example.com",
  ),
  title: "Groundwork — Where the wild comes indoors",
  description:
    "A botanical studio in Ottawa. Rare plants raised under glass — grown slow, tended by hand, and sent home with everything they need to thrive.",
  applicationName: "Groundwork",
  keywords: [
    "botanical studio",
    "rare plants",
    "greenhouse",
    "houseplants",
    "Ottawa",
    "Groundwork",
  ],
  openGraph: {
    type: "website",
    siteName: "Groundwork",
    title: "Groundwork — Where the wild comes indoors",
    description:
      "A botanical studio in Ottawa. Rare plants raised under glass, grown slow and tended by hand.",
    images: [{ url: "/frames/poster.jpg", width: 1280, height: 720 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1210",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-forest text-cream">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
