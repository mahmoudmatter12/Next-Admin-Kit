'use client';

import { WelcomeHeader } from './_components/WelcomeHeader';
import { AccessRestrictionNotice } from './_components/AccessRestrictionNotice';
import { LoginCard } from './_components/LoginCard';
import { FooterInfo } from './_components/FooterInfo';

export default function Page() {
  return (
    <section className='relative bg-setup-primary h-screen w-full flex overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden opacity-10'>
        <div className='absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-setup-secondary/20 blur-3xl'></div>
        <div className='absolute -right-[20%] -bottom-[20%] h-[60%] w-[60%] rounded-full bg-setup-secondary/20 blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-[80%] rounded-full bg-setup-secondary/10 blur-3xl'></div>
      </div>

      {/* Grid pattern overlay */}
      <div className='absolute inset-0 opacity-5'>
        <div className='h-full w-full bg-linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px) bg-size-[40px_40px]'></div>
      </div>

      {/* Main content container - full width split layout */}
      <div className='relative z-10 w-full h-full flex flex-col lg:flex-row'>
        {/* Left side - Welcome section */}
        <div className='w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-12'>
          <div className='w-full max-w-xl'>
            <WelcomeHeader />
            <AccessRestrictionNotice />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className='w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-12 overflow-y-auto'>
          <div className='w-full max-w-md'>
            <LoginCard />
            <FooterInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
