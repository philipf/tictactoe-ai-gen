/**
 * Tic-Tac-Toe Game
 * Main application script
 */

console.log('Tic-Tac-Toe app.js loaded');

// Set a variable to indicate the script has loaded (for testing)
const appLoaded = true;

// Game data structures
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let xWins = 0;
let oWins = 0;

/**
 * Updates the scoreboard to display current X and O wins
 */
function updateScoreboard() {
  // Use jQuery to update the score display elements
  $('#score-x').text(xWins);
  $('#score-o').text(oWins);
  
  console.log(`Scoreboard updated: X: ${xWins}, O: ${oWins}`);
}

/**
 * Updates the status message to show whose turn it is
 */
function updateStatusMessage() {
  // Use jQuery to update the status message
  $('#status').text(`${currentPlayer}'s turn`);
  
  console.log(`Status message updated: ${currentPlayer}'s turn`);
}

// Test functions
function testBoardInitialization() {
  const isCorrectLength = board.length === 9;
  const allEmpty = board.every(cell => cell === '');
  
  console.log('Board Test:');
  console.log(`- Board length is 9: ${isCorrectLength ? 'PASS' : 'FAIL'}`);
  console.log(`- All cells are empty: ${allEmpty ? 'PASS' : 'FAIL'}`);
  
  return isCorrectLength && allEmpty;
}

function testCurrentPlayer() {
  const isCorrectPlayer = currentPlayer === 'X';
  
  console.log('Current Player Test:');
  console.log(`- Current player is X: ${isCorrectPlayer ? 'PASS' : 'FAIL'}`);
  
  return isCorrectPlayer;
}

// Test functions for UI updates
function testScoreboardUpdate() {
  console.log('Scoreboard Update Test:');
  
  // Store original values
  const originalXWins = xWins;
  const originalOWins = oWins;
  
  // Test scenario: increment scores and update UI
  xWins = 3;
  oWins = 2;
  updateScoreboard();
  
  // Check if DOM was updated correctly
  const xScoreDisplayed = $('#score-x').text() === '3';
  const oScoreDisplayed = $('#score-o').text() === '2';
  
  console.log(`- X score displays correctly: ${xScoreDisplayed ? 'PASS' : 'FAIL'}`);
  console.log(`- O score displays correctly: ${oScoreDisplayed ? 'PASS' : 'FAIL'}`);
  
  // Reset to original values
  xWins = originalXWins;
  oWins = originalOWins;
  updateScoreboard();
  
  return xScoreDisplayed && oScoreDisplayed;
}

function testStatusMessageUpdate() {
  console.log('Status Message Update Test:');
  
  // Store original value
  const originalPlayer = currentPlayer;
  
  // Test X's turn
  currentPlayer = 'X';
  updateStatusMessage();
  let isCorrectMessage = $('#status').text() === "X's turn";
  console.log(`- Status shows X's turn correctly: ${isCorrectMessage ? 'PASS' : 'FAIL'}`);
  
  // Test O's turn
  currentPlayer = 'O';
  updateStatusMessage();
  const isCorrectMessageO = $('#status').text() === "O's turn";
  console.log(`- Status shows O's turn correctly: ${isCorrectMessageO ? 'PASS' : 'FAIL'}`);
  
  // Reset to original value
  currentPlayer = originalPlayer;
  updateStatusMessage();
  
  return isCorrectMessage && isCorrectMessageO;
}

// Run tests
console.log('Running tests...');
const boardTestPassed = testBoardInitialization();
const playerTestPassed = testCurrentPlayer();
const scoreboardTestPassed = testScoreboardUpdate();
const statusMessageTestPassed = testStatusMessageUpdate();

// Log test results to the test output section
$(document).ready(function() {
  logTestResult('Board initialization', boardTestPassed);
  logTestResult('Current player initialization', playerTestPassed);
  logTestResult('Scoreboard update function', scoreboardTestPassed);
  logTestResult('Status message update function', statusMessageTestPassed);
  
  // Initialize UI with current values
  updateScoreboard();
  updateStatusMessage();
});

