'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { CaseStudyCard } from './CaseStudyCard';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  summary: string;
  image: string;
  beforeMetrics: {
    efficiency: string;
    time: string;
    cost: string;
  };
  afterMetrics: {
    efficiency: string;
    time: string;
    cost: string;
  };
  tags: string[];
  slug: string;
  gallery?: string[];
}

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[];
}

// Sample data - replace with real API data
// OPTIMIZED: Using lightweight SVG gradients instead of heavy images
const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Внедрение Мой Склад в ритейле',
    company: 'Торговая сеть "Пятёрочка+"',
    summary: 'Оптимизация складских процессов и автоматизация учёта',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDdmZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDA2YjZkIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTIwIiByPSI4MCIgZmlsbD0iIzRhYmJkNiIgb3BhY2l0eT0iMC4zIi8+CiAgPGNpcmNsZSBjeD0iNjgwIiBjeT0iNDAwIiByPSIxMjAiIGZpbGw9IiM3ZmM5ZjAiIG9wYWNpdHk9IjAuMiIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iMTAwIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+',
    beforeMetrics: {
      efficiency: '45%',
      time: '6 часов/день',
      cost: '250,000 ₽/мес',
    },
    afterMetrics: {
      efficiency: '92%',
      time: '2 часа/день',
      cost: '180,000 ₽/мес',
    },
    tags: ['Мой Склад', 'ERP', 'Автоматизация'],
    slug: 'moy-sklad-retail-case',
    gallery: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM5NmY4ZmEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMjA1MWZhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPHJlY3QgeD0iMTUwIiB5PSIxNTAiIHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiByeD0iNDAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjM1MCIgcj0iMTAwIiBmaWxsPSIjMDA3ZmZmIiBvcGFjaXR5PSIwLjQiLz4KICA8Y2lyY2xlIGN4PSI4MDAiIGN5PSI1MDAiIHI9IjEyMCIgZmlsbD0iIzAwNmI2ZCIgb3BhY2l0eT0iMC4zIi8+CiAgPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMzc4MmY2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iNDAwIiByPSIxNTAiIGZpbGw9IiNlMmU4ZjAiIG9wYWNpdHk9IjAuMyIvPgogIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjQwMCIgcj0iMTAwIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjIiLz4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2E4NTVmNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz4KICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSI0MDAiIHI9IjE4MCIgZmlsbD0iIzAwN2ZmZiIgbm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiIG9wYWNpdHk9IjAuNSIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDAwLDMwMCA2MDAsMzAwIDUwMCw1MDAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMyIvPgogIDwvc3ZnPg==',
    ],
  },
  {
    id: '2',
    title: 'Настройка Битрикс24 для B2B',
    company: 'ТехноСфера ООО',
    summary: 'Цифровизация продаж и автоматизация CRM-процессов',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYzg4NGZjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzkzMzNlYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIvPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iMTIwIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSI0NTAiIHI9IjE1MCIgZmlsbD0iIzAwN2ZmZiIgb3BhY2l0eT0iMC4zIi8+CiAgPHJlY3QgeD0iMzAwIiB5PSIzMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iNDAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogIDwvc3ZnPg==',
    beforeMetrics: {
      efficiency: '38%',
      time: '8 часов/день',
      cost: '320,000 ₽/мес',
    },
    afterMetrics: {
      efficiency: '89%',
      time: '3 часа/день',
      cost: '220,000 ₽/мес',
    },
    tags: ['Битрикс24', 'CRM', 'B2B'],
    slug: 'bitrix24-b2b-case',
    gallery: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ1IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Y5NTllMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkOTc2MDYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz4KICA8cmVjdCB4PSIyMDAiIHk9IjIwMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIHJ4PSI2MCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIxODAiIGZpbGw9IiNlZjQ0NDQiIG9wYWNpdHk9IjAuMiIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDAwLDIwMCA2MDAsMjAwIDUwMCw0MDAiIGZpbGw9IiMwMDdmZmYiIG9wYWNpdHk9IjAuMyIvPgogIDwvc3ZnPg==',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ2IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2E4NTVmNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz4KICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSI0MDAiIHI9IjIwMCIgZmlsbD0iIzEwYjk4MSIgbm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9IjAuNSIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDA1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRMUzwvdGV4dD4KICA8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ3IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFlNDBhZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZTRiOGMiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz4KICA8cmVjdCB4PSI0MDAiIHk9IjIwMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIHJ4PSI2MCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iNDAwIiByPSIxMjAiIGZpbGw9IiNlZjQ0NDQiIG9wYWNpdHk9IjAuMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDAwLDIwMCA2MDAsMjAwIDUwMCw0MDAiIGZpbGw9IiMwMDdmZmYiIG9wYWNpdHk9IjAuMiIvPgogIDwvc3ZnPg==',
    ],
  },
  {
    id: '3',
    title: 'Корпоративная телефония',
    company: 'СтройМастер',
    summary: 'Внедрение IP-телефонии и интеграция с CRM',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDgiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDA2YjZkIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwZjVmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIvPgogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iMTUwIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICA8cmVjdCB4PSI2MDAiIHk9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlMmU4ZjAiIG9wYWNpdHk9IjAuMyIvPgogIDx0ZXh0IHg9IjQwMCIgeT0iMzE1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdvb2Q8L3RleHQ+CiAgPC9zdmc+',
    beforeMetrics: {
      efficiency: '42%',
      time: '7 часов/день',
      cost: '280,000 ₽/мес',
    },
    afterMetrics: {
      efficiency: '85%',
      time: '3 часа/день',
      cost: '190,000 ₽/мес',
    },
    tags: ['Телефония', 'IP', 'Интеграция'],
    slug: 'telephony-integration-case',
    gallery: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ5IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzA2YjZkNCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMGY1ZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz4KICA8cmVjdCB4PSI0MDAiIHk9IjE1MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI1MDAiIHJ4PSI4MCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iNDAwIiByPSIxODAiIGZpbGw9IiNlMmU4ZjAiIG9wYWNpdHk9IjAuMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDAwLDIwMCA2MDAsMjAwIDUwMCw0MDAiIGZpbGw9IiMwMDdmZmYiIG9wYWNpdHk9IjAuMiIvPgogIDwvc3ZnPg==',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxMCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlYjhkNjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTZmOGZhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iNDAwIiByPSIyMDAiIGZpbGw9IiNmZmYiIG5vbmUiIHN0cm9rZT0iIzBhNzJhNyIgc3Ryb2tlLXdpZHRoPSI4IiBvcGFjaXR5PSIwLjUiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjQwNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjM2IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SRUNBTDwvdGV4dD4KICA8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyMDUxZmEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMzc4MmY2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iNDAwIiByPSIxNTAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogIDxjaXJjbGUgY3g9IjgwMCIgY3k9IjQwMCIgcj0iMTEwIiBmaWxsPSIjMDA3ZmZmIiBvcGFjaXR5PSIwLjMiLz4KICA8cmVjdCB4PSI1MDAiIHk9IjMwMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlMmU4ZjAiIG9wYWNpdHk9IjAuMiIvPgogIDwvc3ZnPg==',
    ],
  },
];

export function CaseStudiesSection({ caseStudies = mockCaseStudies }: CaseStudiesSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const allImages = caseStudies.flatMap(cs => cs.gallery || []);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (allImages.length === 0) return;

    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
    } else {
      setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
    }
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    const index = allImages.indexOf(image);
    setCurrentImageIndex(index >= 0 ? index : 0);
  };

  // Sync selectedImage with currentImageIndex
  useEffect(() => {
    if (allImages.length > 0 && selectedImage) {
      setSelectedImage(allImages[currentImageIndex]);
    }
  }, [currentImageIndex, allImages, selectedImage]);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950" id="case-studies">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Кейсы
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Результаты наших клиентов
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Реальные истории успеха и измеримые результаты внедрения наших решений
          </motion.p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={index}
              onImageClick={handleImageSelect}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="/cases"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'cta_click', {
                  button_text: 'Все кейсы',
                  section: 'case_studies',
                });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Все кейсы
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-60 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Case study image"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </motion.div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Предыдущее изображение"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Следующее изображение"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CaseStudiesSection;
