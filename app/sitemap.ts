import importedEntries from '@/lib/sitemap-import.json';
import { MetadataRoute } from 'next';
import { SAUDI_CITIES } from '@/data/regions';
import { PEST_SERVICES } from '@/data/services';
import { SAUDI_PESTS } from '@/data/pests';
import { SAUDI_BLOG_POSTS } from '@/data/blog';

const BASE_URL = 'https://www.mokafahalriyadh.com';

export default function sitemap(): MetadataRoute.Sitemap {


  // 1. Home Page
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  // 2. Services Pages (10 services)
  const servicePages: MetadataRoute.Sitemap = PEST_SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // 3. City Hub Pages (15 cities)
  const cityPages: MetadataRoute.Sitemap = SAUDI_CITIES.map((city) => ({
    url: `${BASE_URL}/city/${city.id}`,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // 4. City + Service High-Intent Combinations (150 landing pages)
  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const city of SAUDI_CITIES) {
    for (const service of PEST_SERVICES) {
      cityServicePages.push({
        url: `${BASE_URL}/city/${city.id}/${service.id}`,
          changeFrequency: 'weekly',
        priority: 0.85
      });
    }
  }

  // 5. Pest Identification Encyclopedia Pages (12 pests)
  const pestPages: MetadataRoute.Sitemap = SAUDI_PESTS.map((pest) => ({
    url: `${BASE_URL}/pests/${pest.id}`,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  // 6. Blog Posts (6+ articles)
  const blogPages: MetadataRoute.Sitemap = SAUDI_BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.75
  }));

  const pages: MetadataRoute.Sitemap = [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...pestPages,
    ...blogPages
  ];
  return applyImportedEntries(pages);
}

// Merge the supplied SEO sheet metadata only into routes that exist in this app.
// New pages continue to be discovered from the site data above.
function applyImportedEntries(pages: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const imported: Record<string, { lastModified: string; priority: number }> = importedEntries;
  return pages.map((page) => {
    const entry = imported[new URL(page.url).pathname];
    return entry ? { ...page, ...entry } : page;
  });
}
