'use client';

import React from 'react';
import { BodyText, Heading } from '@/components/common/Typography';
import Box from '@/components/structure/Box';
import { Button } from '@/components/ui/button';
import { WorkbookEntry } from '@/types/shared/workbook';
import Column from '@/components/structure/Column';
import Row from '@/components/structure/Row';

interface SaveToWorkbookProps {
  reframeData: WorkbookEntry;
  onSaveAction: (shouldSave: boolean) => void;
}

export default function SaveToWorkbook({
  reframeData,
  onSaveAction,
}: SaveToWorkbookProps) {
  console.log(reframeData);
  return (
    <Column hasLargeGap>
      <Heading className={`text-secondary`}>Save this to your workbook</Heading>
      <BodyText>
        Add this to your work book so you'll be able to identify this kind of
        thought more easily in future?
      </BodyText>
      <Row isFullWidth justify='space-between'>
        <Button
          variant='outline'
          size={'lg'}
          iconName='x'
          onClick={() => onSaveAction(false)}
        >
          Forget
        </Button>
        <Button
          variant='secondary'
          size={'lg'}
          iconName='check'
          onClick={() => onSaveAction(true)}
        >
          Save to Workbook
        </Button>
      </Row>
    </Column>
  );
}
