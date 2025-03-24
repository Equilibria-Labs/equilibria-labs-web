import { Sun, Grid, User, Lightbulb, BookOpen } from 'lucide-react';
import { NavConfigItem } from '@/types/navigation';
import ReliefSheet from '@/components/sheets/Relief';

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
    action: { type: 'sheet', content: ReliefSheet, title: 'Get Relief' },
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
