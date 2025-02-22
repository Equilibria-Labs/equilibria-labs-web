'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { sleepIsiConfig } from '@/config/sleep-isi';
import { Answer } from '@/types';
import Box from '@/components/structure/Box';

interface SleepReportDialogueProps {
  onCompleteAction: (answers: Answer[]) => void;
}

export default function SleepReportDialogue({
  onCompleteAction,
}: SleepReportDialogueProps) {
  return (
    <Box shouldRise>
      <Questionnaire
        config={sleepIsiConfig}
        onCompleteAction={onCompleteAction}
      />
    </Box>
  );
}
