'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const validationError = solver.validate(puzzle);
      if (validationError) {
        return res.json({ error: validationError });
      }

      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      const rowLetter = coordinate[0].toUpperCase();
      const colNumber = coordinate[1];
      const row = rowLetter.charCodeAt(0) - 'A'.charCodeAt(0);
      const col = colNumber - 1;

      if (row < 0 || row > 8 || col < 0 || col > 8 || coordinate.length !== 2) {
        return res.json({ error: 'Invalid coordinate' });
      }

      // Check if the value is already placed at the specified coordinate
      const currentValue = puzzle[row * 9 + col];
      if (currentValue === value) {
        return res.json({ valid: true });
      }

      const conflicts = [];
      if (!solver.checkRowPlacement(puzzle, row, col, value)) {
        conflicts.push('row');
      }
      if (!solver.checkColPlacement(puzzle, row, col, value)) {
        conflicts.push('column');
      }
      if (!solver.checkRegionPlacement(puzzle, row, col, value)) {
        conflicts.push('region');
      }

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }

      return res.json({ valid: true });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      const validationError = solver.validate(puzzle);
      if (validationError) {
        return res.json({ error: validationError });
      }

      const solution = solver.solve(puzzle);
      if (!solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      return res.json({ solution: solution });
    });
};
