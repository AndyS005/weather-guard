import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import '../CSS/WeatherPage.css';
import Sidebar from '../Components/Sidebar';
import WeatherMap from "../Components/WeatherMap"; 
import '../CSS/sidebar.css';
import 'leaflet/dist/leaflet.css';

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

const warningCodes = [212, 221, 504, 511, 522, 531, 612, 613, 622, 771, 781, 800];


const WeatherPage = () => {
    const { city } = useParams(); 
    const navigate = useNavigate();
    const [weatherData, setWeatherData] = useState(null);
    const [warningData, setWarningData] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString); // Create a Date object from the date string
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minutes: '2-digit', hour12: true}; // Formatting options to get day name and day
        return date.toLocaleDateString('en-GB', options); // Return the formatted string (English)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city},GB&units=metric&appid=b8da38f286323d8f0e29d5ae5deb63a5`
                );
                setWeatherData(response.data);

                const forecastResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city},GB&units=metric&appid=b8da38f286323d8f0e29d5ae5deb63a5`
                );
                const extremeWeather = forecastResponse.data.list
                .flatMap(item => 
                    item.weather
                    .filter(weather => warningCodes.includes(weather.id))
                    .map(weather => ({
                        date: formatDate(item.dt_txt),
                        description: weather.description
                    }))
                );
                setWarningData(extremeWeather);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [city]);

    const handleCityChange = async(e) => {
        const selectedCity = e.target.value;
        navigate(`/weather/${selectedCity}`);
    }


    return (
        <div className="weather-page">
            <Sidebar city={city} />
            <div className="main-content">
                <header>
                    <h1>{weatherData?.name}</h1>
                
                    <select onChange={handleCityChange} value={city}>
                        {regions.map((region, index) => (
                            <option key={index} value={region.name}>
                                {region.region}
                            </option>
                        ))}
                    </select>
                </header>  
                <div className="weather-details">
                    <div className= "weather-sections">

                        <div className="weather-info">
                                    <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt="Weather icon" />
                                    <p>{weatherData?.main?.temp}°C</p>
                                    <p>{weatherData?.weather[0]?.description}</p>

                            <div className="weather-boxes">

                                <div className="box">
                                    <p>Feels like</p>
                                    <p>{weatherData?.main?.feels_like}°C</p>
                                </div>
                                <div className="box">
                                    <p>Wind</p>
                                    <p>{weatherData?.wind?.speed} m/s</p>
                                    <p>
                                        {weatherData?.wind?.deg}°
                                        <span className="wind-direction" style={{ transform: `rotate(${weatherData?.wind?.deg}deg)` }}>&#8599;</span>
                                    </p>
                                    
                                </div>
                                <div className="box">
                                    <p>Rain</p>
                                    <p>{weatherData?.main?.humidity}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="weather-info">

                                <WeatherMap weatherData={weatherData} />
                        </div>

                    </div>
                        <div className="weather-alerts">
                            <h2>Extreme Weather Warnings</h2>
                                {warningData && warningData.length > 0 ? (
                                    <ul>
                                        {warningData.map((warning, index) => (
                                            <li key={index}>
                                                {warning.date}: {warning.description}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No extreme weather warnings.</p>
                                )}
                        </div>
                </div>

            </div>
        </div>
    );
};

export default WeatherPage;