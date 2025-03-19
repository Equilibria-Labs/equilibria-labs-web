import { Sun, Book, Grid, User, LucideIcon } from 'lucide-react';

export type NavIcon = typeof Sun | typeof Book | typeof Grid | typeof User;

export type NavAction =
  | { type: 'navigation'; path: string }
  | { type: 'sheet'; content: React.ComponentType; title?: string };

export interface NavConfigItem {
  icon: LucideIcon;
  label: string;
  action: NavAction;
}
