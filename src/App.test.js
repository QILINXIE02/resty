import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://example.com', (req, res, ctx) => {
    return res(ctx.json({ message: 'Hello World' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders without crashing and submits form', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/URL/i), { target: { value: 'http://example.com' } });
  fireEvent.change(screen.getByLabelText(/Method/i), { target: { value: 'GET' } });
  fireEvent.click(screen.getByText(/Go/i));

  await waitFor(() => expect(screen.getByText(/Results/i)).toBeInTheDocument());
  expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
});
