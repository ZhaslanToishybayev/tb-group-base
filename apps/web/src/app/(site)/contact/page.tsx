import Link from 'next/link';
import type { ContactInfo, SocialLink } from '../../../types/contact';
import { SimpleContactForm } from '../../../components/SimpleContactForm';
import { ContactDetails } from '../../../components/ContactDetails';
import { ContactMap } from '../../../components/ContactMap';
import { SocialLinks } from '../../../components/SocialLinks';
import ContactPageClient from './ContactPageClient';

// Server Component - exports metadata
export async function generateMetadata() {
  return {
    title: 'Контакты — TB Group',
    description: 'Связаться с TB Group: телефоны, адреса офисов в Алматы и Нур-Султане. Оставить заявку на консультацию по внедрению Мой Склад или Bitrix24.',
    alternates: {
      languages: {
        'ru-RU': '/contact',
        'en-US': '/en/contact', // Future English version
      },
    },
    openGraph: {
      title: 'Контакты — TB Group',
      description: 'Связаться с TB Group: телефоны, адреса офисов в Алматы и Нур-Султане. Оставить заявку на консультацию по внедрению Мой Склад или Bitrix24.',
      type: 'website',
      url: 'https://tb-group.kz/contact',
      images: [
        {
          url: '/api/og?type=default&title=Контакты TB Group&description=Свяжитесь с нами для консультации по внедрению',
          width: 1200,
          height: 630,
          alt: 'Контакты TB Group',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Контакты — TB Group',
      description: 'Связаться с TB Group: телефоны, адреса офисов в Алматы и Нур-Султане. Оставить заявку на консультацию по внедрению Мой Склад или Bitrix24.',
      images: ['/api/og?type=default&title=Контакты TB Group&description=Свяжитесь с нами для консультации по внедрению'],
    },
  };
}

const defaultContacts: ContactInfo[] = [
  { label: 'Телефон', value: '+7 (700) 123-45-67', href: 'tel:+77001234567' },
  { label: 'Email', value: 'info@tbgroup.kz', href: 'mailto:info@tbgroup.kz' },
  { label: 'Адрес', value: 'г. Алматы, ул. Примерная 1, офис 123', href: null },
];

const defaultSocialLinks: SocialLink[] = [
  { label: 'WhatsApp', href: 'https://wa.me/77001234567', color: '#25D366' },
  { label: 'Telegram', href: 'https://t.me/tbgroup', color: '#0088CC' },
  { label: 'Instagram', href: 'https://instagram.com/tbgroup', color: '#E4405F' },
  { label: 'Bitrix24', href: 'https://tbgroup.bitrix24.kz', color: '#00B0D9' },
];

function parseContactArray(value: unknown, fallback: ContactInfo[]): ContactInfo[] {
  if (!value) {
    return fallback;
  }
  if (Array.isArray(value)) {
    return value as ContactInfo[];
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as ContactInfo[];
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function parseSocialLinksArray(value: unknown, fallback: SocialLink[]): SocialLink[] {
  if (!value) {
    return fallback;
  }
  if (Array.isArray(value)) {
    return value as SocialLink[];
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as SocialLink[];
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

// Server Component - renders client component
export default function ContactPage() {
  return <ContactPageClient />;
}
