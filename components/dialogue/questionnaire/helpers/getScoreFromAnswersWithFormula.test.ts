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
      { questionId: 'sleep-worry', value: [2] },
      { questionId: 'anxiety-level', value: [3] },
      { questionId: 'depression-score', value: [4] },
    ];
    expect(
      getScoreFromAnswersWithFormula(
        answers,
        'sleep-worry + anxiety-level + depression-score'
      )
    ).toBe(9);
    expect(
      getScoreFromAnswersWithFormula(answers, 'sleep-worry * anxiety-level')
    ).toBe(6);
    expect(
      getScoreFromAnswersWithFormula(answers, 'depression-score - sleep-worry')
    ).toBe(2);
    expect(
      getScoreFromAnswersWithFormula(answers, 'depression-score / sleep-worry')
    ).toBe(2);
  });

  // Test mixing numeric literals with question IDs
  test('correctly handles mix of numeric literals and question IDs', () => {
    const answers: Answer[] = [
      { questionId: 'mood-score', value: [5] },
      { questionId: 'stress-level', value: [2] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'mood-score + 3')).toBe(8);
    expect(getScoreFromAnswersWithFormula(answers, '10 - stress-level')).toBe(
      8
    );
    expect(
      getScoreFromAnswersWithFormula(answers, 'mood-score * 2 + stress-level')
    ).toBe(12);
    expect(
      getScoreFromAnswersWithFormula(answers, '3 * mood-score / stress-level')
    ).toBe(7.5);
  });

  // Test handling of missing answers
  test('handles missing answers by using 0', () => {
    const answers: Answer[] = [{ questionId: 'sleep-quality', value: [1] }];
    expect(
      getScoreFromAnswersWithFormula(answers, 'sleep-quality + energy-level')
    ).toBe(1); // energy-level is missing
    expect(
      getScoreFromAnswersWithFormula(answers, 'focus-score * motivation-level')
    ).toBe(0); // both missing
  });

  // Test decimal numbers
  test('correctly handles decimal numbers', () => {
    const answers: Answer[] = [
      { questionId: 'focus-level', value: [1.5] },
      { questionId: 'energy-score', value: [2.5] },
    ];
    expect(getScoreFromAnswersWithFormula(answers, 'focus-level + 2.5')).toBe(
      4
    );
    expect(
      getScoreFromAnswersWithFormula(answers, 'focus-level * energy-score')
    ).toBe(3.75);
  });

  // Test error cases
  describe('error handling', () => {
    test('throws error for invalid tokens', () => {
      const answers: Answer[] = [{ questionId: 'sleep-score', value: [1] }];
      expect(() =>
        getScoreFromAnswersWithFormula(answers, 'sleep-score + @')
      ).toThrow(FormulaError);
      expect(() => getScoreFromAnswersWithFormula(answers, '1a + 2')).toThrow(
        FormulaError
      );
      expect(() =>
        getScoreFromAnswersWithFormula(answers, '@invalid-id')
      ).toThrow(FormulaError);
    });

    test('throws error for division by zero', () => {
      const answers: Answer[] = [
        { questionId: 'numerator', value: [1] },
        { questionId: 'denominator', value: [0] },
      ];
      expect(() =>
        getScoreFromAnswersWithFormula(answers, 'numerator / 0')
      ).toThrow('Division by zero');
      expect(() =>
        getScoreFromAnswersWithFormula(answers, 'numerator / denominator')
      ).toThrow('Division by zero');
    });

    test('throws error for non-numeric answer values', () => {
      const answers: Answer[] = [
        { questionId: 'text-input', value: ['not a number'] },
      ];
      expect(() =>
        getScoreFromAnswersWithFormula(answers, 'text-input + 1')
      ).toThrow(FormulaError);
    });
  });

  // Test complex formulas
  test('correctly calculates complex formulas', () => {
    const answers: Answer[] = [
      { questionId: 'sleep-duration', value: [2] },
      { questionId: 'sleep-quality', value: [3] },
      { questionId: 'anxiety-level', value: [4] },
      { questionId: 'stress-score', value: [5] },
    ];
    expect(
      getScoreFromAnswersWithFormula(
        answers,
        'sleep-duration + sleep-quality * anxiety-level / 2 - stress-score'
      )
    ).toBe(3); // 2 + (3 * 4 / 2) - 5 = 3
    expect(
      getScoreFromAnswersWithFormula(
        answers,
        '2 * sleep-duration + 3 * sleep-quality - anxiety-level / stress-score'
      )
    ).toBe(12.2); // (2 * 2) + (3 * 3) - (4 / 5) = 12.2
  });

  // Test whitespace handling
  test('handles various whitespace patterns', () => {
    const answers: Answer[] = [
      { questionId: 'mood-level', value: [2] },
      { questionId: 'energy-level', value: [3] },
    ];
    expect(
      getScoreFromAnswersWithFormula(answers, 'mood-level+energy-level')
    ).toBe(5);
    expect(
      getScoreFromAnswersWithFormula(
        answers,
        '  mood-level   +   energy-level  '
      )
    ).toBe(5);
    expect(
      getScoreFromAnswersWithFormula(answers, 'mood-level +\tenergy-level')
    ).toBe(5);
    expect(
      getScoreFromAnswersWithFormula(answers, 'mood-level +\n energy-level')
    ).toBe(5);
  });

  // Test multiple answer sets
  test('correctly sums scores across multiple answer sets', () => {
    const answers: Answer[] = [
      { questionId: 'physical-score', value: [2] },
      { questionId: 'mental-score', value: [3] },
    ];
    expect(
      getScoreFromAnswersWithFormula(answers, 'physical-score + mental-score')
    ).toBe(5);
  });

  test('handles empty answer array', () => {
    const answers: Answer[] = [];
    expect(
      getScoreFromAnswersWithFormula(answers, 'sleep-score + anxiety-score')
    ).toBe(0);
  });

  describe('parentheses handling', () => {
    it('should correctly evaluate formulas with parentheses', () => {
      const answers: Answer[] = [
        { questionId: 'physical-health', value: [1] },
        { questionId: 'mental-health', value: [2] },
        { questionId: 'social-health', value: [3] },
      ];

      // Test basic parentheses
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          '(physical-health + mental-health) * 2'
        )
      ).toBe(6);

      // Test nested parentheses
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          '(physical-health + mental-health) * (social-health + 1)'
        )
      ).toBe(12);

      // Test decimal multiplication (using toBeCloseTo for floating point comparison)
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          '(physical-health + mental-health + social-health) * 0.6'
        )
      ).toBeCloseTo(3.6, 10);
    });

    it('should handle decimal multipliers correctly', () => {
      const answers: Answer[] = [{ questionId: 'total-score', value: [10] }];

      expect(getScoreFromAnswersWithFormula(answers, 'total-score * 0.6')).toBe(
        6
      );
      expect(
        getScoreFromAnswersWithFormula(answers, '(total-score) * 0.6')
      ).toBe(6);
    });

    it('should throw error for mismatched parentheses', () => {
      const answers: Answer[] = [{ questionId: 'test-score', value: [1] }];

      expect(() => {
        getScoreFromAnswersWithFormula(answers, '(test-score + 2');
      }).toThrow(FormulaError);

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'test-score + 2)');
      }).toThrow(FormulaError);
    });
  });
});
