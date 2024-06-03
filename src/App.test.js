import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './src/App';

test('renders without crashing and submits form', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/URL/i), { target: { value: 'http://example.com' } });
  fireEvent.change(screen.getByLabelText(/Method/i), { target: { value: 'GET' } });
  fireEvent.click(screen.getByText(/Go/i));

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
