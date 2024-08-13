import React from 'react';
import ReactDOM from 'react-dom/client';
import HousingCalculator from './HousingCalculator';
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
