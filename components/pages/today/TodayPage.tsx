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

export const metadata: Metadata = {
  title: 'The Sleep Lab | Equilibria',
  description:
    'Take a sleep test to see how you sleep and get a personalized sleep report',
};

export default function TodayPage() {
  return (
    <Box shouldRise>
      <HeadingLarge className='text-center'>How are you feeling?</HeadingLarge>
      <EmotionSlider />
    </Box>
  );
}
