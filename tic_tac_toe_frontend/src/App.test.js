import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App integration and shell', () => {
  test('renders title and New Game button, and theme toggle label updates', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Title visible (from header)
    expect(screen.getByRole('heading', { name: /ocean professional/i })).toBeInTheDocument();

    // New Game button visible with accessible name
    const newGame = screen.getByRole('button', { name: /reset game/i });
    expect(newGame).toBeInTheDocument();

    // Theme toggle present with aria-label describing action
    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();

    // Toggle updates label to indicate switching back to light
    await user.click(themeToggle);
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });

  test('history controls render and aria-current marks current step', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Expand history section
    const details = screen.getByRole('group', { hidden: true }) || screen.queryByRole('group');
    // The details element doesn't have a role by default; use summary text to find it
    const summary = screen.getByText(/move history/i);
    expect(summary).toBeInTheDocument();
    await user.click(summary);

    const list = screen.getByRole('list', { name: '' }) || screen.getByRole('list');
    // First entry (game start) should be present and current
    const startBtn = screen.getByRole('button', { name: /go to game start/i });
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveAttribute('aria-current', 'step');

    // Make two moves so history grows
    const board = screen.getByRole('grid', { name: /tic tac toe board/i });
    const cells = within(board).getAllByRole('button');
    await user.click(cells[0]); // X
    await user.click(cells[1]); // O

    // Expand again (in case it auto-collapsed by environment)
    if (!screen.getByRole('button', { name: /go to move #1/i })) {
      await user.click(summary);
    }

    // Buttons for move #1 and #2 should appear
    const move1 = screen.getByRole('button', { name: /go to move #1/i });
    const move2 = screen.getByRole('button', { name: /go to move #2/i });
    expect(move1).toBeInTheDocument();
    expect(move2).toBeInTheDocument();

    // Current step should be last (move #2)
    expect(move2).toHaveAttribute('aria-current', 'step');

    // Jump back to move #1 and verify aria-current updates
    await user.click(move1);
    expect(move1).toHaveAttribute('aria-current', 'step');
    expect(move2).not.toHaveAttribute('aria-current');
  });
});
