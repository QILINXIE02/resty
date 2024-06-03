import React, { useState } from 'react';

function Form({ handleFormSubmit }) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = { url, method, body: body ? JSON.parse(body) : null };
    handleFormSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <label>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      {(method === 'POST' || method === 'PUT') && (
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
      )}
      <button type="submit">Go</button>
    </form>
  );
}

export default Form;
