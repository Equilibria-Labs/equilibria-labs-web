'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { sleepReportDialogueConfig } from '@/config/sleep-report-dialogue';
import { Answer } from '@/types';

export default function SleepReportDialogue() {
  const handleComplete = (answers: Answer[]) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <Questionnaire
      config={sleepReportDialogueConfig}
      onCompleteAction={handleComplete}
    />
  );
}
