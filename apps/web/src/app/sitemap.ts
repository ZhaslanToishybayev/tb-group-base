import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tbgroup.kz';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}`,
          'en-US': `${BASE_URL}/en`, // Future English version
        },
      },
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/about`,
          'en-US': `${BASE_URL}/en/about`,
        },
      },
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/services`,
          'en-US': `${BASE_URL}/en/services`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/moy-sklad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/services/moy-sklad`,
          'en-US': `${BASE_URL}/en/services/moy-sklad`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/bitrix24`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/services/bitrix24`,
          'en-US': `${BASE_URL}/en/services/bitrix24`,
        },
      },
    },
    {
      url: `${BASE_URL}/services/telephony`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/services/telephony`,
          'en-US': `${BASE_URL}/en/services/telephony`,
        },
      },
    },
    {
      url: `${BASE_URL}/cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/cases`,
          'en-US': `${BASE_URL}/en/cases`,
        },
      },
    },
    {
      url: `${BASE_URL}/cases/retail-case`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/cases/retail-case`,
          'en-US': `${BASE_URL}/en/cases/retail-case`,
        },
      },
    },
    {
      url: `${BASE_URL}/cases/metalltech-case`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/cases/metalltech-case`,
          'en-US': `${BASE_URL}/en/cases/metalltech-case`,
        },
      },
    },
    {
      url: `${BASE_URL}/cases/travel-case`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/cases/travel-case`,
          'en-US': `${BASE_URL}/en/cases/travel-case`,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'ru-RU': `${BASE_URL}/contact`,
          'en-US': `${BASE_URL}/en/contact`,
        },
      },
    },
  ];
}
