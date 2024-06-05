import React from 'react';
import ReactJson from 'react-json-view';

const Results = ({ data }) => {
  return (
    <div className="results">
      <h2>Results</h2>
      {data ? <ReactJson src={data} theme="summerfruit:inverted" /> : <p>No data yet</p>}
    </div>
  );
};

export default Results;
