'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface DefineWorryProps {
  initialWorry: string;
  onSubmit: (worry: string) => void;
}

export default function DefineWorry({
  initialWorry,
  onSubmit,
}: DefineWorryProps) {
  const [worry, setWorry] = useState(initialWorry);
  const maxLength = 400;

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-medium text-blue-500 mb-2'>
          What&apos;s worrying you right now and why?
        </h2>
        <p className='text-gray-600'>
          Describe the situation and why you&apos;re worried about it. Be as
          specific as you can with your reasoning.
        </p>
      </div>

      <div className='bg-gray-50 p-4 rounded-lg'>
        <p className='text-gray-500 italic mb-2'>
          e.g. There&apos;s a science test on Monday. I know for sure I&apos;ll
          get a zero and that people will laugh. Maybe I&apos;ll fail the class.
        </p>
      </div>

      <div className='space-y-2'>
        <Textarea
          value={worry}
          onChange={e => setWorry(e.target.value)}
          placeholder='Type your worry here...'
          className='min-h-[150px] resize-none'
          maxLength={maxLength}
        />
        <div className='text-right text-sm text-gray-500'>
          {worry.length}/{maxLength}
        </div>
      </div>

      <div className='pt-4'>
        <Button
          onClick={() => onSubmit(worry)}
          disabled={worry.trim().length === 0}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white'
        >
          Next
        </Button>
      </div>
    </div>
  );
}
