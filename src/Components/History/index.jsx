import React from 'react';
import './History.scss';

const History = ({ history, onHistoryItemClick }) => {
  return (
    <div className="History">
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <button onClick={() => onHistoryItemClick(entry)}>
              {entry.method} {entry.url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
