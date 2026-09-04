import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://decentpublicschoolrohini.edu.in';

  const routes = [
    '',
    '/about',
    '/academics',
    '/faculty',
    '/facilities',
    '/admissions',
    '/notices',
    '/events',
    '/gallery',
    '/achievements',
    '/downloads',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/notices' || route === '/events' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/admissions' ? 0.9 : 0.8,
  }));
}
