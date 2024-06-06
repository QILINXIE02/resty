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
        <input type="text"data-testid="url-input" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </label>
      <label>
        <span>Method:</span>
        <select value={method} data-testid="method-input" onChange={(e) => setMethod(e.target.value)}>
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="put">PUT</option>
          <option value="delete">DELETE</option>
        </select>
      </label>
      {(method === 'post' || method === 'put') && (
        <label>
          <span>Body:</span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
      )}
      <button type="submit" data-testid="fetch-api-button" >Send Request</button>
    </form>
  );
};

export default Form;
