import React from 'react';
import './Results.scss';

const Results = ({ data }) => {
  return (
    <section>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
};

export default Results;
