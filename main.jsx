import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductPage from './ProductPage.jsx';
import App from './App.jsx';
import Success from './Success.jsx';

const path = window.location.pathname;

let Page;
if (path === '/quiz') {
  Page = App;
} else if (path === '/success') {
  Page = Success;
} else {
  Page = ProductPage;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
