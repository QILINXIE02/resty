import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import './App.scss';
import axios from 'axios';

const App = () => {
  const [requestParams, setRequestParams] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.body,
      });
      setData({
        headers: response.headers,
        results: response.data,
      });
    } catch (error) {
      console.error(error);
      setData({
        headers: {},
        results: { error: 'Error fetching data' },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestParams.url) {
      handleApiCall();
    }
  }, [requestParams]);

  const updateRequestParams = (params) => {
    setRequestParams(params);
  };

  return (
    <React.Fragment>
      <Header />
      <Form updateRequestParams={updateRequestParams} />
      {loading ? <p>Loading...</p> : <Results data={data} />}
      <Footer />
    </React.Fragment>
  );
};

export default App;
