'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { sleepReportDialogueConfig } from '@/config/sleep-report-dialogue';
import { ChoiceValue } from '@/types';

export default function SleepReportDialogue() {
  const handleComplete = (answers: Record<string, ChoiceValue[]>) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <Questionnaire
      config={sleepReportDialogueConfig}
      onCompleteAction={handleComplete}
    />
  );
}
