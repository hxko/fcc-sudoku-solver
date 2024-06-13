class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }
    if (/[^1-9.]/.test(puzzleString)) {
      return "Invalid characters in puzzle";
    }
    return null;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const start = row * 9;
    for (let i = 0; i < 9; i++) {
      if (puzzleString[start + i] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[column + i * 9] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRowStart = Math.floor(row / 3) * 3;
    const regionColStart = Math.floor(column / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (puzzleString[(regionRowStart + r) * 9 + regionColStart + c] === value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    const findEmptyPosition = (puzzleString) => {
      for (let i = 0; i < 81; i++) {
        if (puzzleString[i] === '.') {
          return i;
        }
      }
      return null;
    };

    const solveHelper = (puzzleString) => {
      let emptyPosition = findEmptyPosition(puzzleString);
      if (emptyPosition === null) {
        return puzzleString;
      }

      let row = Math.floor(emptyPosition / 9);
      let col = emptyPosition % 9;

      for (let value = 1; value <= 9; value++) {
        let charValue = value.toString();
        if (this.checkRowPlacement(puzzleString, row, col, charValue) &&
          this.checkColPlacement(puzzleString, row, col, charValue) &&
          this.checkRegionPlacement(puzzleString, row, col, charValue)) {
          let newPuzzleString = puzzleString.substr(0, emptyPosition) + charValue + puzzleString.substr(emptyPosition + 1);
          let result = solveHelper(newPuzzleString);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    return solveHelper(puzzleString);
  }
}

module.exports = SudokuSolver;


