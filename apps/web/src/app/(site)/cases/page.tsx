import { CasesExplorer } from '../../../components/cases';
import { getCases } from '../../../lib/api';
import type { CaseListResult } from '../../../lib/api';

const SUPPORTED_CATEGORIES = ['MY_SKLAD', 'BITRIX24', 'TELEPHONY'] as const;
type ServiceCategoryFilter = (typeof SUPPORTED_CATEGORIES)[number];

type CasesPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export const metadata = {
  title: 'Кейсы — TB Group',
  description: 'Кейсы внедрения Мой Склад, Bitrix24 и корпоративной телефонии. Реальные результаты и отзывы клиентов TB Group.',
  alternates: {
    languages: {
      'ru-RU': '/cases',
      'en-US': '/en/cases', // Future English version
    },
  },
  openGraph: {
    title: 'Кейсы — TB Group',
    description: 'Кейсы внедрения Мой Склад, Bitrix24 и корпоративной телефонии. Реальные результаты и отзывы клиентов TB Group.',
    type: 'website',
    url: 'https://tb-group.kz/cases',
    images: [
      {
        url: '/api/og?type=case&title=Кейсы TB Group&description=Реальные результаты внедрения облачных решений',
        width: 1200,
        height: 630,
        alt: 'Кейсы TB Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Кейсы — TB Group',
    description: 'Кейсы внедрения Мой Склад, Bitrix24 и корпоративной телефонии. Реальные результаты и отзывы клиентов TB Group.',
    images: ['/api/og?type=case&title=Кейсы TB Group&description=Реальные результаты внедрения облачных решений'],
  },
};

const normalizeCategory = (raw: unknown): ServiceCategoryFilter | null => {
  if (typeof raw !== 'string') {
    return null;
  }
  const upper = raw.toUpperCase();
  return SUPPORTED_CATEGORIES.includes(upper as ServiceCategoryFilter)
    ? (upper as ServiceCategoryFilter)
    : null;
};

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const category = normalizeCategory(searchParams?.category);
  const search = typeof searchParams?.search === 'string' ? searchParams.search : '';

  const initialData = await getCases({
    category: category ?? undefined,
    search: search ? search : undefined,
  }).catch<CaseListResult>(() => ({
    items: [],
    nextCursor: null,
  }));

  return (
    <div className="section">
      <CasesExplorer
        initialData={initialData}
        initialFilters={{ category, search: search || null }}
      />
    </div>
  );
}