// Run the winner detection and game state tests
const winnerDetectionTestPassed = testWinnerDetection();
const gameStateTestPassed = testGameState();

// Run the game reset test
const gameResetTestPassed = testGameReset();

console.log(`All tests passed: ${
  boardTestPassed &&
  playerTestPassed &&
  scoreboardTestPassed &&
  statusMessageTestPassed &&
  winnerDetectionTestPassed &&
  gameStateTestPassed &&
  gameResetTestPassed ? 'YES' : 'NO'
}`);

/**
 * Handles a cell click event
 * @param {number} cellIndex - The index of the clicked cell (0-8)
 * @returns {boolean} - Whether the move was valid and processed
 */
function handleCellClick(cellIndex) {
  console.log(`Cell ${cellIndex} clicked`);
  
  // Check if the cell is already occupied
  if (board[cellIndex] !== '') {
    console.log(`Cell ${cellIndex} is already occupied with ${board[cellIndex]}`);
    return false;
  }
  
  // Place the current player's mark in the cell
  board[cellIndex] = currentPlayer;
  
  // Update the DOM to show the player's mark with appropriate color
  const $cell = $(`.cell[data-index="${cellIndex}"]`);
  $cell.text(currentPlayer);
  
  // Apply color based on the player (X is red, O is blue)
  if (currentPlayer === 'X') {
    $cell.addClass('text-red-600').removeClass('text-blue-600');
  } else {
    $cell.addClass('text-blue-600').removeClass('text-red-600');
  }
  
  // Check if the game is over (placeholder for now)
  // This will be implemented in a later prompt
  const gameState = checkGameState();
  
  // If no winner yet, switch players and update status
  if (!gameState.isGameOver) {
    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
  }
  
  return true;
}

/**
 * Checks if there is a winner on the board
 * @returns {string|null} - 'X' if X wins, 'O' if O wins, null if no winner
 */
function checkWinner() {
  // Define all possible winning combinations
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check each winning combination
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    // If all three positions have the same non-empty value, we have a winner
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return 'X' or 'O'
    }
  }

  // No winner found
  return null;
}

/**
 * Checks the current game state to determine if the game is over
 * @returns {Object} - Game state information
 */
function checkGameState() {
  // Check if there's a winner
  const winner = checkWinner();
  
  if (winner) {
    // We have a winner
    console.log(`Player ${winner} wins!`);
    
    // Increment the winner's score
    if (winner === 'X') {
      xWins++;
    } else {
      oWins++;
    }
    
    // Update the scoreboard
    updateScoreboard();
    
    // Display winner message
    $('#status').text(`Player ${winner} wins!`);
    
    // Highlight the winning cells
    highlightWinningCells(winner);
    
    return {
      isGameOver: true,
      winner: winner
    };
  }
  
  // Check for a draw (all cells filled but no winner)
  const isBoardFull = board.every(cell => cell !== '');
  if (isBoardFull) {
    console.log("It's a draw!");
    $('#status').text("It's a draw!");
    
    return {
      isGameOver: true,
      winner: null
    };
  }
  
  // Game is still in progress
  return {
    isGameOver: false,
    winner: null
  };
}

/**
 * Highlights the cells that form the winning combination
 * @param {string} winner - The winning player ('X' or 'O')
 */
function highlightWinningCells(winner) {
  // Define all possible winning combinations
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  // Find the winning combination
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] === winner && board[b] === winner && board[c] === winner) {
      // Add highlight class to the winning cells
      $(`.cell[data-index="${a}"]`).addClass('bg-yellow-100');
      $(`.cell[data-index="${b}"]`).addClass('bg-yellow-100');
      $(`.cell[data-index="${c}"]`).addClass('bg-yellow-100');
      console.log(`Highlighted winning cells: ${a}, ${b}, ${c}`);
      break;
    }
  }
}

/**
 * Test function for cell click handling
 */
