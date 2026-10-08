import type { Metadata } from "next";
import { Architects_Daughter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SmoothScroll } from "@/components/SmoothScroll";

const architectsDaughter = Architects_Daughter({
  variable: "--font-architects",
  subsets: ["latin"],
  weight: ["400"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio-ovi-aka-obsfusc8",
  description:
    "Architectural blueprint of Md. Farhad Hossain Ovi — Statistics undergrad at SUST, data storyteller, Arduino tinkerer, and builder of slightly ambitious things.",
  keywords: [
    "Farhad Hossain Ovi",
    "Statistics",
    "SUST",
    "Portfolio",
    "Data Analysis",
    "Arduino",
    "Python",
    "R",
    "Bangladesh",
  ],
  authors: [{ name: "Md. Farhad Hossain Ovi" }],
  openGraph: {
    title: "Portfolio-ovi-aka-obsfusc8",
    description:
      "The master plan: a statistics undergrad who believes data tells stories.",
    siteName: "Farhad Hossain Ovi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${architectsDaughter.variable} ${robotoMono.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
