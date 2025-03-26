'use client';

import { useState } from 'react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Metadata } from 'next';
import { ThinkingTrap } from '@/types/thinking-trap';
import { JournalEntry } from '@/types/shared/thought-journal';
import JournalList from '@/components/dialogue/thought-journal/JournalList';
import ProgressSteps from '@/components/dialogue/thought-journal/ProgressSteps';
import DefineWorry from '@/components/dialogue/thought-journal/DefineWorry';
import ThinkingTrapSelector from '@/components/dialogue/thought-journal/ThinkingTrapSelector';
import BalanceThought from '@/components/dialogue/thought-journal/BalanceThought';
import ContentPageHeader from '@/components/structure/ContentPageHeader';

export const metadata: Metadata = {
  title: 'Thought Journal | Equilibria Labs',
  description: 'A journal to help you track your thoughts and emotions',
};

export default function ThoughtJournal() {
  const [step, setStep] = useState<number>(1);
  const [showJournalList, setShowJournalList] = useState<boolean>(true);
  const [showHelpDialog, setShowHelpDialog] = useState<boolean>(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    id: crypto.randomUUID(),
    date: new Date(),
    worry: '',
    traps: [],
    rewrite: '',
  });
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const handleWorrySubmit = (worry: string) => {
    setCurrentEntry(prev => ({ ...prev, worry }));
    setStep(2);
  };

  const handleTrapsSubmit = (traps: ThinkingTrap[]) => {
    setCurrentEntry(prev => ({ ...prev, traps }));
    setStep(3);
  };

  const handleRewriteSubmit = (rewrite: string) => {
    const newEntry = { ...currentEntry, rewrite } as JournalEntry;
    setJournalEntries(prev => [newEntry, ...prev]);
    setShowJournalList(true);
    resetEntry();
  };

  const resetEntry = () => {
    setCurrentEntry({
      id: crypto.randomUUID(),
      date: new Date(),
      worry: '',
      traps: [],
      rewrite: '',
    });
    setStep(1);
  };

  const startNewEntry = () => {
    setShowJournalList(false);
    resetEntry();
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <ContentPageHeader title='Thought Journal' />
      {showJournalList ? (
        <JournalList
          entries={journalEntries}
          onNewEntryAction={startNewEntry}
          onEntryClickAction={entry => {
            setCurrentEntry(entry);
            setShowJournalList(false);
            setStep(1);
          }}
        />
      ) : (
        <>
          <header className='bg-gradient-to-r from-violet-400 to-violet-500 p-4 flex items-center justify-between'>
            <button
              onClick={() => setShowJournalList(true)}
              className='text-white'
            >
              <ChevronLeft className='h-6 w-6' />
            </button>
            <h1 className='text-xl font-semibold text-white'>
              Thought Journal
            </h1>
            <button
              onClick={() => setShowHelpDialog(true)}
              className='text-white'
            >
              <HelpCircle className='h-6 w-6' />
            </button>
          </header>

          <ProgressSteps currentStep={step} />

          <div className='flex-1 p-4'>
            {step === 1 && (
              <DefineWorry
                initialWorry={currentEntry.worry || ''}
                onSubmit={handleWorrySubmit}
              />
            )}
            {step === 2 && (
              <ThinkingTrapSelector
                worry={currentEntry.worry || ''}
                selectedTraps={currentEntry.traps || []}
                onSubmitAction={handleTrapsSubmit}
              />
            )}
            {step === 3 && (
              <BalanceThought
                worry={currentEntry.worry || ''}
                traps={currentEntry.traps || []}
                initialRewrite={currentEntry.rewrite || ''}
                onSubmitAction={handleRewriteSubmit}
              />
            )}
          </div>
        </>
      )}

      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent>
          <DialogTitle>About Thought Journal</DialogTitle>
          <DialogDescription>
            This journal helps you manage negative thoughts through a three-step
            process:
            <ol className='list-decimal pl-5 mt-2 space-y-2'>
              <li>
                <strong>Define Worries:</strong> Identify and articulate
                what&apos;s bothering you.
              </li>
              <li>
                <strong>Identify Thinking Traps:</strong> Recognize patterns of
                distorted thinking.
              </li>
              <li>
                <strong>Balance Thought:</strong> Rewrite your thought in a more
                balanced, realistic way.
              </li>
            </ol>
            Regular practice can help improve your thought patterns over time.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
