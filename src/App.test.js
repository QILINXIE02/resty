import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App'; 

const server = setupServer(
  rest.get('https://auth-api-gf43.onrender.com/api/v1/clothes/:id', (req, res, ctx) => {
    return res(ctx.json({ message: 'Hello, World!' }));
  }),
  rest.put('https://auth-api-gf43.onrender.com/api/v1/clothes/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res(ctx.status(400), ctx.json({ error: 'Title is required' }));
    }

    return res(ctx.json({ id, title }));
  }),
  rest.delete('https://auth-api-gf43.onrender.com/api/v1/clothes/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.status(200), ctx.json({ message: 'Delete success' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('handles PUT request', async () => {
  render(<App />);

  const urlInput = screen.getByLabelText(/url:/i);
  const methodSelect = screen.getByLabelText(/method:/i);
  const bodyTextarea = screen.getByLabelText(/body:/i);
  const goButton = screen.getByText(/send request/i);

  fireEvent.change(urlInput, { target: { value: 'https://auth-api-gf43.onrender.com/api/v1/clothes/1' } });
  fireEvent.change(methodSelect, { target: { value: 'PUT' } });
  fireEvent.change(bodyTextarea, { target: { value: JSON.stringify({ title: 'New Title' }) } });
  fireEvent.click(goButton);

  expect(await screen.findByText(/New Title/i)).toBeInTheDocument();
});

test('handles DELETE request', async () => {
  render(<App />);

  const urlInput = screen.getByLabelText(/url:/i);
  const methodSelect = screen.getByLabelText(/method:/i);
  const goButton = screen.getByText(/send request/i);

  fireEvent.change(urlInput, { target: { value: 'https://auth-api-gf43.onrender.com/api/v1/clothes//1' } });
  fireEvent.change(methodSelect, { target: { value: 'DELETE' } });
  fireEvent.click(goButton);

  expect(await screen.findByText(/Delete success/i)).toBeInTheDocument();
});

test('displays results from history on click', async () => {
  render(<App />);

  const urlInput = screen.getByLabelText(/url:/i);
  const methodSelect = screen.getByLabelText(/method:/i);
  const goButton = screen.getByText(/send request/i);

  fireEvent.change(urlInput, { target: { value: 'https://auth-api-gf43.onrender.com/api/v1/clothes/' } });
  fireEvent.change(methodSelect, { target: { value: 'GET' } });
  fireEvent.click(goButton);

  expect(await screen.findByText(/Hello, World!/i)).toBeInTheDocument();

  const historyButton = screen.getByText(/get http:\/\/localhost:3001\/posts/i);
  fireEvent.click(historyButton);

  expect(await screen.findByText(/Hello, World!/i)).toBeInTheDocument();
});
