import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductionErrorBoundary from './components/Analytics/ProductionErrorBoundary';
import { installProductionErrorTracking } from './components/Analytics/productionErrorTracking';

installProductionErrorTracking();

ReactDOM.render(
  <React.StrictMode>
    <ProductionErrorBoundary>
      <App />
    </ProductionErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
