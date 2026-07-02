import React from 'react';
import { Metadata } from 'next';
import { siteMetadata } from './metadata';
import { getDualJsonLd } from './jsonld';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getDualJsonLd();

  return (
    <html lang="en">
      <head>
        {/* Dynamic JSON-LD script injection */}
        <script
          id="json-ld-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
