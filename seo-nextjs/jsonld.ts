export const getDualJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mennhq.vercel.app/#website",
        "url": "https://mennhq.vercel.app/",
        "name": "MENN",
        "alternateName": ["Menn Maestro", "MENNISHERE", "MennHq"],
        "description": "Digital product creator and designer specialized in high-performance automation tools.",
        "publisher": {
          "@id": "https://mennhq.vercel.app/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://mennhq.vercel.app/#person",
        "name": "Abdullah Haroon",
        "additionalName": "Menn Maestro",
        "alternateName": ["MENN", "MennHq", "Menn Hq", "MennMaestro", "mennhq", "MENNISHERE"],
        "url": "https://mennhq.vercel.app/",
        "image": "https://mennhq.vercel.app/apple-touch-icon.png",
        "description": "Digital product creator and entrepreneur based in Pakistan, specialized in software development and automation tools.",
        "jobTitle": "Digital Product Creator & Entrepreneur",
        "sameAs": [
          "https://www.wikidata.org/wiki/Q140051161",
          "https://instagram.com/MennHq",
          "https://x.com/MennHq",
          "https://youtube.com/@MennHq",
          "https://tiktok.com/@MennHq",
          "https://medium.com/@MennHq"
        ],
        "knowsAbout": [
          "Software Development",
          "Automation Tools",
          "Digital Product Design",
          "Entrepreneurship"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://mennhq.vercel.app/#localbusiness",
        "name": "MENN Maestro",
        "image": "https://mennhq.vercel.app/apple-touch-icon.png",
        "logo": "https://mennhq.vercel.app/apple-touch-icon.png",
        "url": "https://mennhq.vercel.app/",
        "telephone": "+92-300-0000000",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "MennHq Creator Studio",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "postalCode": "54000",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "31.5204",
          "longitude": "74.3587"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ]
  };
};
