import { rest } from 'msw';

export const handlers = [
  // Other handlers...

  // PUT request handler
  rest.put('http://localhost:3001/posts/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res(ctx.status(400), ctx.json({ error: 'Title is required' }));
    }

    return res(ctx.json({ id, title }));
  }),

  // DELETE request handler
  rest.delete('http://localhost:3001/posts/:id', (req, res, ctx) => {
    const { id } = req.params;

    // Your deletion logic here

    return res(ctx.status(200));
  }),
];
