import React from 'react';
import ReactJson from 'react-json-view';

const Results = ({ data }) => {
  return (
    <div className="results">
      <h2>Results</h2>
      <ReactJson src={data} theme="summerfruit:inverted" />
    </div>
  );
};

export default Results;
