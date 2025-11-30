'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'Next.js', version: '16' },
  { name: 'React', version: '19' },
  { name: 'TypeScript', version: '5' },
  { name: 'Prisma', version: '7' },
  { name: 'Clerk', version: '6' },
  { name: 'Tailwind CSS', version: '4' },
  { name: 'shadcn/ui', version: 'Latest' },
  { name: 'next-intl', version: '4' },
  { name: 'Framer Motion', version: '12' },
  { name: 'React Query', version: '5' },
];

export function TechStackSection() {
  const t = useTranslations('landing.tech_stack');

  return (
    <section className='py-20 bg-setup-primary/50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-setup-text mb-4'>
            {t('title')}
          </h2>
          <p className='text-lg sm:text-xl text-setup-text/70 max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto'>
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className='bg-setup-primary border border-setup-secondary/30 rounded-lg p-6 text-center hover:border-setup-secondary/50 transition-all group'
            >
              <div className='text-2xl font-bold text-setup-text mb-2 group-hover:text-setup-secondary transition-colors'>
                {tech.name}
              </div>
              <div className='text-sm text-setup-text/60 group-hover:text-setup-text/80 transition-colors'>
                {tech.version}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
