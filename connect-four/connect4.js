"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(undefined);
    }
  }
}


/** makeHtmlBoard: make HTML table and row of column tops.
*/
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // Make the top row where the buttons will go
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // creates the top buttons inside the top row
  // assigns ids based on column
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" constiable
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" constiable
      const cell = document.createElement("td");
      // add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
      cell.setAttribute("id", `c-${y}-${x}`);
      // append the table cell to the table row
      row.append(cell);
    }
    // append the row to the html board
    htmlBoard.append(row);
  }
}


/** findSpotForCol: given column x, return bottom empty y (null if filled)
*/
function findSpotForCol(x) {
  console.log('findSpotForCol ' + x);
  for (let y = HEIGHT - 1; y >= 0; y--){
    console.log(board[y][x]);
    if (!board[y][x])
    {
      return y;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board
*/
function placeInTable(y, x) {
  console.log(`placeInTable ${y} ${x}`);
  let piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  let cell = document.getElementById(`c-${y}-${x}`);
  console.log(cell);
  cell.append(piece);
}


/** endGame: announce game end
*/
function endGame(msg) {
  alert(msg);
}


/** handleClick: handle click of column top to play piece
*/
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id[4]);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  const cells = Array.from(document.querySelectorAll('td'));
  const gameCells = cells.filter(cell => cell.id[0] === 'c');
  if (gameCells.every(cell => cell.hasChildNodes())) {
    endGame("It's a draw!");
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}


/** checkForWin: check board cell-by-cell for "does a win start here?"
*/
function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    for (let cell of cells) {
      const cellY = cell[0];
      const cellX = cell[1];
      if (cellY < 0 || cellY >= HEIGHT
        || cellX < 0 || cellX >= WIDTH) {
        return false;
      }
    }
    if (cells.every(cell => board[cell[0]][cell[1]] === 1)
      || cells.every(cell => board[cell[0]][cell[1]] === 2)) {
      return true;
    }

  }
  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
      let diagDR = [[y, x], [y - 1, x + 1], [y - 2, x + 2], [y - 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        console.log("somebody won!");
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();