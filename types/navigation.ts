import { Sun, Book, Grid, User } from 'lucide-react';

export type NavIcon = typeof Sun | typeof Book | typeof Grid | typeof User;

export type NavAction =
  | { type: 'navigation'; path: string }
  | { type: 'sheet'; content: React.ComponentType; title?: string };

export interface NavConfigItem {
  icon: React.ComponentType;
  label: string;
  action: NavAction;
}
