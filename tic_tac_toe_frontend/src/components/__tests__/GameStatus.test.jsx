import React from 'react';
import { render, screen } from '@testing-library/react';
import GameStatus from '../GameStatus';

describe('GameStatus', () => {
  test('shows next player X or O when game ongoing', () => {
    const { rerender } = render(
      <GameStatus xIsNext={true} winner={null} isDraw={false} winningLine={null} />
    );
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/next player:\s*x/i);

    rerender(
      <GameStatus xIsNext={false} winner={null} isDraw={false} winningLine={null} />
    );
    expect(screen.getByRole('status')).toHaveTextContent(/next player:\s*o/i);
  });

  test('shows winner message and success tone', () => {
    render(<GameStatus xIsNext={false} winner="X" isDraw={false} winningLine={[0,1,2]} />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/winner:\s*x/i);
    expect(status.className).toMatch(/success/);
  });

  test("shows draw message and warning tone", () => {
    render(<GameStatus xIsNext={true} winner={null} isDraw={true} winningLine={null} />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/it's a draw!/i);
    expect(status.className).toMatch(/warning/);
  });
});
