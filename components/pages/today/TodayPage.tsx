'use client';

import { Metadata } from 'next';
import {
  // Heading,
  HeadingLarge,
  // BodyText,
  // HeadingSmall,
  // SmallText,
} from '@/components/common/Typography';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
import Box from '@/components/structure/Box';
// import List, { ListItem } from '@/components/common/List';
import { EmotionSlider } from '@/components/dialogue/EmotionSlider/EmotionSlider';
import { useEffect, useState } from 'react';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 12) return 'this morning';
  if (hour >= 12 && hour < 18) return 'this afternoon';
  if (hour >= 18 && hour < 23) return 'this evening';
  return 'tonight';
};

export const metadata: Metadata = {
  title: 'The Sleep Lab | Equilibria',
  description:
    'Take a sleep test to see how you sleep and get a personalized sleep report',
};

export default function TodayPage() {
  const [timeGreeting, setTimeGreeting] = useState('');
  const { setRandomTheme } = useAlternativeTheme();

  useEffect(() => {
    setRandomTheme();
  }, [setRandomTheme]);

  useEffect(() => {
    setTimeGreeting(getTimeOfDayGreeting());
    // Update every minute to ensure it changes at the right time
    const interval = setInterval(() => {
      setTimeGreeting(getTimeOfDayGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box hasLargePadding shouldRise>
      <HeadingLarge className='text-center'>
        How are you feeling {timeGreeting}?
      </HeadingLarge>
      <EmotionSlider />
    </Box>
  );
}
