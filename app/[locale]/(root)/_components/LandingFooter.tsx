'use client';

import { useTranslations } from 'next-intl';
import { Github, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';

export function LandingFooter() {
  const router = useRouter();
  const githubUrl = process.env.NEXT_PUBLIC_DEVELOPER_URL || '#';

  return (
    <footer className='bg-setup-primary border-t border-setup-secondary/30 py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Project Info */}
          <div>
            <h3 className='text-lg font-semibold text-setup-text mb-4'>
              {process.env.NEXT_PUBLIC_PROJECT_NAME || 'Full Admin V1'}
            </h3>
            <p className='text-setup-text/70 text-sm'>
              {process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ||
                'Complete admin panel starter with Next.js, Prisma, Clerk, RBAC, Themes & i18n'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold text-setup-text mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              <li>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => router.push('/setup')}
                  className='text-setup-text/70 hover:text-setup-text justify-start p-0 h-auto'
                >
                  Setup Guide
                </Button>
              </li>
              <li>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    window.open(githubUrl, '_blank');
                  }}
                  className='text-setup-text/70 hover:text-setup-text justify-start p-0 h-auto'
                >
                  <Github className='mr-2 h-4 w-4' />
                  GitHub
                </Button>
              </li>
              <li>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => router.push('/setup')}
                  className='text-setup-text/70 hover:text-setup-text justify-start p-0 h-auto'
                >
                  <BookOpen className='mr-2 h-4 w-4' />
                  Documentation
                </Button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-lg font-semibold text-setup-text mb-4'>
              Resources
            </h3>
            <ul className='space-y-2 text-sm text-setup-text/70'>
              <li>
                <a
                  href='https://nextjs.org/docs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-setup-text flex items-center'
                >
                  Next.js Docs
                  <ExternalLink className='ml-1 h-3 w-3' />
                </a>
              </li>
              <li>
                <a
                  href='https://clerk.com/docs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-setup-text flex items-center'
                >
                  Clerk Docs
                  <ExternalLink className='ml-1 h-3 w-3' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.prisma.io/docs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-setup-text flex items-center'
                >
                  Prisma Docs
                  <ExternalLink className='ml-1 h-3 w-3' />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-setup-secondary/30 pt-8 text-center'>
          <p className='text-setup-text/60 text-sm'>
            © {new Date().getFullYear()}{' '}
            {process.env.NEXT_PUBLIC_PROJECT_NAME || 'Full Admin V1'}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
