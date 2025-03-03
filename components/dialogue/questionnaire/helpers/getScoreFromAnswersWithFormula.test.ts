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
      {
        step: {
          questionId: 'sleep-worry',
          choices: [],
          stepId: 'sleep-worry',
          type: 'single-choice',
        },
        value: [{ numericValue: 2 }],
      },
      {
        step: {
          questionId: 'anxiety-level',
          choices: [],
          stepId: 'anxiety-level',
          type: 'single-choice',
        },
        value: [{ numericValue: 3 }],
      },
      {
        step: {
          questionId: 'depression-score',
          choices: [],
          stepId: 'depression-score',
          type: 'single-choice',
        },
        value: [{ numericValue: 4 }],
      },
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
      {
        step: {
          questionId: 'mood-score',
          choices: [],
          stepId: 'mood-score',
          type: 'single-choice',
        },
        value: [{ numericValue: 5 }],
      },
      {
        step: {
          questionId: 'stress-level',
          choices: [],
          stepId: 'stress-level',
          type: 'single-choice',
        },
        value: [{ numericValue: 2 }],
      },
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
    const answers: Answer[] = [
      {
        step: {
          questionId: 'sleep-quality',
          choices: [],
          stepId: 'sleep-quality',
          type: 'single-choice',
        },
        value: [{ numericValue: 1 }],
      },
    ];
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
      {
        step: {
          questionId: 'focus-level',
          choices: [],
          stepId: 'focus-level',
          type: 'single-choice',
        },
        value: [{ numericValue: 1.5 }],
      },
      {
        step: {
          questionId: 'energy-score',
          choices: [],
          stepId: 'energy-score',
          type: 'single-choice',
        },
        value: [{ numericValue: 2.5 }],
      },
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
      const answers: Answer[] = [
        {
          step: {
            questionId: 'sleep-score',
            choices: [],
            stepId: 'sleep-score',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
      ];
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
        {
          step: {
            questionId: 'numerator',
            choices: [],
            stepId: 'numerator',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
        {
          step: {
            questionId: 'denominator',
            choices: [],
            stepId: 'denominator',
            type: 'single-choice',
          },
          value: [{ numericValue: 0 }],
        },
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
        {
          step: {
            questionId: 'text-input',
            choices: [],
            stepId: 'text-input',
            type: 'single-choice',
          },
          value: [{ stringValue: 'not a number' }],
        },
      ];
      expect(() =>
        getScoreFromAnswersWithFormula(answers, 'text-input + 1')
      ).toThrow(FormulaError);
    });
  });

  // Test complex formulas
  test('correctly calculates complex formulas', () => {
    const answers: Answer[] = [
      {
        step: {
          questionId: 'sleep-duration',
          choices: [],
          stepId: 'sleep-duration',
          type: 'single-choice',
        },
        value: [{ numericValue: 2 }],
      },
      {
        step: {
          questionId: 'sleep-quality',
          choices: [],
          stepId: 'sleep-quality',
          type: 'single-choice',
        },
        value: [{ numericValue: 3 }],
      },
      {
        step: {
          questionId: 'anxiety-level',
          choices: [],
          stepId: 'anxiety-level',
          type: 'single-choice',
        },
        value: [{ numericValue: 4 }],
      },
      {
        step: {
          questionId: 'stress-score',
          choices: [],
          stepId: 'stress-score',
          type: 'single-choice',
        },
        value: [{ numericValue: 5 }],
      },
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
      {
        step: {
          questionId: 'mood-level',
          choices: [],
          stepId: 'mood-level',
          type: 'single-choice',
        },
        value: [{ numericValue: 2 }],
      },
      {
        step: {
          questionId: 'energy-level',
          choices: [],
          stepId: 'energy-level',
          type: 'single-choice',
        },
        value: [{ numericValue: 3 }],
      },
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
      {
        step: {
          questionId: 'physical-score',
          choices: [],
          stepId: 'physical-score',
          type: 'single-choice',
        },
        value: [{ numericValue: 2 }],
      },
      {
        step: {
          questionId: 'mental-score',
          choices: [],
          stepId: 'mental-score',
          type: 'single-choice',
        },
        value: [{ numericValue: 3 }],
      },
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
        {
          step: {
            questionId: 'physical-health',
            choices: [],
            stepId: 'physical-health',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
        {
          step: {
            questionId: 'mental-health',
            choices: [],
            stepId: 'mental-health',
            type: 'single-choice',
          },
          value: [{ numericValue: 2 }],
        },
        {
          step: {
            questionId: 'social-health',
            choices: [],
            stepId: 'social-health',
            type: 'single-choice',
          },
          value: [{ numericValue: 3 }],
        },
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
      const answers: Answer[] = [
        {
          step: {
            questionId: 'total-score',
            choices: [],
            stepId: 'total-score',
            type: 'single-choice',
          },
          value: [{ numericValue: 10 }],
        },
      ];

      expect(getScoreFromAnswersWithFormula(answers, 'total-score * 0.6')).toBe(
        6
      );
      expect(
        getScoreFromAnswersWithFormula(answers, '(total-score) * 0.6')
      ).toBe(6);
    });

    it('should throw error for mismatched parentheses', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'test-score',
            choices: [],
            stepId: 'test-score',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
      ];

      expect(() => {
        getScoreFromAnswersWithFormula(answers, '(test-score + 2');
      }).toThrow(FormulaError);

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'test-score + 2)');
      }).toThrow(FormulaError);
    });
  });

  describe('min function handling', () => {
    it('should correctly evaluate min function with two arguments', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'score-a',
            choices: [],
            stepId: 'score-a',
            type: 'single-choice',
          },
          value: [{ numericValue: 5 }],
        },
        {
          step: {
            questionId: 'score-b',
            choices: [],
            stepId: 'score-b',
            type: 'single-choice',
          },
          value: [{ numericValue: 3 }],
        },
      ];

      expect(
        getScoreFromAnswersWithFormula(answers, 'min(score-a, score-b)')
      ).toBe(3);
      expect(getScoreFromAnswersWithFormula(answers, 'min(score-a, 2)')).toBe(
        2
      );
      expect(getScoreFromAnswersWithFormula(answers, 'min(6, score-b)')).toBe(
        3
      );
      expect(getScoreFromAnswersWithFormula(answers, 'min(5, 3)')).toBe(3);
    });

    it('should handle min function with expressions', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'score-a',
            choices: [],
            stepId: 'score-a',
            type: 'single-choice',
          },
          value: [{ numericValue: 2 }],
        },
        {
          step: {
            questionId: 'score-b',
            choices: [],
            stepId: 'score-b',
            type: 'single-choice',
          },
          value: [{ numericValue: 3 }],
        },
        {
          step: {
            questionId: 'score-c',
            choices: [],
            stepId: 'score-c',
            type: 'single-choice',
          },
          value: [{ numericValue: 4 }],
        },
      ];

      expect(
        getScoreFromAnswersWithFormula(
          answers,
          'min(score-a + score-b, score-c)'
        )
      ).toBe(4);
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          'min(score-a + score-b + score-c, 6)'
        )
      ).toBe(6);
    });

    it('should handle complex formulas with min function', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'item1',
            choices: [],
            stepId: 'item1',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
        {
          step: {
            questionId: 'item2',
            choices: [],
            stepId: 'item2',
            type: 'single-choice',
          },
          value: [{ numericValue: 2 }],
        },
        {
          step: {
            questionId: 'item3',
            choices: [],
            stepId: 'item3',
            type: 'single-choice',
          },
          value: [{ numericValue: 3 }],
        },
      ];

      // Test sum of items capped at 3
      expect(
        getScoreFromAnswersWithFormula(answers, 'min(item1 + item2 + item3, 3)')
      ).toBe(3);

      // Test multiple min functions in one formula
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          'min(item1 + item2, 2) + min(item2 + item3, 3)'
        )
      ).toBe(5);

      // Test min function and parentheses together
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          '(item1 + item2) * 2 + min(item2 + item3, 3)'
        )
      ).toBe(9); // (1 + 2) * 2 + min(2 + 3, 3) = 6 + 3 = 9

      // Test nested expressions with both min and parentheses
      expect(
        getScoreFromAnswersWithFormula(
          answers,
          'min((item1 + item2) * 2, 5) + (item3 * 2)'
        )
      ).toBe(11); // min((1 + 2) * 2, 5) + (3 * 2) = 5 + 6 = 11
    });

    it('should throw error for invalid min function syntax', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'score',
            choices: [],
            stepId: 'score',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
      ];

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'min(score, )');
      }).toThrow(FormulaError);

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'min(score)');
      }).toThrow(FormulaError);

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'min score, 3)');
      }).toThrow(FormulaError);
    });
  });

  describe('avg function handling', () => {
    it('should correctly calculate average of multiple values', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'item1',
            choices: [],
            stepId: 'item1',
            type: 'single-choice',
          },
          value: [{ numericValue: 2 }],
        },
        {
          step: {
            questionId: 'item2',
            choices: [],
            stepId: 'item2',
            type: 'single-choice',
          },
          value: [{ numericValue: 4 }],
        },
        {
          step: {
            questionId: 'item3',
            choices: [],
            stepId: 'item3',
            type: 'single-choice',
          },
          value: [{ numericValue: 6 }],
        },
      ];

      expect(
        getScoreFromAnswersWithFormula(answers, 'avg(item1 + item2 + item3)')
      ).toBe(4); // (2 + 4 + 6) / 3 = 4

      expect(
        getScoreFromAnswersWithFormula(answers, 'avg(item1 + item2)')
      ).toBe(3); // (2 + 4) / 2 = 3
    });

    it('should handle avg function with expressions', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'score1',
            choices: [],
            stepId: 'score1',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
        {
          step: {
            questionId: 'score2',
            choices: [],
            stepId: 'score2',
            type: 'single-choice',
          },
          value: [{ numericValue: 2 }],
        },
        {
          step: {
            questionId: 'score3',
            choices: [],
            stepId: 'score3',
            type: 'single-choice',
          },
          value: [{ numericValue: 3 }],
        },
      ];

      expect(
        getScoreFromAnswersWithFormula(
          answers,
          'min(avg(score1 + score2 + score3), 2)'
        )
      ).toBe(2); // min((1 + 2 + 3) / 3, 2) = min(2, 2) = 2
    });

    it('should handle zero values correctly in average', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'val1',
            choices: [],
            stepId: 'val1',
            type: 'single-choice',
          },
          value: [{ numericValue: 0 }],
        },
        {
          step: {
            questionId: 'val2',
            choices: [],
            stepId: 'val2',
            type: 'single-choice',
          },
          value: [{ numericValue: 4 }],
        },
        {
          step: {
            questionId: 'val3',
            choices: [],
            stepId: 'val3',
            type: 'single-choice',
          },
          value: [{ numericValue: 8 }],
        },
      ];

      expect(
        getScoreFromAnswersWithFormula(answers, 'avg(val1 + val2 + val3)')
      ).toBe(6); // (4 + 8) / 2 = 6 (ignoring zero values)
    });

    it('should handle missing values correctly in average', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'present1',
            choices: [],
            stepId: 'present1',
            type: 'single-choice',
          },
          value: [{ numericValue: 3 }],
        },
        {
          step: {
            questionId: 'present2',
            choices: [],
            stepId: 'present2',
            type: 'single-choice',
          },
          value: [{ numericValue: 6 }],
        },
      ];

      expect(
        getScoreFromAnswersWithFormula(
          answers,
          'avg(present1 + missing1 + present2)'
        )
      ).toBe(4.5); // (3 + 6) / 2 = 4.5 (ignoring missing value)
    });

    it('should throw error for invalid avg function syntax', () => {
      const answers: Answer[] = [
        {
          step: {
            questionId: 'score',
            choices: [],
            stepId: 'score',
            type: 'single-choice',
          },
          value: [{ numericValue: 1 }],
        },
      ];

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'avg(,)');
      }).toThrow(FormulaError);

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'avg()');
      }).toThrow(FormulaError);

      expect(() => {
        getScoreFromAnswersWithFormula(answers, 'avg score)');
      }).toThrow(FormulaError);
    });
  });
});
