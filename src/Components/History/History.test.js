import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import History from './index';

test('renders history items', () => {
  const history = [
    { method: 'GET', url: 'http://example.com', results: { message: 'Hello World' } },
    { method: 'POST', url: 'http://example.com', results: { message: 'Posted' } }
  ];

  render(<History history={history} />);

  expect(screen.getByText(/GET/i)).toBeInTheDocument();
  expect(screen.getByText(/POST/i)).toBeInTheDocument();
  expect(screen.getByText(/http:\/\/example.com/i)).toBeInTheDocument();
});
