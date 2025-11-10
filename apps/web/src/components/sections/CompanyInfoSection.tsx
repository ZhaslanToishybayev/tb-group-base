'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Award, Clock, CheckCircle } from 'lucide-react';

export function CompanyInfoSection() {
  const features = [
    {
      icon: MapPin,
      title: 'Работаем по всему Казахстану',
      description: 'Офисы в Нур-Султане и Алматы. Выезжаем в любой регион.',
    },
    {
      icon: Users,
      title: 'Команда сертифицированных специалистов',
      description: 'Сертификаты Мой Склад и Битрикс24. Опыт более 5 лет.',
    },
    {
      icon: Award,
      title: 'Официальный партнер',
      description: 'Сертифицированный партнер разработчиков с официальной поддержкой.',
    },
    {
      icon: Clock,
      title: 'Поддержка 24/7',
      description: 'Техническая поддержка и сопровождение после внедрения.',
    },
  ];

  const achievements = [
    '500+ успешных внедрений',
    '99% проектов завершены в срок',
    'Более 100 довольных клиентов',
    'Сертифицированные партнеры',
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900" id="company">
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
            О компании
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            TB Group - лидер внедрения{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              облачных решений
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Мы специализируемся на внедрении и сопровождении Мой Склад, Битрикс24 и корпоративной телефонии
            в Казахстане. Помогаем компаниям автоматизировать бизнес-процессы и повышать эффективность.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements */}
        <motion.div
          className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12 border border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Наши достижения
              </h3>
              <p className="text-slate-300 mb-6">
                За 5 лет работы мы помогли сотням компаний автоматизировать их бизнес-процессы
                и выйти на новый уровень эффективности.
              </p>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-200">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">5+</div>
                  <div className="text-slate-300">лет на рынке</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
