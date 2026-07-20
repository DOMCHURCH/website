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
  title: "Groundwork — The cup that earns the morning",
  description:
    "Single-origin roasts, pulled slow, served straight. No syrups. No shortcuts. A specialty coffee roaster in Ottawa.",
  applicationName: "Groundwork",
  keywords: [
    "specialty coffee",
    "single origin",
    "coffee roaster",
    "Ottawa",
    "Groundwork",
  ],
  openGraph: {
    type: "website",
    siteName: "Groundwork",
    title: "Groundwork — The cup that earns the morning",
    description:
      "Single-origin roasts, pulled slow, served straight. No syrups. No shortcuts.",
    images: [{ url: "/hero-poster.jpg", width: 1600, height: 900 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
      <body className="bg-ink text-cream">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
