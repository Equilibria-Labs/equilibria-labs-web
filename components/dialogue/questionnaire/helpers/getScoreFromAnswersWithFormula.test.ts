/// <reference types="jest" />
import {
  getScoreFromAnswersWithFormula,
  FormulaError,
} from './getScoreFromAnswersWithFormula';
import type { Answer } from '@/types';

// Add Jest types
import '@testing-library/jest-dom';

describe('getScoreFromAnswersWithFormula', () => {
  // Test basic arithmetic with question IDs
  test('correctly calculates basic arithmetic with question IDs', () => {
    const answers: Answer[] = [
      { questionId: 'q1', value: [2] },
      { questionId: 'q2', value: [3] },
      { questionId: 'q3', value: [4] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'q1 + q2 + q3')).toBe(9);
    expect(getScoreFromAnswersWithFormula(answers, 'q1 * q2')).toBe(6);
    expect(getScoreFromAnswersWithFormula(answers, 'q3 - q1')).toBe(2);
    expect(getScoreFromAnswersWithFormula(answers, 'q3 / q1')).toBe(2);
  });

  // Test mixing numeric literals with question IDs
  test('correctly handles mix of numeric literals and question IDs', () => {
    const answers: Answer[] = [
      { questionId: 'q1', value: [5] },
      { questionId: 'q2a', value: [2] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'q1 + 3')).toBe(8);
    expect(getScoreFromAnswersWithFormula(answers, '10 - q2a')).toBe(8);
    expect(getScoreFromAnswersWithFormula(answers, 'q1 * 2 + q2a')).toBe(12);
    expect(getScoreFromAnswersWithFormula(answers, '3 * q1 / q2a')).toBe(7.5);
  });

  // Test handling of missing answers
  test('handles missing answers by using 0', () => {
    const answers: Answer[] = [{ questionId: 'q1', value: [1] }];
    expect(getScoreFromAnswersWithFormula(answers, 'q1 + q2')).toBe(1); // q2 is missing
    expect(getScoreFromAnswersWithFormula(answers, 'q3 * q4')).toBe(0); // both missing
  });

  // Test decimal numbers
  test('correctly handles decimal numbers', () => {
    const answers: Answer[] = [
      { questionId: 'q1', value: [1.5] },
      { questionId: 'q2', value: [2.5] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'q1 + 2.5')).toBe(4);
    expect(getScoreFromAnswersWithFormula(answers, 'q1 * q2')).toBe(3.75);
  });

  // Test error cases
  describe('error handling', () => {
    test('throws error for invalid tokens', () => {
      const answers: Answer[] = [{ questionId: 'q1', value: [1] }];
      expect(() => getScoreFromAnswersWithFormula(answers, 'q1 + @')).toThrow(
        FormulaError
      );
      expect(() => getScoreFromAnswersWithFormula(answers, '1a + 2')).toThrow(
        FormulaError
      );
      expect(() => getScoreFromAnswersWithFormula(answers, 'abc')).toThrow(
        FormulaError
      );
    });

    test('throws error for division by zero', () => {
      const answers: Answer[] = [
        { questionId: 'q1', value: [1] },
        { questionId: 'q2', value: [0] },
      ];
      expect(() => getScoreFromAnswersWithFormula(answers, 'q1 / 0')).toThrow(
        'Division by zero'
      );
      expect(() => getScoreFromAnswersWithFormula(answers, 'q1 / q2')).toThrow(
        'Division by zero'
      );
    });

    test('throws error for non-numeric answer values', () => {
      const answers: Answer[] = [{ questionId: 'q1', value: ['not a number'] }];
      expect(() => getScoreFromAnswersWithFormula(answers, 'q1 + 1')).toThrow(
        FormulaError
      );
    });
  });

  // Test complex formulas
  test('correctly calculates complex formulas', () => {
    const answers: Answer[] = [
      { questionId: 'q1a', value: [2] },
      { questionId: 'q1b', value: [3] },
      { questionId: 'q2', value: [4] },
      { questionId: 'q3', value: [5] },
    ];
    expect(
      getScoreFromAnswersWithFormula(answers, 'q1a + q1b * q2 / 2 - q3')
    ).toBe(3); // 2 + (3 * 4 / 2) - 5 = 3
    expect(
      getScoreFromAnswersWithFormula(answers, '2 * q1a + 3 * q1b - q2 / q3')
    ).toBe(12.2); // (2 * 2) + (3 * 3) - (4 / 5) = 12.2
  });

  // Test whitespace handling
  test('handles various whitespace patterns', () => {
    const answers: Answer[] = [
      { questionId: 'q1', value: [2] },
      { questionId: 'q2', value: [3] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'q1+q2')).toBe(5);
    expect(getScoreFromAnswersWithFormula(answers, '  q1   +   q2  ')).toBe(5);
    expect(getScoreFromAnswersWithFormula(answers, 'q1 +\tq2')).toBe(5);
    expect(getScoreFromAnswersWithFormula(answers, 'q1 +\n q2')).toBe(5);
  });

  // Test multiple answer sets
  test('correctly sums scores across multiple answer sets', () => {
    const answers: Answer[] = [
      { questionId: 'q1', value: [2] },
      { questionId: 'q2', value: [3] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'q1 + q2')).toBe(5);
  });

  test('handles empty answer array', () => {
    const answers: Answer[] = [];
    expect(getScoreFromAnswersWithFormula(answers, 'q1 + q2')).toBe(0);
  });
});
