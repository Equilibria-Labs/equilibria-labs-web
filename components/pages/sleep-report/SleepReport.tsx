'use client';

import { useState } from 'react';
import Box from '@/components/structure/Box';
import SleepISI from '@/components/interactions/sleep-isi/SleepIsi';
import SleepOnboarding from '@/components/interactions/sleep-onboarding/SleepOnboarding';
import SleepSummary from '@/components/interactions/sleep-summary/SleepSummary';
import { Answer } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type SectionType = 'isi' | 'onboarding' | 'summary';

interface SectionConfig {
  sectionId: SectionType;
}

const SLEEP_REPORT_SECTIONS: SectionConfig[] = [
  {
    sectionId: 'isi',
  },
  {
    sectionId: 'onboarding',
  },
  {
    sectionId: 'summary',
  },
];

export default function SleepReport() {
  const [currentSection, setCurrentSection] = useState<SectionType>(
    SLEEP_REPORT_SECTIONS[0].sectionId
  );

  const [storedAnswers, setStoredAnswers] = useLocalStorage<
    Record<string, Answer[]>
  >('sleep-report-answers', {});

  const currentSectionIndex = SLEEP_REPORT_SECTIONS.findIndex(
    section => section.sectionId === currentSection
  );

  const handleSectionComplete = (dialogueId: string, answers: Answer[]) => {
    setStoredAnswers(prev => ({
      ...prev,
      [dialogueId]: answers,
    }));

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
      case 'onboarding':
        return (
          <SleepOnboarding
            onCompleteAction={answers =>
              handleSectionComplete('onboarding', answers)
            }
          />
        );
      case 'summary':
        return <SleepSummary answers={storedAnswers} />;
      default:
        return null;
    }
  };

  return renderSectionContent();
}
