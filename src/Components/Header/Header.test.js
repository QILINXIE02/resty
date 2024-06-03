import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

test('renders header text', () => {
  render(<Header />);
  const headerElement = screen.getByText(/RESTy/i);
  expect(headerElement).toBeInTheDocument();
});