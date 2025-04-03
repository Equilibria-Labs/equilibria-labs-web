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
import { type ThinkingTrap } from '@/types/thinking-trap';
import { thinkingTraps } from '@/config/thinking-traps';
import { cn } from '@/lib/utils';

interface ThinkingTrapSelectorProps {
  worry: string;
  selectedTraps: ThinkingTrap[];
  onSubmitAction: (traps: ThinkingTrap[]) => void;
}

export default function ThinkingTrapSelector({
  worry,
  selectedTraps,
  onSubmitAction,
}: ThinkingTrapSelectorProps) {
  const [traps, setTraps] = useState<ThinkingTrap[]>(selectedTraps);
  const [showTrapsDialog, setShowTrapsDialog] = useState(false);
  const [currentTrapIndex, setCurrentTrapIndex] = useState(0);

  const handleTrapToggle = (trap: ThinkingTrap) => {
    if (traps.some(t => t.id === trap.id)) {
      setTraps(traps.filter(t => t.id !== trap.id));
    } else {
      setTraps([...traps, trap]);
    }
  };

  const handleSubmit = () => {
    onSubmitAction(traps);
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
        {thinkingTraps.slice(0, 3).map(trap => (
          <button
            key={trap.id}
            onClick={() => {
              setCurrentTrapIndex(
                thinkingTraps.findIndex(t => t.id === trap.id)
              );
              setShowTrapsDialog(true);
            }}
            className='flex flex-col items-center'
          >
            <div
              className={cn(
                'w-12 h-12 flex items-center justify-center rounded-full',
                traps.some(t => t.id === trap.id)
                  ? 'bg-violet-100'
                  : 'bg-gray-100'
              )}
            >
              <trap.icon className='w-8 h-8 text-violet-500' />
            </div>
          </button>
        ))}
      </div>

      <div className='flex justify-center'>
        <div className='flex space-x-1'>
          {thinkingTraps.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full',
                currentTrapIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>

      <div className='space-y-4 mt-6'>
        {traps.length > 0 ? (
          traps.map(trap => (
            <Card
              key={trap.id}
              className={cn(
                'p-4 relative overflow-hidden',
                trap.id === 'catastrophizing' && 'bg-blue-100',
                trap.id === 'fortune-telling' && 'bg-pink-100',
                trap.id === 'black-and-white' && 'bg-violet-100'
              )}
            >
              <div className='mb-2'>
                <h3 className='text-lg font-medium'>{trap.name}</h3>
              </div>
              <p className='text-sm'>{trap.description}</p>

              <div className='mt-4 grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='text-sm font-medium mb-2'>
                    Unbalanced example
                  </h4>
                  <p className='text-sm bg-white/50 p-2 rounded'>
                    {trap.unbalancedExample}
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-medium mb-2'>Balanced example</h4>
                  <p className='text-sm bg-white/50 p-2 rounded'>
                    {trap.balancedExample}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className='text-center py-6 text-gray-500'>
            Select thinking traps that apply to your worry
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

      <Dialog open={showTrapsDialog} onOpenChange={setShowTrapsDialog}>
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
          <DialogTitle className='text-blue-500'>Thinking Traps</DialogTitle>
          <DialogDescription>
            Thinking traps are distorted and unhelpful ways of thinking that
            keep us feeling anxious. Here is a list of common thinking traps to
            be aware of and avoid getting caught in:
          </DialogDescription>

          <div className='space-y-6 mt-4'>
            {thinkingTraps.map(trap => (
              <div key={trap.id} className='flex items-start space-x-4'>
                <div className='flex-shrink-0'>
                  <trap.icon className='w-10 h-10 text-violet-500' />
                </div>
                <div className='flex-1'>
                  <h3 className='font-medium text-lg'>{trap.name}</h3>
                  <p className='text-gray-600'>{trap.description}</p>
                </div>
                <Button
                  variant='outline'
                  className={cn(
                    'flex-shrink-0',
                    traps.some(t => t.id === trap.id) &&
                      'bg-violet-100 border-violet-300'
                  )}
                  onClick={() => handleTrapToggle(trap)}
                >
                  {traps.some(t => t.id === trap.id) ? 'Selected' : 'Select'}
                </Button>
              </div>
            ))}
          </div>

          <Button
            className='w-full mt-4'
            onClick={() => setShowTrapsDialog(false)}
          >
            Okay, got it!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
