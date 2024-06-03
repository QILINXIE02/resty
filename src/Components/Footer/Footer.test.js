import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

test('renders footer text', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/© 2024 RESTy Inc./i);
  expect(footerElement).toBeInTheDocument();
});

// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

test('renders header text', () => {
  render(<Header />);
  const headerElement = screen.getByText(/RESTy/i);
  expect(headerElement).toBeInTheDocument();
});
