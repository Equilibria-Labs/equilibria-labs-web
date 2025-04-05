'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
// import { BodyText, Title } from '@/components/common/Typography';
// import EquilibriaIcon from '@/components/common/EquilibriaIcon';
import Logo from '@/components/structure/Logo';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1000); // Auto-dismiss after 3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* <div className='flex flex-col gap-4 items-center -mt-20'>
        <div className='flex flex-col'>
          <div className='font-heading text-heading-sm ml-2'>The</div>
          <Title className='-mt-3'>Sleep Lab</Title>
        </div>
        <BodyText>By</BodyText>
        <div className='flex items-center text-xl'>
          <EquilibriaIcon width={30} height={30} className='mr-2' />
          <span className='font-label font-bold'>Equilibria</span>
          <span className='font-title font-light italic ml-1'>Labs</span>
        </div>
      </div> */}
      <Logo size={150} />
    </div>
  );
}
