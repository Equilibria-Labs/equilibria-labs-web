'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import { ThinkingTrap } from '@/types/thinking-trap';

interface BalanceThoughtProps {
  worry: string;
  traps: ThinkingTrap[];
  initialRewrite: string;
  onSubmitAction: (rewrite: string) => void;
}

export default function BalanceThought({
  worry,
  traps,
  initialRewrite,
  onSubmitAction,
}: BalanceThoughtProps) {
  const [rewrite, setRewrite] = useState(initialRewrite);
  const maxLength = 400;

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h3 className='text-gray-500 font-medium'>Worry</h3>
        <p className='text-lg font-medium mt-2'>{worry}</p>
      </div>

      <div className='space-y-4'>
        {traps.map(trap => (
          <div
            key={trap.id}
            className='p-4 rounded-lg'
            style={{
              background:
                trap.id === 'catastrophizing'
                  ? '#BFDBFE'
                  : trap.id === 'fortune-telling'
                    ? '#FCE7F3'
                    : trap.id === 'black-and-white'
                      ? '#EDE9FE'
                      : '#E5E7EB',
            }}
          >
            <h3 className='font-medium mb-2'>{trap.name}</h3>
            <p className='text-sm mb-4'>{trap.question}</p>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h4 className='text-sm font-medium mb-2'>Unbalanced example</h4>
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
          </div>
        ))}
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-medium text-blue-500'>
          Balance your thought
        </h2>
        <p className='text-gray-600'>
          Take a look at the examples above and try to reword your worry in a
          balanced way.
        </p>

        <div className='bg-gray-50 p-4 rounded-lg mt-2'>
          <p className='text-gray-500 italic'>
            e.g. I&apos;m not 100% sure I&apos;m going to fail the exam on
            Monday. Chances are I can answer some questions. Even if I
            don&apos;t do well it doesn&apos;t mean I can&apos;t make up the
            marks.
          </p>
        </div>

        <Textarea
          value={rewrite}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setRewrite(e.target.value)
          }
          placeholder='Write your balanced thought here...'
          className='min-h-[150px] resize-none mt-4'
          maxLength={maxLength}
        />
        <div className='text-right text-sm text-gray-500'>
          {rewrite.length}/{maxLength}
        </div>
      </div>

      <div className='pt-4'>
        <Button
          onClick={() => onSubmitAction(rewrite)}
          disabled={rewrite.trim().length === 0}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white'
        >
          Submit <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
