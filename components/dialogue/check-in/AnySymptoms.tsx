'use client';

import { HeadingLarge } from '@/components/common/Typography';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Column from '@/components/structure/Column';
import { Button } from '@/components/ui/button';
import { SelectableButton } from '@/components/common/SelectableButton';

export default function AnySymptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    'Racing Heart',
    'Chest Pain',
    'Shortness of Breath',
    'Dizziness',
    'Sweating',
    'Trembling',
    'Nausea',
    'Headaches',
    'Muscle Tension',
    'Fatigue',
    'Dry Mouth',
    'Hot Flashes',
    'Chills',
    'Numbness',
    'Tingling',
    'Stomach Pain',
    'Sleep Problems',
    'Restlessness',
  ];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <Column hasLargeGap>
      <HeadingLarge className='text-center'>
        Any physical symptoms?
      </HeadingLarge>

      <div className='flex flex-wrap gap-2'>
        {symptoms.map(symptom => (
          <SelectableButton
            key={symptom}
            selected={selectedSymptoms.includes(symptom)}
            onClick={() => toggleSymptom(symptom)}
          >
            {symptom}
          </SelectableButton>
        ))}
        <Button size='iconCircle' iconName='plus' />
      </div>
    </Column>
  );
}
