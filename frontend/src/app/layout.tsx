import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediaFlow — Fast Media Converter | MP3 & MP4 Downloads",
  description:
    "Convert and download media files to MP3 or MP4 with customizable quality. Free, fast, and secure. No sign-up required.",
  keywords: ["media converter", "MP3", "MP4", "download", "convert", "audio", "video"],
  openGraph: {
    title: "MediaFlow — Fast Media Converter",
    description: "Convert media to MP3 or MP4 instantly. Choose your quality and download.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Animated gradient background */}
        <div className="animated-bg" />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
