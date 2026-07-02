import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: "Menn | Menn Maestro | MennHq — Digital Creator",
    template: "%s | Menn Maestro"
  },
  description: "Explore original digital products, vision, and projects by Menn Maestro. The official hub of MennHq.",
  keywords: [
    "Menn",
    "Menn Maestro",
    "MennHq",
    "Menn Hq",
    "MENNISHERE",
    "mennhq.vercel.app",
    "digital product creator",
    "software developer",
    "automation tools",
    "Corvette C8",
    "BMW M5 F90"
  ],
  authors: [{ name: "Abdullah Haroon", url: "https://mennhq.vercel.app/" }],
  creator: "Abdullah Haroon",
  publisher: "MENN",
  metadataBase: new URL('https://mennhq.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mennhq.vercel.app/",
    siteName: "MENN",
    title: "Menn | Menn Maestro | MennHq — Digital Creator",
    description: "Explore original digital products, vision, and projects by Menn Maestro. The official hub of MennHq.",
    images: [
      {
        url: "/apple-touch-icon.png", // Or "/Vision & Ambition.png"
        width: 512,
        height: 512,
        alt: "MENN Maestro Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Menn | Menn Maestro | MennHq — Digital Creator",
    description: "Explore original digital products, vision, and projects by Menn Maestro. The official hub of MennHq.",
    creator: "@MennHq",
    images: ["/apple-touch-icon.png"]
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
  },
  manifest: "/site.webmanifest"
};
