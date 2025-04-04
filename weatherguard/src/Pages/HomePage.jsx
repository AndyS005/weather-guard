import React from 'react';
import Weather from '../Components/Weather';
import "../CSS/App.css";


const Home = () => {

  localStorage.setItem('settings_', JSON.stringify({
    tempUnit: 'Celsius',
    timeFormat: '24h',
    language: 'English',
    notifications: true,
    recommendations: true,
    darkMode: true,
    Alert_1: 212,
    Alert_2: 212,
    personalisedAlerts: false,
  }));

  return (
    <div className='App'>
      <h1>Weather Guard</h1>
      <p>The perfect weather app for your crops</p>
      <Weather />
    </div>
  );
};

export default Home;
