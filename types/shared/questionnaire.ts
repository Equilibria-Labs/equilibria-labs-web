/**
 * WARNING: This type must be manually kept in sync with the backend.
 * If you modify this type, ensure the corresponding backend type is updated as well.
 */

import { Answer, QuestionnaireConfig } from '../questionnaire';

export type CompletedQuestionnaire = {
  answers: Answer[];
  questionnaire: QuestionnaireConfig;
  submittedAt: string; // ISO timestamp
  userId?: string; // Optional if you support anonymous submissions
};
