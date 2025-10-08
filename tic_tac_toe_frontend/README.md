# Tic-Tac-Toe Frontend (Ocean Professional)

A modern, responsive Tic-Tac-Toe game built with React. It is self-contained (no backend) and styled with the Ocean Professional palette. The app supports keyboard navigation, clear status updates, and a light/dark theme toggle.

## Gameplay
The game provides a 3x3 interactive board where players alternate between X and O:
- Playing a move: Click a cell or focus it with the keyboard and press Enter or Space.
- Turn handling: The next player indicator updates after each valid move.
- Win detection: When a player wins, the three winning squares are visually highlighted and further input is disabled.
- Draw detection: If all nine cells are filled with no winner, a draw is announced.
- Move history and time travel: Open “Move History” to see a list of moves. You can jump to any prior move; the current step is marked with aria-current="step".
- Reset/New Game: Use the “New Game” button to clear the board and start over.

These behaviors are implemented by the following components:
- Board.jsx renders the grid, handles click/keyboard play, and highlights the winning line.
- GameStatus.jsx presents live status: next player, winner, or draw, with a tone-specific banner.
- Controls.jsx provides the New Game button and an ordered move history list for time travel.

## Theme: Ocean Professional
The interface follows a modern aesthetic with rounded corners, subtle shadows, and smooth transitions. It includes a theme toggle in the top bar:
- Light/Dark toggle: Switch between themes; the toggle’s accessible label announces the action (e.g., “Switch to dark mode”).
- Primary color: #2563EB
- Secondary/Success color: #F59E0B
- Error color: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Dark theme adjusts surface, text, borders, shadows, and focus rings for comfortable contrast in low-light environments.

## Accessibility
The UI incorporates accessible patterns aligned with the tests:
- Keyboard navigation: Each square is a focusable button. Press Enter or Space to place a mark in the focused cell.
- ARIA pressed state: Squares expose aria-pressed to indicate whether a cell is filled.
- Live game status: A status banner uses role="status" with polite updates and aria-atomic for coherent announcements of turn changes, wins, or draws.
- Focus visibility: Focused interactive elements render a visible focus outline, supporting keyboard users.
- Current step indication: In the move history, the currently selected entry is indicated with aria-current="step".

## Running the app
- Install dependencies: npm install
- Start the development server: npm start
  - The app runs on http://localhost:3000
- Build for production: npm run build

## Tests
The project uses React Testing Library and user-event:
- Run unit and integration tests: npm test
- Test coverage includes:
  - App shell integration (title, New Game visibility, theme toggle label behavior)
  - Board interactions (click and keyboard), prevention of overwriting moves, and post-win disabling with highlight
  - GameStatus messages and tone classes for next turn, winner, and draw

No external services or environment variables are required.
