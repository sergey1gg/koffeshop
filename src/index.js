import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './css/index.css';
import './css/category.css'; 
import './css/product.css';
import './css/addition.css';
import './css/cart.css';
import './css/footer.css';
import './css/pay.css';
import './css/profile.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);