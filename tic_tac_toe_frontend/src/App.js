import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/theme.css';
import './styles/app.css';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import Controls from './components/Controls';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * App shell for the Tic-Tac-Toe game with Ocean Professional theme.
   * Manages game state, theme, and orchestrates UI components.
   */
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentSquares = history[step];

  const result = useMemo(() => calculateResult(currentSquares), [currentSquares]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // PUBLIC_INTERFACE
  const handlePlay = (nextSquares) => {
    const nextHistory = history.slice(0, step + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setStep(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const jumpTo = (moveIndex) => {
    setStep(moveIndex);
    setXIsNext(moveIndex % 2 === 0);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setXIsNext(true);
  };

  return (
    <div className="app-root">
      <nav className="topbar surface shadow-sm">
        <div className="brand">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-title">Tic-Tac-Toe</span>
        </div>
        <div className="actions">
          <button
            className="btn ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </nav>

      <main className="container">
        <section className="game-card surface shadow-md rounded">
          <header className="game-header">
            <h1 className="title">Ocean Professional</h1>
            <p className="subtitle">A clean, modern Tic-Tac-Toe experience</p>
          </header>

          <GameStatus
            xIsNext={xIsNext}
            winner={result.winner}
            isDraw={result.isDraw}
            winningLine={result.winningLine}
          />

          <Board
            squares={currentSquares}
            xIsNext={xIsNext}
            onPlay={handlePlay}
            winner={result.winner}
            winningLine={result.winningLine}
          />

          <Controls
            onReset={resetGame}
            history={history}
            currentStep={step}
            onJump={jumpTo}
          />
        </section>
      </main>

      <footer className="footer text-muted">
        <span>Made with React • No backend required</span>
      </footer>
    </div>
  );
}

/**
 * Calculate game outcome: winner, winning line, or draw state.
 * @param {Array<string|null>} squares
 * @returns {{winner: string|null, winningLine: number[]|null, isDraw: boolean}}
 */
function calculateResult(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diags
  ];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a,b,c], isDraw: false };
    }
  }
  const isDraw = squares.every(Boolean);
  return { winner: null, winningLine: null, isDraw };
}
