import React from 'react';

import Weather from '../Components/Weather';
import "../CSS/App.css";


const Home = () => {
  return (
    <div className='App'>
      <h1>Weather Guard</h1>
      <p>The perfect weather app for your crops</p>
      <Weather />
    </div>
  );
};

export default Home;
