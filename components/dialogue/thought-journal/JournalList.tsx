'use client';

import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { JournalEntry } from '@/types/shared/thought-journal';
import { Button } from '@/components/ui/button';

interface JournalListProps {
  entries: JournalEntry[];
  onNewEntryAction: () => void;
  onEntryClickAction: (entry: JournalEntry) => void;
}

export default function JournalList({
  entries,
  onNewEntryAction,
  onEntryClickAction,
}: JournalListProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='p-4'>
        <h2 className='text-gray-500 font-medium mb-4'>
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </h2>

        {entries.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 mb-4'>No journal entries yet</p>
            <Button
              onClick={onNewEntryAction}
              className='bg-violet-500 hover:bg-violet-600'
            >
              Create your first entry
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {entries.map(entry => (
              <div
                key={entry.id}
                onClick={() => onEntryClickAction(entry)}
                className='border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50'
              >
                <div className='flex-1'>
                  <div className='text-sm text-gray-500'>
                    {format(entry.date, 'h:mm a')}
                  </div>
                  <div className='font-medium truncate'>{entry.worry}</div>
                  <div className='text-sm text-gray-500 truncate'>
                    {entry.rewrite.substring(0, 60)}
                    {entry.rewrite.length > 60 ? '...' : ''}
                  </div>
                </div>
                <ChevronRight className='h-5 w-5 text-gray-400' />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
