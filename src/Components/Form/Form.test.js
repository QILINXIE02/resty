// src/Components/Footer/Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './index';

test('renders Footer component', () => {
  render(<Footer />);
  expect(screen.getByText(/© 2021 Code Fellows/i)).toBeInTheDocument();
});
