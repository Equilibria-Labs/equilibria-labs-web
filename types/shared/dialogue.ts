/**
 * WARNING: This type must be manually kept in sync with the backend.
 * If you modify this type, ensure the corresponding backend type is updated as well.
 */

import { Answer } from '../questionnaire';

export type Dialogue = {
  dialogueId: string;
  answers: Answer[];
  title: string;
  version: string;
  status: 'incomplete' | 'complete' | 'submitted';
  submittedAt?: string; // ISO timestamp
};
