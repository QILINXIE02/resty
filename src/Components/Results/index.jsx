import React from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import './Results.scss';

const Results = ({ data }) => {
  if (!data) return null;

  return (
    <section className="Results">
      <h2>Results</h2>
      <div>
        <h3>Headers:</h3>
        <JSONPretty data={data.headers}></JSONPretty>
      </div>
      <div>
        <h3>Results:</h3>
        <JSONPretty data={data.results}></JSONPretty>
      </div>
    </section>
  );
};

export default Results;
