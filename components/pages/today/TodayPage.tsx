'use client';

import { Metadata } from 'next';
import { useEffect } from 'react';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
import CriticalFriendStarter from '@/components/dialogue/check-in/CriticalFriendStarter';
import Column from '@/components/structure/Column';
export const metadata: Metadata = {
  title: 'The Sleep Lab | Equilibria',
  description:
    'Take a sleep test to see how you sleep and get a personalized sleep report',
};

export default function TodayPage() {
  const { setRandomTheme } = useAlternativeTheme();

  useEffect(() => {
    setRandomTheme();
  }, [setRandomTheme]);

  return <CriticalFriendStarter />;
}
