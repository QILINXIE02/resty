import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from './App'; 

// Mock server setup
const server = setupServer(
  http.get('/clothes', (req, res, ctx) => {
    return HttpResponse.json(getReturn);
  }),
  http.post('/clothes', (req, res, ctx) => {
    return HttpResponse.json(postReturn);
  }),
  http.put('/clothes/1', (req, res, ctx) => {
    return HttpResponse.json(putReturn);
  }),
  http.delete('/clothes/1', (req, res, ctx) => {
    return HttpResponse.json(deleteReturn);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Sample return data
const getReturn = [ { name: 'John' }, { name: 'Cathy' } ];
const postReturn = { id: 1, name: 'John' };
const putReturn = { id: 1, name: 'Zach' };
const deleteReturn = {};

describe('App', () => {
  it('should do a get api call', async () => {
    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const methodInput = screen.getByTestId('method-input');
    const submitButton = screen.getByTestId('fetch-api-button');

    let method = 'get';
    let url = '/clothes';

    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.change(methodInput, { target: { value: method } });
    fireEvent.click(submitButton);

    await screen.findByTestId('json-display');

    const displayedJSON = JSON.parse(screen.getByTestId('json-display').textContent);

    expect(displayedJSON).toEqual(getReturn);
  });

  it('should do a post api call', async () => {
    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const postInput = screen.getByTestId('post-input');
    const submitButton = screen.getByTestId('fetch-api-button');

    let method = 'post';
    let url = '/clothes';

    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.click(postInput, { target: { value: method } });
    fireEvent.click(submitButton);

    await screen.findByTestId('json-display');

    const displayedJSON = JSON.parse(screen.getByTestId('json-display').textContent);

    expect(displayedJSON).toEqual(postReturn);
  });

  it('should do a put api call', async () => {
    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const putInput = screen.getByTestId('put-input');
    const submitButton = screen.getByTestId('fetch-api-button');

    let method = 'put';
    let url = '/clothes/1';

    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.click(putInput, { target: { value: method } });
    fireEvent.click(submitButton);

    await screen.findByTestId('json-display');

    const displayedJSON = JSON.parse(screen.getByTestId('json-display').textContent);

    expect(displayedJSON).toEqual(putReturn);
  });

  it('should do a delete api call', async () => {
    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const deleteInput = screen.getByTestId('delete-input');
    const submitButton = screen.getByTestId('fetch-api-button');

    let method = 'delete';
    let url = '/clothes/1';

    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.click(deleteInput, { target: { value: method } });
    fireEvent.click(submitButton);

    await screen.findByTestId('json-display');

    const displayedJSON = JSON.parse(screen.getByTestId('json-display').textContent);

    expect(displayedJSON).toEqual(deleteReturn);
  });
});
