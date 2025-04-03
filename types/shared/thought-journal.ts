import { ThinkingTrap } from '@/types/thinking-trap';

export type JournalEntry = {
  id: string;
  date: Date;
  worry: string;
  traps: ThinkingTrap[];
  rewrite: string;
};
