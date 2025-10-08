import React from 'react';

/**
 * GameStatus shows current turn, winner, or draw state.
 */
// PUBLIC_INTERFACE
export default function GameStatus({ xIsNext, winner, isDraw, winningLine }) {
  let message = '';
  let tone = 'info';

  if (winner) {
    message = `Winner: ${winner}`;
    tone = 'success';
  } else if (isDraw) {
    message = "It's a draw!";
    tone = 'warning';
  } else {
    message = `Next player: ${xIsNext ? 'X' : 'O'}`;
    tone = xIsNext ? 'primary' : 'secondary';
  }

  return (
    <div
      className={`status-banner ${tone} surface shadow-xs rounded`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="status-dot" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
