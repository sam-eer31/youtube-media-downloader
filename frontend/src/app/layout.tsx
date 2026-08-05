import type { Metadata } from "next";
import { Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${nunito.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {/* Animated aurora mesh background */}
        <div className="animated-bg" />
        {/* Noise texture overlay */}
        <div className="noise-overlay" />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
