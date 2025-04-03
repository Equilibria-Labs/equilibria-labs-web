'use client';

import { HeadingLarge } from '@/components/common/Typography';
import { useState } from 'react';
import Column from '@/components/structure/Column';
import { Button } from '@/components/ui/button';
import { SelectableButton } from '@/components/common/SelectableButton';

interface WhatAreYouDoingProps {
  onSubmit: (activities: string[]) => void;
}

export default function WhatAreYouDoing({ onSubmit }: WhatAreYouDoingProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const activities = [
    'Working',
    'Studying',
    'Relaxing',
    'Exercising',
    'Socializing',
    'Eating',
    'Commuting',
    'Shopping',
    'Housework',
    'Entertainment',
    'Outdoors',
    'Reading',
    'Creating',
    'Gaming',
    'Meditating',
    'Other',
  ];

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  return (
    <Column hasLargeGap>
      <HeadingLarge className='text-center'>What are you up to?</HeadingLarge>

      <div className='flex flex-wrap gap-2'>
        {activities.map(activity => (
          <SelectableButton
            key={activity}
            selected={selectedActivities.includes(activity)}
            onClick={() => toggleActivity(activity)}
          >
            {activity}
          </SelectableButton>
        ))}
        <Button size='iconCircle' iconName='plus' />
      </div>

      <Button
        className='mt-4'
        onClick={() => onSubmit(selectedActivities)}
        disabled={selectedActivities.length === 0}
      >
        Complete Check-in
      </Button>
    </Column>
  );
}
