'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const commands = [
  {
    label: 'Clone the repository',
    command:
      'git clone https://github.com/mahmoudmatter12/next-admin-kit-nine.git\ncd next-admin-kit-nine',
  },
  {
    label: 'Install dependencies',
    command: 'npm install',
  },
  {
    label: 'Copy environment file',
    command: 'cp .env.example .env',
  },
];

export function InstallationSection() {
  const t = useTranslations('landing.setup_guide.installation');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className='mb-12'>
      <h2 className='text-2xl sm:text-3xl font-bold text-setup-text mb-6'>
        {t('title')}
      </h2>
      <div className='space-y-6'>
        {commands.map((cmd, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className='bg-setup-primary border border-setup-secondary/30 rounded-lg p-6'
          >
            <h3 className='text-lg font-semibold text-setup-text mb-3'>
              {t(`step${index + 1}`)}
            </h3>
            <div className='relative'>
              <pre className='bg-black/20 rounded-lg p-4 overflow-x-auto text-sm text-setup-text font-mono'>
                <code>{cmd.command}</code>
              </pre>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => copyToClipboard(cmd.command, index)}
                className='absolute top-2 right-2 text-setup-text hover:bg-setup-secondary/20'
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
    </section>
  );
}
