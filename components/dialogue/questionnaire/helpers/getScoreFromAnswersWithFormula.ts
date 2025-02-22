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
 * - Question IDs (e.g. 'sleep-worry', 'anxiety-level')
 * - Numeric literals (e.g. '3', '4.5')
 * - Basic arithmetic operators (+, -, *, /)
 * - Parentheses for grouping
 * Example formula: "(sleep-worry + anxiety-level) * 0.6"
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

  // Count parentheses to ensure they match
  const openCount = (formulaString.match(/\(/g) || []).length;
  const closeCount = (formulaString.match(/\)/g) || []).length;
  if (openCount !== closeCount) {
    throw new FormulaError('Mismatched parentheses in formula');
  }

  // Split formula into tokens (operators, parentheses, and question IDs)
  const tokens = formulaString
    .split(/([+\-*/()])/g)
    .map(token => token.trim())
    .filter(token => token.length > 0);

  // Validate formula tokens
  const validOperators = ['+', '-', '*', '/', '(', ')'];
  const validQuestionIdPattern = /^[a-zA-Z][\w-]*$/;
  const validNumberPattern = /^\d+(\.\d+)?$/;

  for (const token of tokens) {
    if (!validOperators.includes(token)) {
      if (
        !validQuestionIdPattern.test(token) &&
        !validNumberPattern.test(token)
      ) {
        throw new FormulaError(
          `Invalid token "${token}" in formula. Must be a valid question ID (e.g. 'sleep-worry') or numeric value.`
        );
      }
    }
  }

  // Convert tokens to values and evaluate
  const result = evaluateExpression(tokens, 0, answers);
  if (result.nextIndex < tokens.length) {
    throw new FormulaError('Invalid formula structure');
  }
  return result.value;
}

interface EvaluationResult {
  value: number;
  nextIndex: number;
}

function evaluateExpression(
  tokens: string[],
  startIndex: number,
  answers: Answer[]
): EvaluationResult {
  const values: number[] = [];
  const operators: string[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token === '(') {
      // Recursively evaluate sub-expression
      const subResult = evaluateExpression(tokens, i + 1, answers);
      values.push(subResult.value);
      i = subResult.nextIndex;
    } else if (token === ')') {
      // End of sub-expression
      return {
        value: calculateResult(values, operators),
        nextIndex: i + 1,
      };
    } else if (['+', '-', '*', '/'].includes(token)) {
      operators.push(token);
      i++;
    } else {
      // Convert token to value
      let value: number;
      if (/^[a-zA-Z][\w-]*$/.test(token)) {
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
      i++;
    }
  }

  return {
    value: calculateResult(values, operators),
    nextIndex: i,
  };
}

function calculateResult(values: number[], operators: string[]): number {
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
