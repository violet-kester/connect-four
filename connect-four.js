const GAME_BOARD = document.querySelector('#gameBoard');
const BOARD_COLUMNS = 7;
const BOARD_ROWS = 6;
let turnPlayer = "red";

/** creates a 2x2 matrix that stores the game state */

function createGameMatrix(){
    // board with 6 rows and 7 columns as 2d array
}

/** Populates the game board. */
function createGameBoard() {
    let board = [];
    for(let i = 0; i < BOARD_ROWS; i++)
        {
            board.push([])
            for(let j = 0; j < BOARD_COLUMNS; j++)
            {
                board[i][j] = null;
            }
        }
    return board;

}
/** determines if there are any 4 in a rows */

function checkWin(gameBoard){
    if (checkDiagonal() || checkHorizontal() || checkVertical())
    {
        alert(`${turnPlayer} wins!`);
    }
}
/** checks if there are 4 in a row diagonally */
function checkDiagonal(){

}
/** checks if there are 4 in a row vertically */
function checkVertical(){

}
/** checks if there are 4 in a row horizontally */
function checkHorizontal(){

}
/** puts a piece into board based on the turn player */

function makeMove(gameBoard, turnPlayer){
    // change html element
    //update matrix
    //check win
}

/** takes a move and changes the html element to reflect it*/

function updateHTML(move)
{

}

/** updates the matrix and returns it */
function updateArray(gameBoard)
{

}
/** initializes the parts needed to play the game */
function startGame() {
    createGameBoard();
    createGameMatrix();

}