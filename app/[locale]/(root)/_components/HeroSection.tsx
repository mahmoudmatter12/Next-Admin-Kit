'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Github, BookOpen, Rocket, ArrowRight, ExternalLink } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const t = useTranslations('landing.hero');
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/Admin_Kit_OG_Banner.png'
          alt='Next-Admin-Kit Banner'
          fill
          className='object-cover'
          priority
          unoptimized
        />
        {/* Overlay for better text readability */}
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* CTA Buttons - Bottom Right with Blurred Background */}
      <div className='absolute bottom-0 z-10 w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12'>
        <div className={cn(
          'flex justify-end',
          isRTL && 'justify-start'
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn(
              'relative backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl p-6 shadow-2xl',
              'flex flex-col gap-4',
              'w-full sm:w-auto'
            )}
          >
            {/* Get Started Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative w-full sm:w-auto'
            >
              <Button
                onClick={() => router.push('/setup')}
                size='lg'
                className='group relative bg-setup-secondary hover:bg-setup-secondary/90 text-white px-8 py-6 text-lg w-full sm:w-auto shadow-lg overflow-hidden transition-all duration-300'
              >
                {/* Shine effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
                <div className='relative flex items-center gap-2'>
                  <Rocket className='h-5 w-5 transition-transform group-hover:rotate-12' />
                  <span>{t('get_started')}</span>
                  <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ x: isRTL ? -4 : 4, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className='flex items-center'
                  >
                    <ArrowRight
                      className={cn('h-5 w-5', isRTL && 'rotate-180')}
                    />
                  </motion.div>
                </div>
              </Button>
            </motion.div>

            {/* GitHub Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative w-full sm:w-auto'
            >
              <Button
                onClick={() => {
                  const githubUrl = process.env.NEXT_PUBLIC_DEVELOPER_URL || '#';
                  window.open(githubUrl, '_blank');
                }}
                variant='outline'
                size='lg'
                className='group relative border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 px-8 py-6 text-lg w-full sm:w-auto shadow-lg transition-all duration-300 overflow-hidden'
              >
                {/* Pulse indicator */}
                <motion.div
                  className='absolute inset-0 border-2 border-white/50 rounded-md'
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className='relative flex items-center gap-2'>
                  <Github className='h-5 w-5 transition-transform group-hover:scale-110' />
                  <span>{t('github')}</span>
                  <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ x: isRTL ? -4 : 4, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className='flex items-center'
                  >
                    <ExternalLink
                      className={cn('h-4 w-4', isRTL && 'rotate-180')}
                    />
                  </motion.div>
                </div>
              </Button>
            </motion.div>

            {/* Documentation Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative w-full sm:w-auto'
            >
              <Button
                onClick={() => router.push('/docs')}
                variant='outline'
                size='lg'
                className='group relative border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 px-8 py-6 text-lg w-full sm:w-auto shadow-lg transition-all duration-300 overflow-hidden'
              >
                {/* Glow effect */}
                <motion.div
                  className='absolute inset-0 bg-white/10 blur-xl'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className='relative flex items-center gap-2'>
                  <BookOpen className='h-5 w-5 transition-transform group-hover:rotate-3' />
                  <span>{t('view_documentation')}</span>
                  <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    whileHover={{ x: isRTL ? -4 : 4, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className='flex items-center'
                  >
                    <ArrowRight
                      className={cn('h-5 w-5', isRTL && 'rotate-180')}
                    />
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
