'use client';

import { HeadingLarge } from '@/components/common/Typography';
import { EmotionSlider } from '@/components/dialogue/reframe/EmotionSlider';
import Box from '@/components/structure/Box';
import { useEffect, useState } from 'react';
import { getTimeOfDayGreeting } from '@/helpers/time';

export default function HowAreYou() {
  const [timeGreeting, setTimeGreeting] = useState('');

  useEffect(() => {
    setTimeGreeting(getTimeOfDayGreeting());
  }, [setTimeGreeting]);

  return (
    <Box hasLargePadding shouldRise>
      <HeadingLarge>How are you feeling {timeGreeting}?</HeadingLarge>
      <EmotionSlider />
    </Box>
  );
}
