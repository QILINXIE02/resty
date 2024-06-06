import React from 'react';
import ReactJsonPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const Results = ({ data }) => {
  return (
    <div className="results">
      <h2>Results</h2>
      {data ? 
      <div data-testid="json-display"><ReactJsonPretty data={data} /></div>: 
      <p>No data yet</p>
      }
    </div>
  );
};

export default Results;
