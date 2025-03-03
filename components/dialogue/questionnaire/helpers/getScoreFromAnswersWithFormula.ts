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
 * - Functions (min, avg)
 * - Parentheses for grouping
 * Example formula: "min(avg(sleep-worry + anxiety-level), 3)"
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
  if (!answers.length && !formulaString.match(/\d/)) return 0;

  // Count parentheses to ensure they match
  const openCount = (formulaString.match(/\(/g) || []).length;
  const closeCount = (formulaString.match(/\)/g) || []).length;
  if (openCount !== closeCount) {
    throw new FormulaError('Mismatched parentheses in formula');
  }

  // Split formula into tokens (functions, operators, parentheses, and question IDs)
  const tokens = formulaString
    .split(
      /(\bavg\b|\bmin\b|\+|-|\*|\/|\(|\)|,|\b\d*\.?\d+\b|[a-zA-Z][\w-]*|\S)/
    )
    .map(token => token.trim())
    .filter(token => token.length > 0);

  // Validate formula tokens
  const validOperators = ['+', '-', '*', '/', '(', ')', ',', 'min', 'avg'];
  const validQuestionIdPattern = /^[a-zA-Z][\w-]*$/;
  const validNumberPattern = /^-?\d*\.?\d+$/;

  // Pre-validate function syntax
  const parenStack = [];
  const functionStack = [];
  let lastToken = '';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Check for invalid tokens first
    if (!validOperators.includes(token)) {
      if (
        !validQuestionIdPattern.test(token) &&
        !validNumberPattern.test(token)
      ) {
        throw new FormulaError(
          `Invalid token "${token}" in formula. Must be a valid question ID (e.g. 'sleep-worry') or numeric value.`
        );
      }
      // Check for invalid combinations like "1a"
      if (lastToken.match(/\d/) && token.match(/^[a-zA-Z]/)) {
        throw new FormulaError(
          `Invalid token combination "${lastToken}${token}". Numbers cannot be immediately followed by letters.`
        );
      }
    }

    if (token === 'min' || token === 'avg') {
      functionStack.push({ type: token, level: parenStack.length });
      if (i + 1 >= tokens.length || tokens[i + 1] !== '(') {
        throw new FormulaError(`Expected "(" after ${token} function`);
      }
    } else if (token === '(') {
      parenStack.push(i);
    } else if (token === ')') {
      if (parenStack.length === 0) {
        throw new FormulaError('Mismatched parentheses');
      }
      if (
        functionStack.length > 0 &&
        functionStack[functionStack.length - 1].level === parenStack.length - 1
      ) {
        const currentFunction = functionStack.pop();
        if (currentFunction?.type === 'min') {
          // Check if we have exactly one comma at this level
          let hasComma = false;
          const start = parenStack[parenStack.length - 1];
          for (let j = start + 1; j < i; j++) {
            if (tokens[j] === ',') {
              if (hasComma) {
                throw new FormulaError(
                  'Invalid min function syntax: multiple commas'
                );
              }
              hasComma = true;
            }
          }
          if (!hasComma) {
            throw new FormulaError(
              'Invalid min function syntax: missing comma'
            );
          }
        } else if (currentFunction?.type === 'avg') {
          // Check for empty avg function
          const start = parenStack[parenStack.length - 1];
          if (i === start + 1) {
            throw new FormulaError(
              'Invalid avg function syntax: empty argument'
            );
          }
        }
      }
      parenStack.pop();
    } else if (token === ',') {
      if (
        functionStack.length === 0 ||
        functionStack[functionStack.length - 1].type !== 'min'
      ) {
        throw new FormulaError('Unexpected comma outside min function');
      }
      // Check for empty arguments
      if (
        tokens[i - 1] === '(' ||
        tokens[i + 1] === ')' ||
        tokens[i + 1] === ','
      ) {
        throw new FormulaError('Invalid min function syntax: empty argument');
      }
    }

    lastToken = token;
  }

  if (parenStack.length > 0) {
    throw new FormulaError('Mismatched parentheses');
  }

  // Convert tokens to values and evaluate
  const result = evaluateExpression(tokens, 0, answers);
  if (result.nextIndex < tokens.length) {
    throw new FormulaError('Invalid formula structure');
  }
  return Math.round(result.value * 1000) / 1000; // Round to 3 decimal places
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

    switch (token) {
      case 'min':
      case 'avg': {
        // Handle functions
        if (i + 1 >= tokens.length || tokens[i + 1] !== '(') {
          throw new FormulaError(`Expected "(" after ${token} function`);
        }
        // Skip the opening parenthesis
        i += 2;

        if (token === 'min') {
          // Evaluate first argument
          const firstArg = evaluateExpression(tokens, i, answers);
          i = firstArg.nextIndex;
          if (i >= tokens.length || tokens[i] !== ',') {
            throw new FormulaError('Expected "," in min function');
          }
          i++;
          // Evaluate second argument
          const secondArg = evaluateExpression(tokens, i, answers);
          i = secondArg.nextIndex;
          if (i >= tokens.length || tokens[i] !== ')') {
            throw new FormulaError('Expected ")" in min function');
          }
          values.push(Math.min(firstArg.value, secondArg.value));
        } else {
          // avg function
          // First, collect all values in the expression
          const subValues: number[] = [];
          let subIndex = i;
          let parenCount = 0;

          while (subIndex < tokens.length) {
            const subToken = tokens[subIndex];
            if (subToken === '(') {
              parenCount++;
            } else if (subToken === ')') {
              parenCount--;
              if (parenCount < 0) break;
            }

            if (/^[a-zA-Z][\w-]*$/.test(subToken)) {
              const answer = answers.find(a => a.step.questionId === subToken);
              if (answer && typeof answer.value[0] === 'number') {
                const value = answer.value[0];
                if (value !== 0) {
                  subValues.push(value);
                }
              }
            }
            subIndex++;
          }

          // Now evaluate the entire expression
          const subResult = evaluateExpression(tokens, i, answers);
          i = subResult.nextIndex;
          if (i >= tokens.length || tokens[i] !== ')') {
            throw new FormulaError('Expected ")" in avg function');
          }

          // Calculate average using non-zero values
          const nonZeroCount = subValues.length || 1; // Avoid division by zero
          values.push(subResult.value / nonZeroCount);
        }
        i++;
        break;
      }
      case '(': {
        // Recursively evaluate sub-expression
        const subResult = evaluateExpression(tokens, i + 1, answers);
        values.push(subResult.value);
        i = subResult.nextIndex + 1; // Increment past the closing parenthesis
        break;
      }
      case ')': {
        // End of sub-expression
        return {
          value: calculateResult(values, operators),
          nextIndex: i,
        };
      }
      case ',': {
        // End of min function argument
        return {
          value: calculateResult(values, operators),
          nextIndex: i,
        };
      }
      case '+':
      case '-':
      case '*':
      case '/': {
        operators.push(token);
        i++;
        break;
      }
      default: {
        // Convert token to value
        let value: number;
        if (/^[a-zA-Z][\w-]*$/.test(token)) {
          const answer = answers.find(a => a.step.questionId === token);
          if (!answer) {
            value = 0; // Missing answers default to 0
          } else {
            const answerValue = answer.value[0]?.numericValue;
            if (typeof answerValue !== 'number' || isNaN(answerValue)) {
              throw new FormulaError(
                `Invalid answer value for question "${token}". Answer must be numeric.`
              );
            }
            value = answerValue;
          }
        } else {
          value = Number(token);
          if (isNaN(value)) {
            throw new FormulaError(
              `Invalid numeric value for token "${token}". Check that question answers are numeric.`
            );
          }
        }
        values.push(value);
        i++;
      }
    }
  }

  return {
    value: calculateResult(values, operators),
    nextIndex: i,
  };
}

function calculateResult(values: number[], operators: string[]): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0];

  // Create copies of arrays to avoid modifying originals
  const nums = [...values];
  const ops = [...operators];

  // First pass: handle multiplication and division
  let i = 0;
  while (i < ops.length) {
    if (ops[i] === '*' || ops[i] === '/') {
      const left = nums[i];
      const right = nums[i + 1];
      let result: number;

      if (ops[i] === '*') {
        result = left * right;
      } else {
        if (right === 0) {
          throw new FormulaError('Division by zero is not allowed');
        }
        result = left / right;
      }

      nums.splice(i, 2, result);
      ops.splice(i, 1);
    } else {
      i++;
    }
  }

  // Second pass: handle addition and subtraction
  let result = nums[0];
  for (i = 0; i < ops.length; i++) {
    const right = nums[i + 1];
    if (ops[i] === '+') {
      result += right;
    } else if (ops[i] === '-') {
      result -= right;
    }
  }

  return result;
}
