import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './index';

test('Form submits with correct values', () => {
  const handleFormSubmit = jest.fn();
  render(<Form handleFormSubmit={handleFormSubmit} />);

  fireEvent.change(screen.getByLabelText(/URL/i), { target: { value: 'http://example.com' } });
  fireEvent.change(screen.getByLabelText(/Method/i), { target: { value: 'GET' } });
  fireEvent.click(screen.getByText(/Go/i));

  expect(handleFormSubmit).toHaveBeenCalledWith({ url: 'http://example.com', method: 'GET', body: null });
});
