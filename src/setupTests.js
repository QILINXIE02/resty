import { setupServer } from 'msw/node';
import { rest } from 'msw';
import '@testing-library/jest-dom/extend-expect';

const server = setupServer(
  rest.get('http://example.com', (req, res, ctx) => {
    return res(ctx.json({ message: 'Hello, World!' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
