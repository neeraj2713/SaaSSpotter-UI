import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DiscoveredTagsProvider } from "@/components/providers/DiscoveredTagsProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SaaSSpotter — Micro-SaaS ideas from real pain points",
  description:
    "Discover validated business pain points and actionable Micro-SaaS ideas. Turn real complaints into your next startup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <QueryProvider>
          <DiscoveredTagsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </DiscoveredTagsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
