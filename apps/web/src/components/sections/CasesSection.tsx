'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';

export function CasesSection() {
  const cases = [
    {
      id: 1,
      title: 'Внедрение Мой Склад в ритейле',
      company: 'Торговая сеть «Семейный Маркет»',
      industry: 'Ритейл',
      description: 'Автоматизировали складской учет для сети из 15 магазинов',
      results: {
        efficiency: '+65%',
        time: '-40%',
        cost: '-30%',
      },
      tags: ['Мой Склад', 'Интеграция', '1С'],
      href: '/cases/retail-case',
    },
    {
      id: 2,
      title: 'Битрикс24 для отдела продаж',
      company: 'ТОО «МеталлТех»',
      industry: 'Производство',
      description: 'Настроили воронку продаж и автоматизировали процессы',
      results: {
        efficiency: '+50%',
        time: '-35%',
        cost: '-25%',
      },
      tags: ['Битрикс24', 'CRM', 'Автоматизация'],
      href: '/cases/metalltech-case',
    },
    {
      id: 3,
      title: 'Корпоративная телефония',
      company: 'Kazakhstan Travel',
      industry: 'Туризм',
      description: 'Внедрили виртуальную АТС с записью разговоров',
      results: {
        efficiency: '+45%',
        time: '-50%',
        cost: '-40%',
      },
      tags: ['Телефония', 'Виртуальная АТС', 'CRM'],
      href: '/cases/travel-case',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950" id="cases">
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
            Наши кейсы
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Успешные проекты наших клиентов
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Реальные результаты от внедрения наших решений
          </motion.p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                    {caseItem.title}
                  </h3>

                  {/* Company */}
                  <p className="text-sm text-slate-400 mb-3">{caseItem.company}</p>

                  {/* Description */}
                  <p className="text-slate-300 mb-6">{caseItem.description}</p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg bg-slate-800/50">
                      <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{caseItem.results.efficiency}</div>
                      <div className="text-xs text-slate-400">эффективность</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-800/50">
                      <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{caseItem.results.time}</div>
                      <div className="text-xs text-slate-400">время</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-800/50">
                      <DollarSign className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{caseItem.results.cost}</div>
                      <div className="text-xs text-slate-400">затраты</div>
                    </div>
                  </div>

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
          ))}
        </div>

        {/* All Cases CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="gradient"
            size="lg"
            onClick={() => window.location.href = '/cases'}
          >
            Все кейсы
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
