import { MetadataRoute } from 'next';
import { SAUDI_CITIES } from '@/data/regions';
import { PEST_SERVICES } from '@/data/services';
import { SAUDI_PESTS } from '@/data/pests';
import { SAUDI_BLOG_POSTS } from '@/data/blog';

const BASE_URL = 'https://حصن-المملكة.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Home Page
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];

  // 2. Services Pages (10 services)
  const servicePages: MetadataRoute.Sitemap = PEST_SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // 3. City Hub Pages (15 cities)
  const cityPages: MetadataRoute.Sitemap = SAUDI_CITIES.map((city) => ({
    url: `${BASE_URL}/city/${city.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // 4. City + Service High-Intent Combinations (150 landing pages)
  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const city of SAUDI_CITIES) {
    for (const service of PEST_SERVICES) {
      cityServicePages.push({
        url: `${BASE_URL}/city/${city.id}/${service.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85
      });
    }
  }

  // 5. Pest Identification Encyclopedia Pages (12 pests)
  const pestPages: MetadataRoute.Sitemap = SAUDI_PESTS.map((pest) => ({
    url: `${BASE_URL}/pests/${pest.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  // 6. Blog Posts (6+ articles)
  const blogPages: MetadataRoute.Sitemap = SAUDI_BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...cityServicePages,
    ...pestPages,
    ...blogPages
  ];
}
