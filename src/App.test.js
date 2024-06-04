import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';
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

test('App fetches and displays data correctly and updates history', async () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/URL/i), { target: { value: 'http://example.com' } });
  fireEvent.change(screen.getByLabelText(/Method/i), { target: { value: 'GET' } });
  fireEvent.click(screen.getByText(/Go/i));

  await waitFor(() => expect(screen.getByText(/Results/)).toBeInTheDocument());
  expect(screen.getByText(/message/)).toBeInTheDocument();
  expect(screen.getByText(/Hello World/)).toBeInTheDocument();

  expect(screen.getByText(/GET/i)).toBeInTheDocument();
  expect(screen.getByText(/http:\/\/example.com/i)).toBeInTheDocument();
});
