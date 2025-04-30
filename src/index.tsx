import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>
    <React.StrictMode>
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={ <App /> }>
        </Route>
      </Routes> */}
      <App/>
    </BrowserRouter>
  </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}