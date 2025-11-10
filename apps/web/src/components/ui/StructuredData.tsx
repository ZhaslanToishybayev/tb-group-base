'use client';

import React from 'react';

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    email: string;
    contactType: string;
  };
  sameAs: string[];
}

interface ServiceData {
  name: string;
  description: string;
  provider: {
    name: string;
  };
}

interface StructuredDataProps {
  type: 'organization' | 'service' | 'breadcrumb';
  data: any;
}

const ORGANIZATION_JSONLD: OrganizationData = {
  name: 'TB Group',
  url: 'https://tb-group.kz',
  logo: 'https://tb-group.kz/favicon.svg',
  description: 'Официальный партнер Мой Склад и Битрикс24. Внедрение облачных решений для автоматизации бизнеса под ключ в Казахстане.',
  address: {
    streetAddress: 'ул. Назарбаева, 123',
    addressLocality: 'Алматы',
    addressCountry: 'KZ',
  },
  contactPoint: {
    telephone: '+7 (727) 123-45-67',
    email: 'info@tbgroup.kz',
    contactType: 'customer service',
  },
  sameAs: [
    'https://t.me/tbgroup_kz',
    'https://www.instagram.com/tbgroup.kz',
    'https://www.facebook.com/tbgroup.kz',
  ],
};

const SERVICES: ServiceData[] = [
  {
    name: 'Мой Склад',
    description: 'Автоматизация складского и торгового учета с помощью Мой Склад. Учет товаров, остатков, интеграция с 1С.',
    provider: {
      name: 'TB Group',
    },
  },
  {
    name: 'Битрикс24',
    description: 'CRM система для управления продажами. Настройка воронки продаж, задач и автоматизация бизнес-процессов.',
    provider: {
      name: 'TB Group',
    },
  },
  {
    name: 'Корпоративная телефония',
    description: 'Виртуальная АТС, интеграция с CRM, запись разговоров, аналитика звонков.',
    provider: {
      name: 'TB Group',
    },
  },
];

export function StructuredData({ type, data }: StructuredDataProps) {
  const getJsonLd = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          ...data,
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          ...data,
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          ...data,
        };

      default:
        return null;
    }
  };

  const jsonLd = getJsonLd();

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Organization structured data component
export function OrganizationSchema() {
  return <StructuredData type="organization" data={ORGANIZATION_JSONLD} />;
}

// Services structured data component
export function ServicesSchema() {
  return (
    <>
      {SERVICES.map((service, index) => (
        <StructuredData
          key={index}
          type="service"
          data={{
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: service.provider.name,
            },
            areaServed: 'KZ',
          }}
        />
      ))}
    </>
  );
}

// Breadcrumb structured data component
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData type="breadcrumb" data={breadcrumbData} />;
}
