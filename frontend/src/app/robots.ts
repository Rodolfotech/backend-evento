import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/backend';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/profile', '/create-event', '/panel-g9k2x', '/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
