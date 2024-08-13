import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import HousingCalculator from './HousingCalculator';
// import reportWebVitals from './reportWebVitals';
import defaultConfiguration from './defaultConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HousingCalculator
      seedConstants={defaultConfiguration}
      tooltipIconStyles="fas fa-info-circle"
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
