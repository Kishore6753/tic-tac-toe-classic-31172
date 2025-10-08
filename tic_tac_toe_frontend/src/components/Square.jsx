import React from 'react';

/**
 * Square is an accessible button representing one cell of the board.
 * It supports keyboard interaction and visual highlight for winning cells.
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, onKeyDown, ariaLabel, disabled, highlight }) {
  const classes = [
    'square',
    value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : '',
    disabled ? 'disabled' : '',
    highlight ? 'highlight' : '',
  ].join(' ').trim();

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      aria-pressed={!!value}
      disabled={disabled}
    >
      <span className="square-value">{value}</span>
    </button>
  );
}
