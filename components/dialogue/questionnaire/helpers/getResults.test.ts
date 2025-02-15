/// <reference types="jest" />
import { calculateResults, FormulaError } from './getResults';
import type { Answer } from '@/types';

// Add Jest types
import '@testing-library/jest-dom';

describe('calculateResults', () => {
  // Test basic arithmetic with question IDs
  test('correctly calculates basic arithmetic with question IDs', () => {
    const answers = {
      q1: [2],
      q2: [3],
      q3: [4],
    };
    expect(calculateResults(answers, 'q1 + q2 + q3')).toBe(9);
    expect(calculateResults(answers, 'q1 * q2')).toBe(6);
    expect(calculateResults(answers, 'q3 - q1')).toBe(2);
    expect(calculateResults(answers, 'q3 / q1')).toBe(2);
  });

  // Test mixing numeric literals with question IDs
  test('correctly handles mix of numeric literals and question IDs', () => {
    const answers = {
      q1: [5],
      q2a: [2],
    };
    expect(calculateResults(answers, 'q1 + 3')).toBe(8);
    expect(calculateResults(answers, '10 - q2a')).toBe(8);
    expect(calculateResults(answers, 'q1 * 2 + q2a')).toBe(12);
    expect(calculateResults(answers, '3 * q1 / q2a')).toBe(7.5);
  });

  // Test handling of missing answers
  test('handles missing answers by using 0', () => {
    const answers = {
      q1: [1],
    };
    expect(calculateResults(answers, 'q1 + q2')).toBe(1); // q2 is missing
    expect(calculateResults(answers, 'q3 * q4')).toBe(0); // both missing
  });

  // Test decimal numbers
  test('correctly handles decimal numbers', () => {
    const answers = {
      q1: [1.5],
      q2: [2.5],
    };
    expect(calculateResults(answers, 'q1 + 2.5')).toBe(4);
    expect(calculateResults(answers, 'q1 * q2')).toBe(3.75);
  });

  // Test error cases
  describe('error handling', () => {
    test('throws error for invalid tokens', () => {
      const answers = { q1: [1] };
      expect(() => calculateResults(answers, 'q1 + @')).toThrow(FormulaError);
      expect(() => calculateResults(answers, '1a + 2')).toThrow(FormulaError);
      expect(() => calculateResults(answers, 'abc')).toThrow(FormulaError);
    });

    test('throws error for division by zero', () => {
      const answers = {
        q1: [1],
        q2: [0],
      };
      expect(() => calculateResults(answers, 'q1 / 0')).toThrow(
        'Division by zero'
      );
      expect(() => calculateResults(answers, 'q1 / q2')).toThrow(
        'Division by zero'
      );
    });

    test('throws error for non-numeric answer values', () => {
      const answers = {
        q1: ['not a number' as any],
      };
      expect(() => calculateResults(answers, 'q1 + 1')).toThrow(FormulaError);
    });
  });

  // Test complex formulas
  test('correctly calculates complex formulas', () => {
    const answers = {
      q1a: [2],
      q1b: [3],
      q2: [4],
      q3: [5],
    };
    expect(calculateResults(answers, 'q1a + q1b * q2 / 2 - q3')).toBe(3); // 2 + (3 * 4 / 2) - 5 = 3
    expect(calculateResults(answers, '2 * q1a + 3 * q1b - q2 / q3')).toBe(12.2); // (2 * 2) + (3 * 3) - (4 / 5) = 12.2
  });

  // Test whitespace handling
  test('handles various whitespace patterns', () => {
    const answers = {
      q1: [2],
      q2: [3],
    };
    expect(calculateResults(answers, 'q1+q2')).toBe(5);
    expect(calculateResults(answers, '  q1   +   q2  ')).toBe(5);
    expect(calculateResults(answers, 'q1 +\tq2')).toBe(5);
    expect(calculateResults(answers, 'q1 +\n q2')).toBe(5);
  });
});
