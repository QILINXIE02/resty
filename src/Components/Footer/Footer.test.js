import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

test('renders footer text', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/© 2024 RESTy Inc./i);
  expect(footerElement).toBeInTheDocument();
});
