'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

test('modulo returns the remainder', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(10, 4), 2);
  assert.equal(modulo(-7, 3), -1);
});

test('modulo rejects a zero divisor', () => {
  assert.throws(() => modulo(5, 0), {
    message: 'Cannot take modulo by zero.',
  });
});

test('power raises a base to an exponent', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(5, 0), 1);
  assert.equal(power(4, 0.5), 2);
});

test('squareRoot returns the non-negative square root', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(2.25), 1.5);
});

test('squareRoot rejects negative numbers', () => {
  assert.throws(() => squareRoot(-1), {
    message: 'Cannot take the square root of a negative number.',
  });
});

test('calculate dispatches the supported binary operations', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
  assert.equal(calculate(5, '%', 2), 1);
  assert.equal(calculate(2, '^', 3), 8);
});

test('calculate rejects unsupported operators', () => {
  assert.throws(() => calculate(2, '&', 3), {
    message: 'Supported operations are +, -, *, /, %, and ^.',
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
