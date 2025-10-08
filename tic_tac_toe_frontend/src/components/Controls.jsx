import React from 'react';

/**
 * Controls render Reset/New Game and optional move history list.
 */
// PUBLIC_INTERFACE
export default function Controls({ onReset, history, currentStep, onJump }) {
  return (
    <div className="controls">
      <div className="controls-row">
        <button className="btn primary" onClick={onReset} aria-label="Reset game">
          🔁 New Game
        </button>
      </div>
      <details className="history">
        <summary className="history-summary">Move History</summary>
        <ol className="history-list">
          {history.map((_, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
              <li key={move}>
                <button
                  className={`btn ghost small ${move === currentStep ? 'active' : ''}`}
                  onClick={() => onJump(move)}
                  aria-current={move === currentStep ? 'step' : undefined}
                >
                  {desc}
                </button>
              </li>
            );
          })}
        </ol>
      </details>
    </div>
  );
}
