import React from 'react';
import Weather from '../Components/Weather';
import "../CSS/App.css";


const Home = () => {

  const settings_ = {
    tempUnit: 'Celsius',
    timeFormat: '24h',
    language: 'English',
    notifications: true,
    alerts: true,
    darkMode: true,
  };
  localStorage.setItem("settings_", JSON.stringify(settings_));

  return (
    <div className='App'>
      <h1>Weather Guard</h1>
      <p>The perfect weather app for your crops</p>
      <Weather />
    </div>
  );
};

export default Home;
