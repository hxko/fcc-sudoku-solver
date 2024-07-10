# Sudoku Solver

This project is a Sudoku solver application that validates and solves Sudoku puzzles. It includes both logic for solving the puzzles and an API for interacting with the solver. The application also includes unit and functional tests to ensure correctness.

## Features

- Validate a Sudoku puzzle string
- Check valid placements in rows, columns, and 3x3 grids
- Solve any valid Sudoku puzzle string
- API endpoints for solving puzzles and checking placements
- Comprehensive unit and functional tests

## Requirements

- Node.js
- npm (Node Package Manager)

## Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/sudoku-solver.git
    cd sudoku-solver
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the environment:

    Create a `.env` file in the root directory and add the following line:

    ```sh
    NODE_ENV=test
    ```

4. Run the application:

    ```sh
    npm start
    ```

## File Structure

- `/controllers/sudoku-solver.js`: Contains the logic for validating and solving Sudoku puzzles.
- `/routes/api.js`: Contains the routing logic for the API endpoints.
- `/controllers/puzzle-strings.js`: Contains sample puzzle strings for testing.
- `/tests/1_unit-tests.js`: Contains unit tests for the Sudoku solver logic.
- `/tests/2_functional-tests.js`: Contains functional tests for the API endpoints.

## Running Tests

To run the challenge tests:

```sh
npm run test

