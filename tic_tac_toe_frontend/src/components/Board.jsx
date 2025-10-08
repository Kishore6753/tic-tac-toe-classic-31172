import React from 'react';
import Square from './Square';

/**
 * Board component renders a 3x3 grid of Squares.
 * Handles player moves and disables interaction on game over.
 */
// PUBLIC_INTERFACE
export default function Board({ squares, xIsNext, onPlay, winner, winningLine }) {
  const handleClick = (i) => {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  // Keyboard support: Enter/Space to play on focused square
  const onKeyDown = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(i);
    }
  };

  const isWinning = (i) => Array.isArray(winningLine) && winningLine.includes(i);

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => handleClick(i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          ariaLabel={`Cell ${i + 1}`}
          disabled={!!winner || !!value}
          highlight={isWinning(i)}
        />
      ))}
    </div>
  );
}
