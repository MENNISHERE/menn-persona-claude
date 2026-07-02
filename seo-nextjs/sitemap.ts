import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mennhq.vercel.app';
  const lastModified = new Date();

  // Paths or sections of the portfolio site to be crawled
  const routes = [
    '',
    '#work',
    '#about',
    '#contact'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route ? '/' + route : ''}`,
    lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
