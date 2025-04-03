import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS/weather.css";

const regions = [
    { name: "Lonsdads", region: "Choose Region" },
    { name: "Nottingham", region: "East Midlands" },
    { name: "Birmingham", region: "West Midlands" },
    { name: "Manchester", region: "North West" },
    { name: "Liverpool", region: "North West" },
    { name: "Leeds", region: "Yorkshire and the Humber" },
    { name: "London", region: "London" },
    { name: "Bristol", region: "South West" },
    { name: "Tonbridge", region: "South East" },
    { name: "Cardiff", region: "Wales" },
    { name: "Edinburgh", region: "Scotland" },
    { name: "Ballymena", region: "Northern Ireland" },
  ];

const Weather = () => {
    const [city, setCity] = useState('');
    const navigate = useNavigate ();
    const [errorMessage,setErrorMessage] = useState('');

    const validateCity = async (city) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b8da38f286323d8f0e29d5ae5deb63a5`
          );
         
          if (response.data.cod === '404') {
            setErrorMessage('City not found. Please enter a valid city.');
            return false;
          }
          return true;
        } catch (error) {
          setErrorMessage('City not found. Please enter a valid city.');
          return false;
        }
    };


    const handleCityChange = async(e) => {
        const selectedCity = e.target.value;
        navigate(`/weather/${selectedCity}`);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!city) {
            setErrorMessage('Please enter a City Name')
            return;
        }
        const isValidCity = await(validateCity(city));
        if (isValidCity){
            navigate(`/weather/${city}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <select onChange={handleCityChange} value={city} className='location-input'>
                    {regions.map((region, index) => (
                        <option key={index} value={region.name}>
                            {region.region}
                        </option>
                    ))}
                </select>
                <button type="submit">Get Weather</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Weather;