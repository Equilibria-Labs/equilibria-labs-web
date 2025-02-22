'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { sleepIsiConfig } from '@/config/sleep-isi';
import { Answer } from '@/types';

interface SleepReportDialogueProps {
  onCompleteAction: (answers: Answer[]) => void;
}

export default function SleepReportDialogue({
  onCompleteAction,
}: SleepReportDialogueProps) {
  return (
    <Questionnaire
      config={sleepIsiConfig}
      onCompleteAction={onCompleteAction}
    />
  );
}
