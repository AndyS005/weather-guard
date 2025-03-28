import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/weather.css";

const Weather = () => {
    const [city, setCity] = useState('');
    const navigate = useNavigate ();

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== ''){
            navigate(`/weather/${city}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className='location-input'
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">Get Weather</button>
            </form>
        </div>
    );
};

export default Weather;