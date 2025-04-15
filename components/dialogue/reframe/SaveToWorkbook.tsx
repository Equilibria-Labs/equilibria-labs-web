'use client';

import React from 'react';
import { BodyText, Title } from '@/components/common/Typography';
import Box from '@/components/structure/Box';
import { Button } from '@/components/ui/button';
import { WorkbookEntry } from '@/types/shared/workbook';

interface SaveToWorkbookProps {
  reframeData: WorkbookEntry;
  onSaveAction: () => void;
}

export default function SaveToWorkbook({
  reframeData,
  onSaveAction,
}: SaveToWorkbookProps) {
  console.log(reframeData);
  return (
    <Box>
      <Title>Save Your Work</Title>
      <BodyText>
        Would you like to save this reframe exercise to your workbook? This will
        help you track your progress and refer back to it later.
      </BodyText>
      <Box className='mt-6 flex flex-col gap-4'>
        <Button onClick={onSaveAction}>Save to Workbook</Button>
        <Box className='mt-4 p-4 bg-muted rounded-lg overflow-auto'>
          <pre className='whitespace-pre-wrap break-words'>
            {JSON.stringify(reframeData, null, 2)}
          </pre>
        </Box>
      </Box>
    </Box>
  );
}
