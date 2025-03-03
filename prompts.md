
### **Prompt 1**: Create Basic Project Structure

```
You are a code-generation AI helping me build a Tic-Tac-Toe project step by step. 

**Task**: Create a basic project scaffold with:
1. `index.html` that includes:
   - The Tailwind CSS CDN link
   - The jQuery CDN link
   - A reference to `app.js`
2. An empty `app.js` file.
3. A minimal test structure (e.g., a `<script>` tag with a simple test runner or console logging).

**Requirements**:
- Make sure the HTML has a proper doctype and head/body structure.
- Tailwind CSS and jQuery should be referenced via a CDN.
- `app.js` should be an empty file (just a comment or console log).

Output the full content of all files needed at this stage. 
```

---

### **Prompt 2**: Add Basic HTML/CSS Structure

```
We have an `index.html` and an empty `app.js`. Now, let's add the fundamental HTML for the scoreboard, status, 3x3 board, and reset button. Also, let's include minimal Tailwind styling for layout.

**Requirements**:
1. A scoreboard div with placeholders for X and O scores.
2. A status div for messages.
3. A 3x3 grid structure using Tailwind classes.
4. A reset button beneath the board.
5. Ensure everything is centered.

Output the updated `index.html` and note any changes needed in `app.js` (if any). 
Provide the complete HTML file content.
```

---

### **Prompt 3**: Introduce Board & Turn Variables (Test First)

```
Now we will implement data structures and a simple test for them.

**Task**:
1. In `app.js`, define:
   - `board` as an array of 9 empty strings.
   - `currentPlayer` as "X".
   - `xWins` and `oWins` initialized to 0.
2. Write two small test functions (or console checks) that:
   - Verify `board` length is 9 with all empty strings.
   - Verify `currentPlayer` is "X" by default.

**Requirements**:
- Show the updated `app.js`.
- Show how the test results would appear (either console logs or a tiny test function that logs ‘pass/fail’).
```

---

### **Prompt 4**: Implement Scoreboard & Status Message Functions

```
We now have basic variables. Next, let's connect them to the DOM.

**Task**:
1. Create two functions in `app.js`:
   - `updateScoreboard()`: updates the scoreboard div to display X and O wins.
   - `updateStatusMessage()`: updates the status div, e.g., "Player X's turn" or "Player O's turn".
2. Write simple tests (or console checks) to ensure these functions correctly alter the DOM elements.

**Requirements**:
- Make sure to use jQuery to select the scoreboard/status elements by ID.
- Demonstrate a test scenario in code: call these functions, then confirm (via console or DOM text) that the UI changed as expected.
- Show the final `app.js` code.
```

---

### **Prompt 5**: Cell Click Handling & Population (TDD Style)

```
Let's implement the ability to click a cell and place an X or O.

**Task**:
1. Create a function `handleCellClick(cellIndex)` that:
   - Checks if `board[cellIndex]` is empty.
   - If empty, sets `board[cellIndex] = currentPlayer`.
   - Updates the DOM for that cell (text and color).
   - Calls a function `checkGameState()` (which we'll implement in a later prompt) to see if the game is over.
   - If no winner, switches `currentPlayer` and calls `updateStatusMessage()`.
2. Add a jQuery click listener in `app.js` that calls `handleCellClick(index)` for the correct index.
3. Write test checks:
   - Clicking an empty cell sets `X` or `O`.
   - Attempting to click a filled cell does nothing.

**Requirements**:
- Use Tailwind color classes or inline style (e.g., `$(cell).css('color', 'red')`) for X in red, O in blue.
- Provide updated `app.js` code and show how you tested these interactions.
```

---

### **Prompt 6**: Winner/Draw Detection (TDD Style)

```
Now we'll implement the `checkGameState()` function.

**Task**:
1. Create a `checkWinner()` helper that returns:
   - "X" if X has a winning combo
   - "O" if O has a winning combo
   - null if no winner
2. In `checkGameState()`, use `checkWinner()`. If there's a winner:
   - Increment the winner's score
   - Call `updateScoreboard()`
   - Show a message, e.g. "Player X wins!"
3. If `board` has no winner but is full, display "It's a draw!"
4. Otherwise, no action yet (we continue the game).
5. Write test scenarios:
   - Fill a row with X to see if X is detected as winner.
   - Fill the board with no winner for a draw.

**Requirements**:
- Provide the final `app.js` with the new functions (`checkWinner()`, `checkGameState()`).
- Demonstrate in-code or console-based tests for each scenario.
```

---

### **Prompt 7**: Implement Reset Functionality (TDD Style)

```
We're ready to add the reset button logic.

**Task**:
1. Add a click handler on the Reset button that:
   - Resets `board` to all empty strings.
   - Clears the DOM for each cell (removes X or O text).
   - Resets any highlight classes if implemented.
   - Sets `currentPlayer = "X"` (or whichever player you want to start).
   - Calls `updateStatusMessage()` with "Player X's turn" message.
2. Confirm that X and O wins remain unchanged.
3. Write a quick test scenario:
   - Set some cells, increment a score, then click Reset and confirm:
     - Board is cleared
     - Scores remain
     - Status is correct

**Requirements**:
- Provide updated `app.js`.
- Include test or console logs demonstrating the reset is working.
```

---

### **Prompt 8**: Optional Winning Highlight & Final Checks

```
Finally, let's add a highlight for the winning cells and finalize the game.

**Task**:
1. Modify `checkGameState()` so that if a winner is found, you add a Tailwind class (e.g. a light background) to the winning three cells.
2. On Reset, make sure to remove that highlight class.
3. Perform final manual or console-based checks:
   - Winning line highlight appears.
   - Scores update as expected.
   - Reset works.

**Requirements**:
- Provide the final `app.js` code with highlight logic.
- Show or explain a test scenario verifying the highlight is removed upon reset.
```

---

### **Prompt 9**: Full Integration and Final Code

```
Please provide the complete, integrated codebase in final form:
- `index.html` with all references
- `app.js` with all functions and event handlers
- Any relevant testing code or notes

Ensure no orphaned or unused functions, and that everything works together seamlessly.
```

---

## **E. Conclusion**

By following these structured prompts in order, you (or any developer) can implement the Tic-Tac-Toe app step by step, testing each piece before moving on. This approach ensures **incremental progress**, **early testing**, and **no big jumps** in complexity. Each prompt builds on the previous one, ending with a fully functioning Tic-Tac-Toe game that meets the initial requirements.