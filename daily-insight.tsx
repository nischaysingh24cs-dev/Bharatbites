import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "BharatBites — Track Every Bite",
    template: "%s | BharatBites"
  },
  description:
    "Discover Indian food, track nutrition, build personalised diet plans and create healthier habits with AI-powered guidance.",
  keywords: [
    "Indian food",
    "calorie tracker",
    "diet planner",
    "nutrition",
    "fitness",
    "BharatBites"
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "BharatBites",
    description: "Track Every Bite. Eat Smart. Stay Healthy.",
    type: "website",
    locale: "en_IN"
  }
};
export const viewport: Viewport = {
  themeColor: "#ff6b00",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#fffdf9] text-ink-950 antialiased dark:bg-ink-950 dark:text-white">
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
