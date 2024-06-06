import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './index';

test('renders form and handles user input and submission', () => {
  const handleApiCall = jest.fn();
  render(<Form handleApiCall={handleApiCall} />);

  const urlInput = screen.getByLabelText(/url:/i);
  fireEvent.change(urlInput, { target: { value: 'https://auth-api-gf43.onrender.com/api/v1/clothes/' } });
  expect(urlInput.value).toBe('https://auth-api-gf43.onrender.com/api/v1/clothes/');

  const methodSelect = screen.getByLabelText(/method:/i);
  fireEvent.change(methodSelect, { target: { value: 'POST' } });
  expect(methodSelect.value).toBe('POST');

  const bodyTextarea = screen.getByLabelText(/body:/i);
  fireEvent.change(bodyTextarea, { target: { value: '{"title": "New Post"}' } });
  expect(bodyTextarea.value).toBe('{"title": "New Post"}');

  const submitButton = screen.getByText(/send request/i);
  fireEvent.click(submitButton);

  expect(handleApiCall).toHaveBeenCalledWith({
    method: 'POST',
    url: 'https://auth-api-gf43.onrender.com/api/v1/clothes/',
    body: { title: 'New Post' },
  });
});

test('alerts on invalid JSON body', () => {
  const handleApiCall = jest.fn();
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  render(<Form handleApiCall={handleApiCall} />);

  // Input URL
  const urlInput = screen.getByLabelText(/url:/i);
  fireEvent.change(urlInput, { target: { value: 'https://auth-api-gf43.onrender.com/api/v1/clothes/' } });

  // Select method POST
  const methodSelect = screen.getByLabelText(/method:/i);
  fireEvent.change(methodSelect, { target: { value: 'POST' } });

  // Input invalid JSON body
  const bodyTextarea = screen.getByLabelText(/body:/i);
  fireEvent.change(bodyTextarea, { target: { value: '{title: "New Post"}' } });

  // Submit form
  const submitButton = screen.getByText(/send request/i);
  fireEvent.click(submitButton);

  // Verify alert is called with correct message
  expect(alertMock).toHaveBeenCalledWith('Invalid JSON body');
  expect(handleApiCall).not.toHaveBeenCalled();

  // Cleanup mock
  alertMock.mockRestore();
});

test('does not show body textarea for GET and DELETE methods', () => {
  const handleApiCall = jest.fn();
  render(<Form handleApiCall={handleApiCall} />);

  // Select method GET
  let methodSelect = screen.getByLabelText(/method:/i);
  fireEvent.change(methodSelect, { target: { value: 'GET' } });
  expect(screen.queryByLabelText(/body:/i)).toBeNull();

  // Select method DELETE
  fireEvent.change(methodSelect, { target: { value: 'DELETE' } });
  expect(screen.queryByLabelText(/body:/i)).toBeNull();
});
