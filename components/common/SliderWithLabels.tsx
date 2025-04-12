'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { LabelText } from '@/components/common/Typography';
import { cn } from '@/lib/utils';

interface SliderWithLabelsProps
  extends React.ComponentPropsWithoutRef<typeof Slider> {
  leftLabel: string;
  rightLabel: string;
  labelClassName?: string;
}

export default function SliderWithLabels({
  leftLabel,
  rightLabel,
  labelClassName,
  className,
  ...sliderProps
}: SliderWithLabelsProps) {
  return (
    <div className='w-full'>
      <div className='flex justify-between mb-2'>
        <LabelText className={cn('text-secondary', labelClassName)}>
          {leftLabel}
        </LabelText>
        <LabelText className={cn('text-secondary', labelClassName)}>
          {rightLabel}
        </LabelText>
      </div>
      <Slider className={className} {...sliderProps} />
    </div>
  );
}
