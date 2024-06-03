import React, { useState } from 'react';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  const [request, setRequest] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (req) => {
    setRequest(req);
    setLoading(true);

    setTimeout(() => {
      const fakeResponse = {
        headers: { 'Content-Type': 'application/json' },
        data: { message: 'Hello World' }
      };
      setResponse(fakeResponse);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="App">
      <Header />
      <h1>RESTy Application</h1>
      <Form handleFormSubmit={handleFormSubmit} />
      <Results loading={loading} response={response} />
        <Footer />
        </div>
  );
}

export default App;
