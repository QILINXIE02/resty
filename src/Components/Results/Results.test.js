// src/Components/Results/Results.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from './index';

test('renders Results component with no data', () => {
  render(<Results data={null} />);
  expect(screen.getByText(/No data yet/i)).toBeInTheDocument();
});

test('renders Results component with data', () => {
  const data = { message: 'This is a test' };
  render(<Results data={data} />);
  expect(screen.getByText(/This is a test/i)).toBeInTheDocument();
});
