'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { type CognitiveDistortion } from '@/types/shared/cognitive-distortion-id';
import { cognitiveDistortions } from '@/config/cognitive-distortions';
import { cn } from '@/lib/utils';

interface CognitiveDistortionSelectorProps {
  worry: string;
  selectedDistortions: CognitiveDistortion[];
  onSubmitAction: (distortions: CognitiveDistortion[]) => void;
}

export default function CognitiveDistortionSelector({
  worry,
  selectedDistortions,
  onSubmitAction,
}: CognitiveDistortionSelectorProps) {
  const [distortions, setDistortions] =
    useState<CognitiveDistortion[]>(selectedDistortions);
  const [showDistortionsDialog, setShowDistortionsDialog] = useState(false);
  const [currentDistortionIndex, setCurrentDistortionIndex] = useState(0);

  const handleDistortionToggle = (distortion: CognitiveDistortion) => {
    if (distortions.some(d => d.id === distortion.id)) {
      setDistortions(distortions.filter(d => d.id !== distortion.id));
    } else {
      setDistortions([...distortions, distortion]);
    }
  };

  const handleSubmit = () => {
    onSubmitAction(distortions);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h3 className='text-gray-500 font-medium'>Worry</h3>
        <p className='text-lg font-medium mt-2'>{worry}</p>
        <div className='h-px bg-gray-200 w-full my-4' />
        <p className='text-gray-500'>Let&apos;s challenge that worry.</p>
      </div>

      <div className='flex justify-center space-x-2 py-2'>
        {cognitiveDistortions.slice(0, 3).map(distortion => (
          <button
            key={distortion.id}
            onClick={() => {
              setCurrentDistortionIndex(
                cognitiveDistortions.findIndex(d => d.id === distortion.id)
              );
              setShowDistortionsDialog(true);
            }}
            className='flex flex-col items-center'
          >
            <div
              className={cn(
                'w-12 h-12 flex items-center justify-center rounded-full',
                distortions.some(d => d.id === distortion.id)
                  ? 'bg-violet-100'
                  : 'bg-gray-100'
              )}
            >
              <distortion.icon className='w-8 h-8 text-violet-500' />
            </div>
          </button>
        ))}
      </div>

      <div className='flex justify-center'>
        <div className='flex space-x-1'>
          {cognitiveDistortions.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full',
                currentDistortionIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>

      <div className='space-y-4 mt-6'>
        {distortions.length > 0 ? (
          distortions.map(distortion => (
            <Card
              key={distortion.id}
              className={cn(
                'p-4 relative overflow-hidden',
                distortion.id === 'catastrophizing' && 'bg-blue-100',
                distortion.id === 'fortune-telling' && 'bg-pink-100',
                distortion.id === 'black-and-white' && 'bg-violet-100'
              )}
            >
              <div className='mb-2'>
                <h3 className='text-lg font-medium'>{distortion.name}</h3>
              </div>
              <p className='text-sm'>{distortion.description}</p>

              <div className='mt-4 grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium mb-2'>
                    Unbalanced example
                  </h4>
                  <p className='text-sm bg-white/50 p-2 rounded'>
                    {distortion.unbalancedExample}
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-medium mb-2'>Balanced example</h4>
                  <p className='text-sm bg-white/50 p-2 rounded'>
                    {distortion.balancedExample}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className='text-center py-6 text-gray-500'>
            Select cognitive distortions that apply to your worry
          </div>
        )}
      </div>

      <div className='pt-4'>
        <Button
          onClick={handleSubmit}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white'
        >
          Submit
        </Button>
      </div>

      <Dialog
        open={showDistortionsDialog}
        onOpenChange={setShowDistortionsDialog}
      >
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
          <DialogTitle className='text-blue-500'>
            Cognitive Distortions
          </DialogTitle>
          <DialogDescription>
            Cognitive distortions are distorted and unhelpful ways of thinking
            that keep us feeling anxious. Here is a list of common cognitive
            distortions to be aware of and avoid getting caught in:
          </DialogDescription>

          <div className='space-y-6 mt-4'>
            {cognitiveDistortions.map(distortion => (
              <div key={distortion.id} className='flex items-start space-x-4'>
                <div className='flex-shrink-0'>
                  <distortion.icon className='w-10 h-10 text-violet-500' />
                </div>
                <div className='flex-1'>
                  <h3 className='font-medium text-lg'>{distortion.name}</h3>
                  <p className='text-gray-600'>{distortion.description}</p>
                </div>
                <Button
                  variant='outline'
                  className={cn(
                    'flex-shrink-0',
                    distortions.some(d => d.id === distortion.id) &&
                      'bg-violet-100 border-violet-300'
                  )}
                  onClick={() => handleDistortionToggle(distortion)}
                >
                  {distortions.some(d => d.id === distortion.id)
                    ? 'Selected'
                    : 'Select'}
                </Button>
              </div>
            ))}
          </div>

          <Button
            className='w-full mt-4'
            onClick={() => setShowDistortionsDialog(false)}
          >
            Okay, got it!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
