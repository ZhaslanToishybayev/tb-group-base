import { motion } from 'framer-motion';
import { CompanyStory, TeamGrid, type StoryParagraph, type Milestone, type TeamMember } from '../../../components/content';
import AboutPageClient from './AboutPageClient';

// Server Component - exports metadata
export async function generateMetadata() {
  return {
    title: 'О компании — TB Group',
    description: 'TB Group — эксперты по внедрению Мой Склад, Bitrix24 и корпоративной телефонии в Казахстане. Команда с опытом 5+ лет, 500+ внедрений.',
    alternates: {
      languages: {
        'ru-RU': '/about',
        'en-US': '/en/about', // Future English version
      },
    },
    openGraph: {
      title: 'О компании — TB Group',
      description: 'TB Group — эксперты по внедрению Мой Склад, Bitrix24 и корпоративной телефонии в Казахстане. Команда с опытом 5+ лет, 500+ внедрений.',
      type: 'website',
      url: 'https://tb-group.kz/about',
      images: [
        {
          url: '/api/og?type=default&title=О компании TB Group&description=Эксперты по внедрению облачных решений в Казахстане',
          width: 1200,
          height: 630,
          alt: 'О компании TB Group',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'О компании — TB Group',
      description: 'TB Group — эксперты по внедрению Мой Склад, Bitrix24 и корпоративной телефонии в Казахстане. Команда с опытом 5+ лет, 500+ внедрений.',
      images: ['/api/og?type=default&title=О компании TB Group&description=Эксперты по внедрению облачных решений в Казахстане'],
    },
  };
}

// Server Component - renders client component
export default function AboutPage() {
  return <AboutPageClient />;
}
