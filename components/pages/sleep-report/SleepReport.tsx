'use client';

import { useState } from 'react';
import SleepISI from '@/components/interactions/sleep-isi/SleepIsi';
import SleepSummary from '@/components/interactions/sleep-summary/SleepSummary';
import { Answer, Dialogue } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SleepPsqi from '@/components/interactions/sleep-psqi/SleepPsqi';
import { useSheet } from '@/context/SheetContext';
import { SignInForm } from '@/components/account/SignInForm';

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

  const currentSectionIndex = SLEEP_REPORT_SECTIONS.findIndex(
    section => section.sectionId === currentSection
  );

  const handleOpenSheet = () => {
    openSheet({
      title: 'Sign in to save your sleep report',
      content: <SignInForm />,
    });
  };

  const handleSectionComplete = (dialogueId: string, answers: Answer[]) => {
    const dialogue: Dialogue = {
      dialogueId,
      answers,
      title: dialogueId.toUpperCase(), // You can customize the title as needed
      version: '1.0', // You can manage versions as needed
      status: 'complete',
      submittedAt: new Date().toISOString(),
    };

    setStoredDialogues(prev => ({
      ...prev,
      [dialogueId]: dialogue,
    }));

    handleOpenSheet();

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
            onCompleteAction={answers => handleSectionComplete('isi', answers)}
          />
        );
      case 'psqi':
        return (
          <SleepPsqi
            onCompleteAction={
              answers => handleSectionComplete('psqi', answers) // Fixed dialogueId from 'onboarding' to 'psqi'
            }
          />
        );
      case 'summary':
        return <SleepSummary dialogues={storedDialogues} />;
      default:
        return null;
    }
  };

  return renderSectionContent();
}
