// src/Components/Results/index.jsx
import React from 'react';
import './Results.scss';
import ReactJson from 'react-json-pretty';

const Results = ({ data }) => {
  return (
    <section>
      {data ? <ReactJson data={data} /> : <div>No data yet</div>}
    </section>
  );
};

export default Results;
