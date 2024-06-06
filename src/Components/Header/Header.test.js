import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

test('renders Header component', () => {
  render(<Header />);
  expect(screen.getByText(/RESTy/i)).toBeInTheDocument();
});
