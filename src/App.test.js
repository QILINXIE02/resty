import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../setupTests'; // Import the MSW server
import App from '../App';

// Add PUT and DELETE request handlers
server.use(
  rest.put('http://localhost:3001/posts/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res(ctx.status(400), ctx.json({ error: 'Title is required' }));
    }

    return res(ctx.json({ id, title }));
  }),

  rest.delete('http://localhost:3001/posts/:id', (req, res, ctx) => {
    const { id } = req.params;

    // Your deletion logic here

    return res(ctx.status(200));
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

  fireEvent.change(urlInput, { target: { value: 'http://localhost:3001/posts/1' } });
  fireEvent.change(methodSelect, { target: { value: 'PUT' } });
  fireEvent.change(bodyTextarea, { target: { value: JSON.stringify({ title: 'New Title' }) } });
  fireEvent.click(goButton);

  expect(await screen.findByText(/new title/i)).toBeInTheDocument();
});

test('handles DELETE request', async () => {
  render(<App />);

  const urlInput = screen.getByLabelText(/url:/i);
  const methodSelect = screen.getByLabelText(/method:/i);
  const goButton = screen.getByText(/send request/i);

  fireEvent.change(urlInput, { target: { value: 'http://localhost:3001/posts/1' } });
  fireEvent.change(methodSelect, { target: { value: 'DELETE' } });
  fireEvent.click(goButton);

  expect(await screen.findByText(/delete success/i)).toBeInTheDocument();
});
