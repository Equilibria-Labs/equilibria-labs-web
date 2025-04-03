import ReliefSheet from '@/components/sheets/Relief';

export type SheetConfig = {
  id: string;
  title: string;
  content: React.ComponentType;
};

export const sheets: Record<string, SheetConfig> = {
  relief: {
    id: 'relief',
    title: 'Get Relief',
    content: ReliefSheet,
  },
};
