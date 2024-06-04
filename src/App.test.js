// src/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders App component', () => {
  render(<App />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('handles API call and displays results', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/URL:/i), { target: { value: 'https://api.example.com' } });
  fireEvent.change(screen.getByLabelText(/Method:/i), { target: { value: 'GET' } });
  fireEvent.click(screen.getByText(/Go!/i));

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  const resultMessage = await screen.findByText(/This is a fake API response/i);
  expect(resultMessage).toBeInTheDocument();
});
