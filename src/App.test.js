import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest'; // Import directly from vitest
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter.jsx';

describe('Counter component', () => {
  let currentCount;
  let incrementButton;

  beforeEach(() => {
    render(<Counter />);
    currentCount = screen.getByTestId('currentCount');
    incrementButton = screen.getByTestId('Increment');
  });

  it('renders initial count as 0', () => {
    expect(currentCount).toHaveTextContent('0');
  });

  it('increments the count when the increment button is clicked', () => {
    fireEvent.click(incrementButton);
    expect(currentCount).toHaveTextContent('1');

    fireEvent.click(incrementButton);
    expect(currentCount).toHaveTextContent('2');
  });
});
