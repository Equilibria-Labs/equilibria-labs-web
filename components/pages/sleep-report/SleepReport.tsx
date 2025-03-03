'use client';

import { useState } from 'react';
import SleepISI from '@/components/interactions/sleep-isi/SleepIsi';
import SleepSummary from '@/components/interactions/sleep-summary/SleepSummary';
import { Answer, Dialogue } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SleepPsqi from '@/components/interactions/sleep-psqi/SleepPsqi';
import { useSheet } from '@/context/SheetContext';
import { SignInForm } from '@/components/account/SignInForm';
import useDialogue from '@/hooks/useDialogue';
import { v4 as uuidv4 } from 'uuid';

type SectionType = 'isi' | 'psqi' | 'summary';

interface SectionConfig {
  sectionId: SectionType;
}

const SLEEP_REPORT_SECTIONS: SectionConfig[] = [
  {
    sectionId: 'isi',
  },
  {
    sectionId: 'psqi',
  },
  {
    sectionId: 'summary',
  },
];

export default function SleepReport() {
  const [currentSection, setCurrentSection] = useState<SectionType>(
    SLEEP_REPORT_SECTIONS[0].sectionId
  );
  const { openSheet } = useSheet();

  const [storedDialogues, setStoredDialogues] = useLocalStorage<
    Record<string, Dialogue>
  >('sleep-report-dialogues', {});

  const { createDialogue } = useDialogue();

  const currentSectionIndex = SLEEP_REPORT_SECTIONS.findIndex(
    section => section.sectionId === currentSection
  );

  const handleOpenSheet = () => {
    openSheet({
      title: 'Sign in to save your sleep report',
      content: <SignInForm />,
    });
  };

  const handleSectionComplete = async (
    dialogueId: string,
    answers: Answer[],
    score?: number
  ) => {
    // Generate a unique submissionId for this dialogue submission
    // This is required for all submissions as each assessment completion gets a unique ID
    const submissionId = uuidv4();
    const currentTimestamp = new Date().toISOString();

    const dialogue: Dialogue = {
      dialogueId,
      submissionId,
      answers,
      title: dialogueId.toUpperCase(), // You can customize the title as needed
      version: '1.0', // You can manage versions as needed
      status: 'complete',
      submitted_at: currentTimestamp,
      created_at: currentTimestamp,
      score, // Add back the score
    };

    // Store locally using both dialogueId and submissionId as compound key
    // This allows us to store multiple submissions of the same dialogue type
    const storageKey = `${dialogueId}_${submissionId}`;

    setStoredDialogues(prev => ({
      ...prev,
      [storageKey]: dialogue,
    }));

    handleOpenSheet();
    try {
      // Create new dialogue in the database with the submissionId
      await createDialogue(dialogue);
      console.log(
        `Successfully saved ${dialogueId} submission to the database`
      );
    } catch (error) {
      console.error(`Error saving ${dialogueId} to the database:`, error);
      // Continue with the flow even if API save fails
    }

    // Move to next section if available
    const nextSection = SLEEP_REPORT_SECTIONS[currentSectionIndex + 1];
    if (nextSection) {
      setCurrentSection(nextSection.sectionId);
    }
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'isi':
        return (
          <SleepISI
            onCompleteAction={(answers: Answer[], score?: number) =>
              handleSectionComplete('isi', answers, score)
            }
          />
        );
      case 'psqi':
        return (
          <SleepPsqi
            onCompleteAction={(answers: Answer[], score?: number) =>
              handleSectionComplete('psqi', answers, score)
            }
          />
        );
      case 'summary':
        // Transform the stored dialogues to group by dialogueId if needed
        return <SleepSummary dialogues={storedDialogues} />;
      default:
        return null;
    }
  };

  return renderSectionContent();
}
