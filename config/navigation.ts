import { Sun, Grid, User, Lightbulb, BookOpen } from 'lucide-react';
import { NavConfigItem } from '@/types/navigation';
import { sheets } from './sheets';

export const mainNavConfig: NavConfigItem[] = [
  {
    icon: Sun,
    label: 'Today',
    action: { type: 'navigation', path: '/' },
  },
  // {
  //   icon: BookOpen,
  //   label: 'Library',
  //   path: '/resources',
  // },
  {
    icon: Grid,
    label: 'Get Relief',
    action: {
      type: 'sheet',
      sheetId: sheets.relief.id,
      title: sheets.relief.title,
    },
  },
  {
    icon: User,
    label: 'You',
    action: { type: 'navigation', path: '/you' },
  },
];

export const ReliefNavConfig: NavConfigItem[] = [
  {
    icon: BookOpen,
    label: 'Thought Journal',
    action: { type: 'navigation', path: '/thought-journal' },
  },
  {
    icon: Lightbulb,
    label: 'Coping Cards',
    action: { type: 'navigation', path: '/coping-cards' },
  },
];
