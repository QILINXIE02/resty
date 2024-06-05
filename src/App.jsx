import React, { useReducer } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';
import './App.scss'; // Import SCSS file

const initialState = {
  loading: false,
  results: null,
  resultHistory: [], // Renamed history to resultHistory
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return { ...state, loading: true, error: null };
    case 'API_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        results: action.payload,
        resultHistory: [...state.resultHistory, action.history], // Store results in a separate history
      };
    case 'API_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleApiCall = async (requestParams) => {
    dispatch({ type: 'API_REQUEST' });
    console.log('Making API call with params:', requestParams);

    try {
      const response = await axios({
        url: requestParams.url,
        method: requestParams.method,
        data: requestParams.body,
      });

      const historyEntry = {
        url: requestParams.url,
        method: requestParams.method,
        results: response.data,
      };

      dispatch({ type: 'API_SUCCESS', payload: response.data, history: historyEntry });
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: 'API_FAILURE', error: error.message });
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Form handleApiCall={handleApiCall} />
        {state.loading && <div>Loading...</div>}
        {state.error && <div className="error">{state.error}</div>}
        {state.results && <Results data={state.results} />}
      </main>
      <aside>
        <History history={state.resultHistory} />
      </aside>
      <Footer />
    </div>
  );
};

export default App;
