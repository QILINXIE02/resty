// src/App.jsx
import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import './App.scss';

const App = () => {
  const [requestParams, setRequestParams] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (params) => {
    setLoading(true);
    setRequestParams(params);

    // Simulate an API call with fake data for now
    setTimeout(() => {
      const fakeData = { message: 'This is a fake API response' };
      setData(fakeData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Form handleApiCall={handleApiCall} />
        {loading ? <div>Loading...</div> : <Results data={data} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
