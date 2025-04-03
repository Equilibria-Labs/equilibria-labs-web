import { Sun, Book, Grid, User, LucideIcon } from 'lucide-react';

export type NavIcon = typeof Sun | typeof Book | typeof Grid | typeof User;

type NavigationAction = {
  type: 'navigation';
  path: string;
};

type SheetAction = {
  type: 'sheet';
  sheetId: string;
  title?: string;
};

export type NavConfigItem = {
  icon: LucideIcon;
  label: string;
  action: NavigationAction | SheetAction;
};
