import { Answer } from '@/types';

export class FormulaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormulaError';
  }
}

/**
 * Evaluates a formula string using values from answer set.
 * Formula string can contain:
 * - Question IDs (with or without 'q' prefix, e.g. 'q1', '1', 'q2a', '2a')
 * - Numeric literals (e.g. '3', '4.5')
 * - Basic arithmetic operators (+, -, *, /)
 * Example formula: "1a + 1b + 3 * 2 + 4"
 *
 * @param answers Array of answers mapping question IDs to their selected choice values
 * @param formulaString String representing the calculation formula
 * @returns The calculated result
 * @throws {FormulaError} If the formula contains invalid tokens or syntax
 */
export function getScoreFromAnswersWithFormula(
  answers: Answer[],
  formulaString: string
): number {
  // If no answers provided, return 0
  if (!answers.length) return 0;

  // Split formula into tokens (operators and question IDs)
  const tokens = formulaString
    .split(/([+\-*/])/)
    .map(token => token.trim())
    .filter(token => token.length > 0);

  // Validate formula tokens
  const validOperators = ['+', '-', '*', '/'];
  const validQuestionIdPattern = /^q\d+[a-zA-Z]*$/;
  const validNumberPattern = /^\d+(\.\d+)?$/;

  for (const token of tokens) {
    if (!validOperators.includes(token)) {
      if (
        !validQuestionIdPattern.test(token) &&
        !validNumberPattern.test(token)
      ) {
        throw new FormulaError(
          `Invalid token "${token}" in formula. Must be a valid question ID (starting with 'q') or numeric value.`
        );
      }
    }
  }

  // Convert tokens to values
  const values: number[] = [];
  const operators: string[] = [];

  for (const token of tokens) {
    if (validOperators.includes(token)) {
      operators.push(token);
    } else {
      let value: number;
      if (validQuestionIdPattern.test(token)) {
        const answer = answers.find(a => a.questionId === token);
        const answerValues = answer?.value || [0];

        if (typeof answerValues[0] !== 'number') {
          throw new FormulaError(
            `Invalid answer value for question "${token}". Answer must be numeric.`
          );
        }

        value = answerValues[0];
      } else {
        value = Number(token);
      }

      if (isNaN(value)) {
        throw new FormulaError(
          `Invalid numeric value for token "${token}". Check that question answers are numeric.`
        );
      }
      values.push(value);
    }
  }

  // First pass: handle multiplication and division
  let i = 0;
  while (i < operators.length) {
    if (operators[i] === '*' || operators[i] === '/') {
      const left = values[i];
      const right = values[i + 1];
      let result: number;

      if (operators[i] === '*') {
        result = left * right;
      } else {
        if (right === 0) {
          throw new FormulaError('Division by zero is not allowed');
        }
        result = left / right;
      }

      // Replace the two values with their result
      values.splice(i, 2, result);
      operators.splice(i, 1);
    } else {
      i++;
    }
  }

  // Second pass: handle addition and subtraction
  let result = values[0];
  for (i = 0; i < operators.length; i++) {
    const right = values[i + 1];
    if (operators[i] === '+') {
      result += right;
    } else if (operators[i] === '-') {
      result -= right;
    }
  }

  return result;
}
