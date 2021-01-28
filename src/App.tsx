import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <HelmetProvider>
          <Routes />
        </HelmetProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
