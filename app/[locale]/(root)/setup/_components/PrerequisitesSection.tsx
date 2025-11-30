'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const prerequisites = [
  { key: 'nodejs' },
  { key: 'postgresql' },
  { key: 'clerk' },
  { key: 'git' },
];

export function PrerequisitesSection() {
  const t = useTranslations('landing.setup_guide.prerequisites');

  return (
    <section className='mb-12'>
      <h2 className='text-2xl sm:text-3xl font-bold text-setup-text mb-6'>
        {t('title')}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {prerequisites.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className='flex items-center space-x-3 bg-setup-primary border border-setup-secondary/30 rounded-lg p-4'
          >
            <CheckCircle2 className='h-5 w-5 text-setup-secondary flex-shrink-0' />
            <span className='text-setup-text'>{t(item.key)}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
