const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
  // Setup Function: The setup() function is used to initialize the solver object before each test within the suite. 
  // This ensures that solver is reset to a clean state before running each test, which is good practice to avoid test interference.
  setup(() => {
    solver = new Solver();
  });

  // #1
  test('Test to validate a valid puzzle string of 81 characters exactly', () => {

    assert.equal(solver.validate("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."), null);
  })

  // #2
  test('Test to validate a puzzle string with invalid characters', () => {
    assert.equal(solver.validate("xxx..2.84..6.12.7.2xxx.....9..1....8.2.3674.3.7.2xxx"), 'Invalid characters in puzzle');
  })

  // #3
  test('Test to validate a puzzle string that is not 81 characters in length', () => {
    assert.equal(solver.validate("1.5..2.84..6.12.7.2..5.....9..1....8.2.3674.3.7.2..9."), 'Expected puzzle to be 81 characters long');
  })

  // #4
  test('Logic handles a valid row placement', () => {
    assert.equal(solver.checkRowPlacement(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      0,
      0,
      '7' // 7 is an valid value
    ), true);
  })

  // #5
  test('Logic handles an invalid row placement', () => {
    assert.equal(solver.checkRowPlacement(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      0,
      0,
      '9' // 9 is an invalid value
    ), false);
  })

  // #6
  test('Logic handles a valid column placement', () => {
    assert.equal(solver.checkColPlacement(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      0,
      0,
      '7' // 7 is an valid value
    ), true);
  })

  // #7
  test('Logic handles an invalid column placement', () => {
    assert.equal(solver.checkColPlacement(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      0,
      0,
      '8' // 8 is an invalid value
    ), false);
  })

  // #8
  test('Logic handles a valid region (3x3 grid) placement', () => {
    assert.equal(solver.checkRegionPlacement(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      0,
      0,
      '7' // 7 is an valid value
    ), true);
  })

  // #9
  test('Logic handles an invalid region (3x3 grid) placement', () => {
    assert.equal(solver.checkRegionPlacement(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      0,
      0,
      '9' // 9 is an invalid value
    ), false);
  })

  // #10
  test('A valid puzzle string with missing puzzle pieces', () => {
    assert.equal(solver.solve(
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    ), '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
  })

  // #11
  test('Invalid puzzle strings fail the solver', () => {
    assert.equal(solver.solve(
      '119..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..9..'
    ), null);
  })

  // #12
  test('Solver returns the solution for a valid puzzle', () => {
    assert.equal(solver.solve(
      '123..............................................................................'
    ), '123456789456789123789123456214365897365897214897214365531642978642978531978531642');
  })

});