function testCellClick() {
  console.log('Cell Click Test:');
  
  // Reset the board for testing
  board.fill('');
  currentPlayer = 'X';
  
  // Test 1: Clicking an empty cell should place an X
  const testIndex = 4; // Center cell
  const result1 = handleCellClick(testIndex);
  const cellHasX = board[testIndex] === 'X';
  const playerSwitched = currentPlayer === 'O';
  
  console.log(`- Clicking empty cell places X: ${cellHasX ? 'PASS' : 'FAIL'}`);
  console.log(`- Player switches to O after X's move: ${playerSwitched ? 'PASS' : 'FAIL'}`);
  
  // Test 2: Clicking an occupied cell should do nothing
  const result2 = handleCellClick(testIndex);
  const cellStillHasX = board[testIndex] === 'X';
  const playerStillO = currentPlayer === 'O';
  
  console.log(`- Clicking occupied cell is rejected: ${!result2 ? 'PASS' : 'FAIL'}`);
  console.log(`- Player remains O after invalid move: ${playerStillO ? 'PASS' : 'FAIL'}`);
  
  // Reset the board after testing
  board.fill('');
  currentPlayer = 'X';
  
  return cellHasX && playerSwitched && !result2 && cellStillHasX && playerStillO;
}

/**
 * Test function for winner detection
 */
function testWinnerDetection() {
  console.log('Winner Detection Test:');
  
  // Reset the board for testing
  board.fill('');
  currentPlayer = 'X';
  
  // Test 1: X wins by filling the top row
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'X';
  
  let winner = checkWinner();
  let xWinsTopRow = winner === 'X';
  console.log(`- X wins with top row: ${xWinsTopRow ? 'PASS' : 'FAIL'}`);
  
  // Reset the board for next test
  board.fill('');
  
  // Test 2: O wins by filling the first column
  board[0] = 'O';
  board[3] = 'O';
  board[6] = 'O';
  
  winner = checkWinner();
  let oWinsFirstColumn = winner === 'O';
  console.log(`- O wins with first column: ${oWinsFirstColumn ? 'PASS' : 'FAIL'}`);
  
  // Reset the board for next test
  board.fill('');
  
  // Test 3: X wins with diagonal
  board[0] = 'X';
  board[4] = 'X';
  board[8] = 'X';
  
  winner = checkWinner();
  let xWinsDiagonal = winner === 'X';
  console.log(`- X wins with diagonal: ${xWinsDiagonal ? 'PASS' : 'FAIL'}`);
  
  // Reset the board for next test
  board.fill('');
  
  // Test 4: No winner on empty board
  winner = checkWinner();
  let noWinnerEmpty = winner === null;
  console.log(`- No winner on empty board: ${noWinnerEmpty ? 'PASS' : 'FAIL'}`);
  
  // Reset the board after testing
  board.fill('');
  
  return xWinsTopRow && oWinsFirstColumn && xWinsDiagonal && noWinnerEmpty;
}

/**
 * Test function for game state checking
 */
function testGameState() {
  console.log('Game State Test:');
  
  // Reset the board and scores for testing
  board.fill('');
  const originalXWins = xWins;
  const originalOWins = oWins;
  xWins = 0;
  oWins = 0;
  updateScoreboard();
  
  // Test 1: X wins and score increments
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'X';
  
  let gameState = checkGameState();
  let xWinsDetected = gameState.isGameOver && gameState.winner === 'X';
  let xScoreIncremented = xWins === 1;
  
  console.log(`- X win detected correctly: ${xWinsDetected ? 'PASS' : 'FAIL'}`);
  console.log(`- X score incremented: ${xScoreIncremented ? 'PASS' : 'FAIL'}`);
  
  // Reset the board for next test
  board.fill('');
  xWins = 0;
  oWins = 0;
  updateScoreboard();
  
  // Test 2: Draw condition
  // Fill the board with a pattern that doesn't result in a win
  board[0] = 'X'; board[1] = 'O'; board[2] = 'X';
  board[3] = 'X'; board[4] = 'O'; board[5] = 'O';
  board[6] = 'O'; board[7] = 'X'; board[8] = 'X';
  
  gameState = checkGameState();
  let drawDetected = gameState.isGameOver && gameState.winner === null;
  
  console.log(`- Draw condition detected: ${drawDetected ? 'PASS' : 'FAIL'}`);
  
  // Reset the board and scores after testing
  board.fill('');
  xWins = originalXWins;
  oWins = originalOWins;
  updateScoreboard();
  
  return xWinsDetected && xScoreIncremented && drawDetected;
}

