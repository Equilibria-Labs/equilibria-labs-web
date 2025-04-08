'use client';

import { HeadingLarge } from '@/components/common/Typography';
import { useState } from 'react';
import Column from '@/components/structure/Column';
import { Button } from '@/components/ui/button';
import { SelectableButton } from '@/components/common/SelectableButton';

interface WhatsYourMoodProps {
  onSubmitAction: (moods: string[]) => void;
}

export default function WhatsYourMood({ onSubmitAction }: WhatsYourMoodProps) {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const moods = [
    'Happy',
    'Excited',
    'Calm',
    'Content',
    'Tired',
    'Anxious',
    'Sad',
    'Frustrated',
    'Angry',
    'Overwhelmed',
    'Neutral',
    'Energetic',
    'Hopeful',
    'Grateful',
    'Stressed',
    'Worried',
  ];

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <Column hasLargeGap>
      <HeadingLarge>How are you feeling today?</HeadingLarge>

      <div className='flex flex-wrap gap-2'>
        {moods.map(mood => (
          <SelectableButton
            key={mood}
            selected={selectedMoods.includes(mood)}
            onClick={() => toggleMood(mood)}
          >
            {mood}
          </SelectableButton>
        ))}
        <Button size='iconCircle' iconName='plus' />
      </div>

      <Button
        className='mt-4'
        onClick={() => onSubmitAction(selectedMoods)}
        disabled={selectedMoods.length === 0}
      >
        Continue
      </Button>
    </Column>
  );
}
