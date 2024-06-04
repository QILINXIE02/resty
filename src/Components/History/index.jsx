// src/Components/History/index.jsx
import React from 'react';
import './History.scss';

const History = ({ history }) => {
  return (
    <div className="History">
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <p>{entry.method} {entry.url}</p>
            <pre>{JSON.stringify(entry.results, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
