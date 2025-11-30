'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function CleanupSection() {
  const t = useTranslations('landing.setup_guide.cleanup');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='space-y-6'
    >
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-setup-secondary/20 rounded-lg'>
          <Trash2 className='h-6 w-6 text-setup-secondary' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-setup-text'>{t('title')}</h2>
          <p className='text-setup-text/70'>{t('subtitle')}</p>
        </div>
      </div>

      <Card className='bg-setup-primary border-setup-secondary/30'>
        <CardHeader>
          <CardTitle className='text-setup-text'>{t('card_title')}</CardTitle>
          <CardDescription className='text-setup-text/70'>
            {t('card_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-3'>
            <h3 className='font-semibold text-setup-text'>
              {t('what_removes_title')}
            </h3>
            <ul className='space-y-2 text-setup-text/80'>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='h-5 w-5 text-setup-secondary shrink-0 mt-0.5' />
                <span>{t('removes_landing')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='h-5 w-5 text-setup-secondary shrink-0 mt-0.5' />
                <span>{t('removes_setup')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='h-5 w-5 text-setup-secondary shrink-0 mt-0.5' />
                <span>{t('removes_docs')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <CheckCircle2 className='h-5 w-5 text-setup-secondary shrink-0 mt-0.5' />
                <span>{t('removes_images')}</span>
              </li>
            </ul>
          </div>

          <div className='pt-4 border-t border-setup-secondary/30'>
            <h3 className='font-semibold text-setup-text mb-3'>
              {t('command_title')}
            </h3>
            <div className='bg-black/30 rounded-lg p-4 border border-setup-secondary/30'>
              <code className='text-setup-text font-mono text-sm'>
                npm run cleanup:landing
              </code>
            </div>
          </div>

          <Alert className='bg-setup-secondary/10 border-setup-secondary/30'>
            <AlertCircle className='h-4 w-4 text-setup-secondary' />
            <AlertTitle className='text-setup-text'>
              {t('warning_title')}
            </AlertTitle>
            <AlertDescription className='text-setup-text/80'>
              {t('warning_description')}
            </AlertDescription>
          </Alert>

          <div className='pt-4 border-t border-setup-secondary/30'>
            <h3 className='font-semibold text-setup-text mb-3'>
              {t('after_cleanup_title')}
            </h3>
            <p className='text-setup-text/80 mb-4'>
              {t('after_cleanup_description')}
            </p>
            <div className='bg-setup-secondary/10 rounded-lg p-4 border border-setup-secondary/30'>
              <p className='text-setup-text font-medium text-center text-2xl'>
                Ready to build awesome app
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
