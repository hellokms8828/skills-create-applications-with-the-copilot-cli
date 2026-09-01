#!/usr/bin/env node

'use strict';

// Supports addition, subtraction, multiplication, and division.
function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a / b;
}

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be finite numbers.');
  }

  switch (operator) {
    case '+':
      return addition(left, right);
    case '-':
      return subtraction(left, right);
    case '*':
      return multiplication(left, right);
    case '/':
      return division(left, right);
    default:
      throw new Error('Supported operations are +, -, *, and /.');
  }
}

function runCli(args) {
  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <operator> <number>');
  }

  const [leftInput, operator, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  return calculate(left, operator, right);
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
};
