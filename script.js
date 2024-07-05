document.addEventListener("DOMContentLoaded", () => {
    const gridElement = document.getElementById("sudoku-grid");
    const solveButton = document.getElementById("solve-button");

    // Create the Sudoku grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;

            cell.appendChild(input);
            gridElement.appendChild(cell);
        }
    }

    // Retrieve the current state of the Sudoku grid
    function getGrid() {
        const cells = document.querySelectorAll(".cell input");
        const grid = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const value = cells[i * 9 + j].value;
                row.push(value === "" ? 0 : parseInt(value));
            }
            grid.push(row);
        }
        return grid;
    }

    // Populate the grid with values
    function setGrid(grid) {
        const cells = document.querySelectorAll(".cell input");
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells[i * 9 + j].value = grid[i][j] === 0 ? "" : grid[i][j];
            }
        }
    }

    // Sudoku solver function 
    function solveSudoku(grid) {
        function isSafe(grid, row, col, num) {
            for (let x = 0; x < 9; x++) {
                if (grid[row][x] === num || grid[x][col] === num) return false;
            }
            const startRow = row - row % 3;
            const startCol = col - col % 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (grid[i + startRow][j + startCol] === num) return false;
                }
            }
            return true;
        }

        function solve(grid) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (grid[row][col] === 0) {
                        for (let num = 1; num <= 9; num++) {
                            if (isSafe(grid, row, col, num)) {
                                grid[row][col] = num;
                                if (solve(grid)) return true;
                                grid[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        solve(grid);
        return grid;
    }

    solveButton.addEventListener("click", () => {
        const grid = getGrid();
        const solvedGrid = solveSudoku(grid);
        setGrid(solvedGrid);
    });
});
