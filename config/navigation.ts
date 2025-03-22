import { Sun, Grid, User, Lightbulb } from 'lucide-react';
import { NavConfigItem } from '@/types/navigation';
import QuickReliefSheet from '@/components/sheets/QuickReliefSheet';

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
    label: 'Quick Relief',
    action: { type: 'sheet', content: QuickReliefSheet, title: 'Quick Relief' },
  },
  {
    icon: User,
    label: 'You',
    action: { type: 'navigation', path: '/you' },
  },
];

export const quickReliefNavConfig: NavConfigItem[] = [
  {
    icon: Lightbulb,
    label: 'Shift Your Thinking',
    action: { type: 'navigation', path: '/coping-cards' },
  },
];
