import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/css/index.css';
import App from './App';
import Main from './test/Main';
import Router from 'router';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    {/* <App /> */}
    <Main></Main>
    {/* <Router /> */}
  </BrowserRouter>  
);
