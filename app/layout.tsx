import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";
import { Geist, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  ...createMetadata({}),
  verification: {
    google: "eZ2AP1Gjx8cFX0x5jRxPHWU5Dk5NFWEfy3VTyYlEZqw",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full", "font-sans", geist.variable, montserrat.variable)}
    >
      <body className="flex min-h-full flex-col antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
