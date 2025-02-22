'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { sleepPsqiConfig } from '@/config/sleep-psqi';
import { Answer } from '@/types';

interface SleepReportDialogueProps {
  onCompleteAction: (answers: Answer[]) => void;
}

export default function SleepReportDialogue({
  onCompleteAction,
}: SleepReportDialogueProps) {
  return (
    <Questionnaire
      config={sleepPsqiConfig}
      onCompleteAction={onCompleteAction}
    />
  );
}
