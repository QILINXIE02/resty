import React, { useState } from 'react';
import './Form.scss';

const Form = ({ updateRequestParams }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRequestParams({ url, method, body });
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
      {method !== 'GET' && (
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
      )}
      <button type="submit">Go!</button>
    </form>
  );
};

export default Form;
