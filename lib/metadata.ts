import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const pageDescription = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      locale: "en_KE",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1149,
          height: 609,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: url,
    },
  };
}
