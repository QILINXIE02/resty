import React from 'react';

const Results = ({ data }) => {
  return (
    <section>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
};

export default Results;
