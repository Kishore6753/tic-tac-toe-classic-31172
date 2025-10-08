import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from '../Board';

// Helper to get all square buttons
const getSquares = () => {
  const grid = screen.getByRole('grid', { name: /tic tac toe board/i });
  return within(grid).getAllByRole('button');
};

describe('Board', () => {
  test('places X then O on alternating moves and cannot override filled cells', async () => {
    const user = userEvent.setup();

    let squares = Array(9).fill(null);
    let xIsNext = true;
    const onPlay = (nextSquares) => {
      squares = nextSquares;
      xIsNext = !xIsNext;
      rerender(
        <Board
          squares={squares}
          xIsNext={xIsNext}
          onPlay={onPlay}
          winner={null}
          winningLine={null}
        />
      );
    };

    const { rerender } = render(
      <Board
        squares={squares}
        xIsNext={xIsNext}
        onPlay={onPlay}
        winner={null}
        winningLine={null}
      />
    );

    const cells = getSquares();
    await user.click(cells[0]); // X in cell 1
    expect(cells[0]).toHaveAttribute('aria-pressed', 'true');
    expect(within(cells[0]).getByText('X')).toBeInTheDocument();

    await user.click(cells[1]); // O in cell 2
    expect(within(cells[1]).getByText('O')).toBeInTheDocument();

    // Trying to override a filled cell should do nothing
    await user.click(cells[0]); // Attempt to change X
    // Still X
    expect(within(getSquares()[0]).getByText('X')).toBeInTheDocument();
  });

  test('keyboard: Enter/Space marks a focused empty square', async () => {
    const user = userEvent.setup();

    let squares = Array(9).fill(null);
    let xIsNext = true;
    const onPlay = (nextSquares) => {
      squares = nextSquares;
      xIsNext = !xIsNext;
      rerender(
        <Board
          squares={squares}
          xIsNext={xIsNext}
          onPlay={onPlay}
          winner={null}
          winningLine={null}
        />
      );
    };

    const { rerender } = render(
      <Board
        squares={squares}
        xIsNext={xIsNext}
        onPlay={onPlay}
        winner={null}
        winningLine={null}
      />
    );

    const cells = getSquares();
    cells[4].focus();
    expect(cells[4]).toHaveFocus();

    // Press Enter to place X
    await user.keyboard('{Enter}');
    expect(within(getSquares()[4]).getByText('X')).toBeInTheDocument();

    // Move focus to another cell and use Space to place O
    getSquares()[5].focus();
    await user.keyboard(' ');
    expect(within(getSquares()[5]).getByText('O')).toBeInTheDocument();
  });

  test('when winner exists, winning squares have highlight class and cells become disabled', async () => {
    const user = userEvent.setup();

    // Pre-winner state just before a win on top row [0,1,2]
    let squares = ['X', 'X', null, null, null, null, null, null, null];
    const xIsNext = true;
    const winningLine = null;

    const onPlay = (nextSquares) => {
      // simulate parent computing winner; after placing X at 2, set winner and winningLine
      const winner =
        nextSquares[0] && nextSquares[0] === nextSquares[1] && nextSquares[1] === nextSquares[2]
          ? nextSquares[0]
          : null;
      const line =
        winner ? [0, 1, 2] : null;
      squares = nextSquares;
      rerender(
        <Board
          squares={squares}
          xIsNext={!xIsNext}
          onPlay={onPlay}
          winner={winner}
          winningLine={line}
        />
      );
    };

    const { rerender } = render(
      <Board
        squares={squares}
        xIsNext={xIsNext}
        onPlay={onPlay}
        winner={null}
        winningLine={winningLine}
      />
    );

    let cells = getSquares();
    // Place winning move at index 2
    await user.click(cells[2]);

    cells = getSquares();
    // Winning cells should have highlight class
    expect(cells[0].className).toMatch(/highlight/);
    expect(cells[1].className).toMatch(/highlight/);
    expect(cells[2].className).toMatch(/highlight/);

    // After win, all cells should be disabled (Squares set disabled when winner truthy)
    cells.forEach((c) => expect(c).toBeDisabled());
  });
});
