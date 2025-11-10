'use client';

import { motion } from 'framer-motion';
import { Package, Users, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function ServicesOverviewSection() {
  const services = [
    {
      icon: Package,
      title: 'Мой Склад',
      description: 'Автоматизация складского и торгового учета',
      features: [
        'Учет товаров и остатков',
        'Интеграция с 1С',
        'Автоматизация закупок',
        'Мобильное приложение',
      ],
      href: '/services/moy-sklad',
    },
    {
      icon: Users,
      title: 'Битрикс24',
      description: 'CRM система для управления продажами',
      features: [
        'Воронка продаж',
        'Задачи и проекты',
        'Автоматизация процессов',
        'Сайт и магазин',
      ],
      href: '/services/bitrix24',
    },
    {
      icon: Phone,
      title: 'Корпоративная телефония',
      description: 'Современные решения для связи',
      features: [
        'Виртуальная АТС',
        'Интеграция с CRM',
        'Запись разговоров',
        'Аналитика звонков',
      ],
      href: '/services/telephony',
    },
  ];

  return (
    <section className="py-24 bg-slate-950" id="services">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
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
            Наши решения
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Что мы внедряем
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Комплексные решения для автоматизации бизнес-процессов от ведущих разработчиков
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all duration-500 overflow-hidden h-full">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 mb-6">
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 mb-6">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      className="w-full text-blue-400 hover:text-white hover:bg-blue-500/10 group/btn"
                    >
                      Подробнее
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
