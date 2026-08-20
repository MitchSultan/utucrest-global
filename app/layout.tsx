import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({}),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
