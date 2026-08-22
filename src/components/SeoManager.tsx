import { useEffect } from 'react';

interface SeoManagerProps {
  currentPathOrSection: string;
  titleOverride?: string;
  descriptionOverride?: string;
}

export default function SeoManager({
  currentPathOrSection,
  titleOverride,
  descriptionOverride,
}: SeoManagerProps) {
  useEffect(() => {
    // 1. Determine Title and Description based on active path or virtual section
    let title = "Menn | Menn Maestro | MennHq — Digital Creator";
    let description = "Explore original digital products, vision, and projects by Menn Maestro. The official hub of MennHq.";

    const formattedSection = currentPathOrSection.toLowerCase().replace(/[^a-z0-9_-]/g, "");

    switch (formattedSection) {
      case 'work':
      case 'philosophy':
        title = "MENN | Portfolio & Digital Products — Menn Maestro";
        description = "Discover high-performance digital products and minimalist designs handcrafted by MENN Maestro.";
        break;
      case 'about':
        title = "About MENN | The Story & Vision of Menn Maestro";
        description = "Learn more about Abdullah Harun (MENN), a 13-year-old digital product designer and developer turning ideas into results.";
        break;
      case 'contact':
        title = "Contact MENN | Let's Build the Future — Menn Maestro";
        description = "Get in touch with MENN Maestro for software engineering, design, and automation projects.";
        break;
      default:
        title = "Menn | Menn Maestro | MennHq — Digital Creator";
        description = "Explore original digital products, vision, and projects by Menn Maestro. The official hub of MennHq.";
        break;
    }

    // Apply overrides if passed
    if (titleOverride) title = titleOverride;
    if (descriptionOverride) description = descriptionOverride;

    // Update Document Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title & Description for absolute alignment
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // 2. Manage Dynamic Canonical Link (Critical to break the Vercel grouping override)
    // We target the absolute canonical URL, avoiding duplicate indexing.
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    const domain = "https://mennhq.vercel.app";
    // For single page applications, we append the section hash if it is not the home section.
    const path = formattedSection && formattedSection !== 'hero' ? `/#${formattedSection}` : '';
    canonicalLink.setAttribute('href', `${domain}${path}`);

  }, [currentPathOrSection, titleOverride, descriptionOverride]);

  return null; // Side-effect only component
}
