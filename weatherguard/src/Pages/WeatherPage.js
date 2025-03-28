import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../CSS/WeatherPage.css'

const WeatherPage = () => {
    const { city } = useParams(); // Get city from URL
    const [weatherData, setWeatherData] = useState(null);

    console.log("City received from URL:", city);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b8da38f286323d8f0e29d5ae5deb63a5`
                );
                setWeatherData(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [city]);


    return (
        <div className="Container">
            <h1>Weather for {weatherData?.name}</h1>
            <p>Temperature: {weatherData?.main?.temp}°C</p>
            <p>Description: {weatherData?.weather[0]?.description}</p>
            <p>Feels like: {weatherData?.main?.feels_like}°C</p>
            <p>Humidity: {weatherData?.main?.humidity}%</p>
            <p>Pressure: {weatherData?.main?.pressure} hPa</p>
            <p>Wind Speed: {weatherData?.wind?.speed} m/s</p>
            <p>The city entered was {city}</p>
        </div>
    );
};

export default WeatherPage;