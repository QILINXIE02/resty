// src/Components/Form/index.jsx
import React, { useState } from 'react';
import './Form.scss';

const Form = ({ handleApiCall }) => {
  const [formData, setFormData] = useState({
    url: '',
    method: 'GET',
    body: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    handleApiCall(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        URL:
        <input type="text" name="url" value={formData.url} onChange={handleChange} />
      </label>
      <label>
        Method:
        <select name="method" value={formData.method} onChange={handleChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      {formData.method !== 'GET' && (
        <label>
          Body:
          <textarea name="body" value={formData.body} onChange={handleChange} />
        </label>
      )}
      <button type="submit">Go</button>
    </form>
  );
};

export default Form;
