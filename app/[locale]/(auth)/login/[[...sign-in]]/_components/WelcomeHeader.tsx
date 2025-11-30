'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Users } from 'lucide-react';

export function WelcomeHeader() {
  return (
    <motion.div
      className='text-center lg:text-left'
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='flex items-center justify-center lg:justify-start mb-6 sm:mb-8'>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <Shield className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-setup-secondary' />
        </motion.div>
      </div>

      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-setup-text'>
        <span className='bg-linear-to-r from-setup-secondary via-setup-text to-setup-secondary bg-clip-text text-transparent'>
          Admin Portal
        </span>
      </h1>

      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 text-setup-text/90'>
        Welcome Back
      </h2>

      <p className='text-base sm:text-lg md:text-xl text-setup-text/70 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0'>
        Secure access to the administrative dashboard. This portal is restricted
        to authorized administrators only.
      </p>

      {/* Features list */}
      <div className='space-y-4 sm:space-y-6 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0'>
        <div className='flex items-center space-x-3 sm:space-x-4 text-setup-text/80'>
          <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-setup-secondary/20 flex items-center justify-center'>
            <Lock className='h-5 w-5 sm:h-6 sm:w-6 text-setup-secondary' />
          </div>
          <p className='text-sm sm:text-base md:text-lg'>
            Enterprise-grade security and authentication
          </p>
        </div>
        <div className='flex items-center space-x-3 sm:space-x-4 text-setup-text/80'>
          <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-setup-secondary/20 flex items-center justify-center'>
            <Users className='h-5 w-5 sm:h-6 sm:w-6 text-setup-secondary' />
          </div>
          <p className='text-sm sm:text-base md:text-lg'>
            Exclusive access for authorized administrators
          </p>
        </div>
      </div>

      <div className='w-32 sm:w-40 md:w-48 h-1.5 sm:h-2 bg-linear-to-r from-setup-secondary via-setup-text to-setup-secondary rounded-full mx-auto lg:mx-0'></div>
    </motion.div>
  );
}
