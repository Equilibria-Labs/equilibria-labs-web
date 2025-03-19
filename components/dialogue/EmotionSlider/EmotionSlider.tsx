'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CloudLightning, Sun, CloudSun, Cloud, CloudRain } from 'lucide-react';
import { cn } from '@/lib/utils';
import Column from '@/components/structure/Column';
import { Heading } from '@/components/common/Typography';

type EmotionBand = {
  name: string;
  displayName: string;
  range: [number, number];
  color: string;
  textColor: string;
  icon: React.ReactNode;
};

// Move emotionBands outside the component
const emotionBands: EmotionBand[] = [
  {
    name: 'awful',
    displayName: 'Awful',
    range: [1, 20],
    color: 'text-gray-500',
    textColor: 'text-gray-200',
    icon: <CloudLightning className='h-full w-full' />,
  },
  {
    name: 'bad',
    displayName: 'Bad',
    range: [21, 40],
    color: 'text-gray-300',
    textColor: 'text-gray-300',
    icon: <CloudRain className='h-full w-full' />,
  },
  {
    name: 'okay',
    displayName: 'Okay',
    range: [41, 60],
    color: 'text-gray-100',
    textColor: 'text-white',
    icon: <Cloud className='h-full w-full' />,
  },
  {
    name: 'good',
    displayName: 'Good',
    range: [61, 80],
    color: 'text-white',
    textColor: 'text-amber-100',
    icon: <CloudSun className='h-full w-full' />,
  },
  {
    name: 'great',
    displayName: 'Great',
    range: [81, 100],
    color: 'text-yellow-400',
    textColor: 'text-yellow-100',
    icon: <Sun className='h-full w-full' />,
  },
];

export function EmotionSlider() {
  const [value, setValue] = useState<number>(90);

  // Initialize currentEmotion with the correct emotion based on initial value
  const [currentEmotion, setCurrentEmotion] = useState<EmotionBand | null>(
    () => {
      return (
        emotionBands.find(band => 90 >= band.range[0] && 90 <= band.range[1]) ||
        null
      );
    }
  );

  useEffect(() => {
    const emotion = emotionBands.find(
      band => value >= band.range[0] && value <= band.range[1]
    );
    if (emotion && emotion.name !== currentEmotion?.name) {
      setCurrentEmotion(emotion);
    }
  }, [value, currentEmotion?.name]);

  const handleSubmit = () => {
    if (!currentEmotion) return;
    console.log(`Submitted feeling: ${currentEmotion.name} (${value}%)`);
    // Here you would typically send this data to your backend
  };

  if (!currentEmotion) return null;

  return (
    <Column justifyItems='center'>
      <div className='relative z-10 flex h-32 w-32 flex-col items-center justify-center'>
        <div
          className={cn(
            'h-full w-full transition-colors duration-150',
            currentEmotion.color
          )}
        >
          {currentEmotion.icon}
        </div>
      </div>

      <Heading>{currentEmotion.displayName}</Heading>

      <Slider
        value={[value]}
        min={1}
        max={100}
        step={1}
        onValueChange={vals => setValue(vals[0])}
        className='py-4'
      />

      <Button iconName='chevronRight' onClick={handleSubmit}>
        Check-in
      </Button>
    </Column>
  );
}
