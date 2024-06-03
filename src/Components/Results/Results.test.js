import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Results from './index';

test('Displays loading when loading is true', () => {
  render(<Results loading={true} response={null} />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('Displays results when response is given', () => {
  const response = {
    headers: { 'Content-Type': 'application/json' },
    data: { message: 'Hello World' }
  };
  render(<Results loading={false} response={response} />);
  expect(screen.getByTestId('results')).toBeInTheDocument();
});
