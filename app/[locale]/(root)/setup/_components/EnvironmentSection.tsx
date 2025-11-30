'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const envVariables = [
  {
    name: 'DATABASE_URL',
    description: 'PostgreSQL connection string',
    example: 'postgresql://user:password@localhost:5432/dbname',
    required: true,
  },
  {
    name: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    description: 'Clerk publishable key (get from Clerk dashboard)',
    example: 'pk_test_...',
    required: true,
  },
  {
    name: 'CLERK_SECRET_KEY',
    description: 'Clerk secret key (get from Clerk dashboard)',
    example: 'sk_test_...',
    required: true,
  },
  {
    name: 'NEXT_PUBLIC_API_URL',
    description: 'API base URL (optional, defaults to localhost:3000)',
    example: 'http://localhost:3000',
    required: false,
  },
  {
    name: 'NEXT_PUBLIC_PROJECT_NAME',
    description: 'Project name (optional)',
    example: 'Full Admin V1',
    required: false,
  },
];

export function EnvironmentSection() {
  const t = useTranslations('landing.setup_guide.environment');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className='mb-12'>
      <h2 className='text-2xl sm:text-3xl font-bold text-setup-text mb-4'>
        {t('title')}
      </h2>
      <p className='text-setup-text/70 mb-6'>{t('description')}</p>

      <div className='space-y-4'>
        {envVariables.map((env, index) => (
          <motion.div
            key={env.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className='bg-setup-primary border border-setup-secondary/30 rounded-lg p-6'
          >
            <div className='flex items-start justify-between mb-2'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                  <code className='text-setup-secondary font-mono font-semibold'>
                    {env.name}
                  </code>
                  {env.required && (
                    <span className='text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded'>
                      Required
                    </span>
                  )}
                </div>
                <p className='text-sm text-setup-text/70 mb-3'>
                  {env.description}
                </p>
              </div>
            </div>
            <div className='relative'>
              <pre className='bg-black/20 rounded-lg p-3 overflow-x-auto text-sm text-setup-text/80 font-mono'>
                <code>{env.example}</code>
              </pre>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => copyToClipboard(env.example, index)}
                className='absolute top-1 right-1 text-setup-text hover:bg-setup-secondary/20'
              >
                {copiedIndex === index ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4'>
        <p className='text-sm text-setup-text'>
          <strong className='text-blue-400'>Tip:</strong> Get your Clerk keys
          from{' '}
          <a
            href='https://dashboard.clerk.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-setup-secondary hover:underline'
          >
            https://dashboard.clerk.com
          </a>
        </p>
      </div>
    </section>
  );
}
