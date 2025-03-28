import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS/weather.css";

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


    const handleInputChange = (e) => {
        setCity(e.target.value);
        setErrorMessage('');
    };

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
                <input
                    className='location-input'
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">Get Weather</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Weather;