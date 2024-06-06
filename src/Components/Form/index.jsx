import React, { useState } from 'react';

const Form = ({ handleApiCall }) => {
  const [method, setMethod] = useState('get');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let requestBody = null;
    if (method !== 'get' && method !== 'delete') {
      try {
        requestBody = JSON.parse(body);
      } catch (error) {
        alert('Invalid JSON body');
        return;
      }
    }
    const requestParams = { method, url, body: requestBody };
    handleApiCall(requestParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>URL:</span>
        <input type="text" data-testid="url-input" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </label>
      <label>
        <span>Method:</span>
        <select value={method} data-testid="method-input" onChange={(e) => setMethod(e.target.value)}>
          <option value="get" data-testid="get-method-option">GET</option>
          <option value="post" data-testid="post-method-option">POST</option>
          <option value="put" data-testid="put-method-option">PUT</option>
          <option value="delete" data-testid="delete-method-option">DELETE</option>
        </select>
      </label>
      {(method === 'post' || method === 'put') && (
        <label>
          <span>Body:</span>
          <textarea value={body} data-testid="body-input" onChange={(e) => setBody(e.target.value)} />
        </label>
      )}
      <button type="submit" data-testid="fetch-api-button">Send Request</button>
    </form>
  );
};

export default Form;
