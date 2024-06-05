import React, { useState } from 'react';

const Form = ({ handleApiCall }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let requestBody = null;
    if (method !== 'GET' && method !== 'DELETE') {
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
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </label>
      <label>
        <span>Method:</span>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      {(method === 'POST' || method === 'PUT') && (
        <label>
          <span>Body:</span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
      )}
      <button type="submit">Send Request</button>
    </form>
  );
};

export default Form;
