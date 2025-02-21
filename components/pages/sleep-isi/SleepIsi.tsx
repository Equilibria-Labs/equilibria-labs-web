'use client';

import { Questionnaire } from '@/components/dialogue/questionnaire/questionnaire';
import { sleepIsiConfig } from '@/config/sleep-isi';
import { Answer } from '@/types';
import Box from '@/components/structure/Box';
export default function SleepReportDialogue() {
  const handleComplete = (answers: Answer[]) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <Box shouldRise>
      <Questionnaire
        config={sleepIsiConfig}
        onCompleteAction={handleComplete}
      />
    </Box>
  );
}
