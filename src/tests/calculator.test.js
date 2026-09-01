'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
} = require('../calculator');

test('addition adds two numbers', () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(addition(-4, 9), 5);
  assert.equal(addition(1.5, 2.25), 3.75);
});

test('subtraction subtracts the second number from the first', () => {
  assert.equal(subtraction(10, 4), 6);
  assert.equal(subtraction(4, 10), -6);
  assert.equal(subtraction(5.5, 2.25), 3.25);
});

test('multiplication multiplies two numbers', () => {
  assert.equal(multiplication(45, 2), 90);
  assert.equal(multiplication(-3, 4), -12);
  assert.equal(multiplication(1.5, 2), 3);
});

test('division divides the first number by the second', () => {
  assert.equal(division(20, 5), 4);
  assert.equal(division(7, 2), 3.5);
  assert.equal(division(-12, 3), -4);
});

test('division rejects division by zero', () => {
  assert.throws(() => division(20, 0), {
    message: 'Cannot divide by zero.',
  });
});

test('calculate dispatches the four supported operations', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
});

test('calculate rejects unsupported operators', () => {
  assert.throws(() => calculate(2, '%', 3), {
    message: 'Supported operations are +, -, *, and /.',
  });
});

test('calculate rejects non-finite operands', () => {
  assert.throws(() => calculate(Number.NaN, '+', 3), {
    message: 'Both operands must be finite numbers.',
  });
  assert.throws(() => calculate(2, '+', Infinity), {
    message: 'Both operands must be finite numbers.',
  });
});

test('runCli parses valid command-line arguments', () => {
  assert.equal(runCli(['2', '+', '3']), 5);
  assert.equal(runCli(['10', '-', '4']), 6);
  assert.equal(runCli(['45', '*', '2']), 90);
  assert.equal(runCli(['20', '/', '5']), 4);
});

test('runCli rejects missing or extra arguments', () => {
  assert.throws(() => runCli([]), {
    message: 'Usage: node src/calculator.js <number> <operator> <number>',
  });
  assert.throws(() => runCli(['2', '+', '3', 'extra']), {
    message: 'Usage: node src/calculator.js <number> <operator> <number>',
  });
});

test('runCli rejects non-numeric operands', () => {
  assert.throws(() => runCli(['two', '+', '3']), {
    message: 'Both operands must be finite numbers.',
  });
});
