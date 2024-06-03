import React from 'react';

function Results({ loading, response }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!response) {
    return null;
  }

  return (
    <div>
      <h2>Response Headers</h2>
      <pre>{JSON.stringify(response.headers, null, 2)}</pre>
      <h2>Response Data</h2>
      <pre data-testid="results">{JSON.stringify(response.data, null, 2)}</pre>
    </div>
  );
}

export default Results;
