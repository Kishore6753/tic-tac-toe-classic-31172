# Tic-Tac-Toe Frontend (Ocean Professional)

A modern, responsive Tic-Tac-Toe game built with React. Self-contained (no backend), themed using the Ocean Professional palette.

## Features
- 3x3 interactive board with keyboard support
- Turn handling, win detection (highlight winning line), and draw detection
- Reset/New Game
- Optional move history (time travel)
- Modern UI: rounded corners, subtle shadows, smooth transitions
- Light/Dark toggle

## Scripts
- `npm start` — runs on http://localhost:3000
- `npm run build` — production build
- `npm test` — run tests (if any)

## Theme
Colors:
- Primary: `#2563EB`
- Secondary/Success: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

## Accessibility
- Squares are buttons with `aria-pressed`
- Keyboard support: Enter/Space to mark focused square
- Live status updates via `role="status"`

No external services or environment variables required.
