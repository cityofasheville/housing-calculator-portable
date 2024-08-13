import React from 'react';
import ReactDOM from 'react-dom/client';
import HousingCalculator from './HousingCalculator';

async function initializeApp() {
  try {
    const response = await fetch('defaultConfig.json');
    const configuration = await response.json();

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <HousingCalculator seedConstants={configuration} tooltipIconStyles="fas fa-info-circle" />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to load configuration', error);
  }

  // const response = await fetch('defaultConfig.json', {
  //   headers: {
  //     Accept: 'application/json',
  //   },
  // });
  // const configuration = await response.json();

  // const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(
  //   <React.StrictMode>
  //     <HousingCalculator seedConstants={configuration} tooltipIconStyles="fas fa-info-circle" />
  //   </React.StrictMode>
  // );
}

initializeApp();

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <HousingCalculator
//       seedConstants={defaultConfiguration}
//       tooltipIconStyles="fas fa-info-circle"
//     />
//   </React.StrictMode>
// );
