import React, { useState } from 'react';
import './Form.scss';

const Form = ({ handleApiCall }) => {
  const [formData, setFormData] = useState({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get">GET</span>
          <span id="post">POST</span>
          <span id="put">PUT</span>
          <span id="delete">DELETE</span>
        </label>
      </form>
    </>
  );
};

export default Form;