/**
 * Resets the game to its initial state
 */
function resetGame() {
  console.log('Resetting game...');
  
  // Clear the board array
  board.fill('');
  
  // Reset to player X's turn
  currentPlayer = 'X';
  
  // Clear all cell displays and remove all styling classes including highlights
  $('.cell').text('').removeClass('text-red-600 text-blue-600 bg-yellow-100');
  
  // Update the status message
  updateStatusMessage();
  
  console.log('Game reset complete');
}

/**
 * Test function for game reset
 */
function testGameReset() {
  console.log('Game Reset Test:');
  
  // Set up a non-empty board with a winning condition
  board[0] = 'X';
  board[1] = 'X';
  board[2] = 'X';
  board[4] = 'O';
  board[8] = 'O';
  currentPlayer = 'O';
  
  // Add highlight to simulate a win
  $(`.cell[data-index="0"]`).addClass('bg-yellow-100');
  $(`.cell[data-index="1"]`).addClass('bg-yellow-100');
  $(`.cell[data-index="2"]`).addClass('bg-yellow-100');
  
  // Reset the game
  resetGame();
  
  // Check if board is empty
  const boardCleared = board.every(cell => cell === '');
  console.log(`- Board cleared: ${boardCleared ? 'PASS' : 'FAIL'}`);
  
  // Check if player reset to X
  const playerResetToX = currentPlayer === 'X';
  console.log(`- Player reset to X: ${playerResetToX ? 'PASS' : 'FAIL'}`);
  
  // Check if highlight classes were removed
  const highlightsRemoved = !$(`.cell[data-index="0"]`).hasClass('bg-yellow-100') &&
                           !$(`.cell[data-index="1"]`).hasClass('bg-yellow-100') &&
                           !$(`.cell[data-index="2"]`).hasClass('bg-yellow-100');
  console.log(`- Highlights removed: ${highlightsRemoved ? 'PASS' : 'FAIL'}`);
  
  return boardCleared && playerResetToX && highlightsRemoved;
}

// Add click event listeners when the document is ready
$(document).ready(function() {
  logTestResult('Board initialization', boardTestPassed);
  logTestResult('Current player initialization', playerTestPassed);
  logTestResult('Scoreboard update function', scoreboardTestPassed);
  logTestResult('Status message update function', statusMessageTestPassed);
  
  // Run the cell click test
  const cellClickTestPassed = testCellClick();
  logTestResult('Cell click handling', cellClickTestPassed);
  
  // Run the winner detection and game state tests
  const winnerDetectionTestPassed = testWinnerDetection();
  logTestResult('Winner detection', winnerDetectionTestPassed);
  
  const gameStateTestPassed = testGameState();
  logTestResult('Game state checking', gameStateTestPassed);
  
  // Run the game reset test
  const gameResetTestPassed = testGameReset();
  logTestResult('Game reset', gameResetTestPassed);
  
  // Initialize UI with current values
  updateScoreboard();
  updateStatusMessage();
  
  // Add click event listeners to all cells
  $('.cell').on('click', function() {
    const cellIndex = parseInt($(this).attr('data-index'));
    handleCellClick(cellIndex);
  });
  
  // Add click event listener to reset button
  $('#reset-button').on('click', resetGame);
  
  // Clear the board display (in case tests left any marks)
  $('.cell').text('');
});