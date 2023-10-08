import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import './index.css';
import ServiceContext from './context';
import ServiceApi from './ServiceAPI/ServiceAPI';

const testService = new ServiceApi();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ServiceContext.Provider value={testService}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>
);
