'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  isHome?: boolean;
}

export default function BackButton({ isHome }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => (isHome ? router.push('/') : router.back())}
      iconName='chevronLeft'
      aria-label='Go back'
    />
  );
}
