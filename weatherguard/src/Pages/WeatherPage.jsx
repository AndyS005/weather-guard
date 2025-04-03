import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import '../CSS/WeatherPage.css';
import Sidebar from '../Components/Sidebar';
import WeatherMap from "../Components/WeatherMap"; 
import '../CSS/sidebar.css';
import 'leaflet/dist/leaflet.css';
import windSpeed from '../Assets/Wind-Speed.png'

// Reigions for the dropdown menu
// This is a list of regions in the UK with their corresponding cities according to region's Lat and long
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

// Warning codes for extreme weather conditions
// These codes are used to filter out extreme weather conditions from the API response
// The codes are based on the OpenWeatherMap API documentation
// https://openweathermap.org/weather-conditions#Weather-Condition-Codes
const warningCodes = [212, 221, 504, 511, 522, 531, 612, 613, 622, 771, 781, 800];


// WeatherPage component
// This component fetches and displays weather data for a specific city
const WeatherPage = () => {
    const { city } = useParams(); 
    const navigate = useNavigate();
    const [weatherData, setWeatherData] = useState(null);
    const [warningData, setWarningData] = useState(null);

    
    let disTemp = 0;
    let disFeelTemp = 0;
    const settings = JSON.parse(localStorage.getItem("settings_"));

    // Function to format the date string
    // This function takes a date string as input and returns a formatted date string
    // The date string is formatted to include the day name, day number, month name, hour, and minutes
    const formatDate = (dateString) => {
        const date = new Date(dateString); 
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minutes: '2-digit', hour12: true};
        return date.toLocaleDateString('en-GB', options); 
    };


    //Fetches weather data from OpenWeatherMap API
    useEffect(() => {
        const fetchData = async () => {
            // Fetch weather data for the specified city
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city},GB&units=metric&appid=b8da38f286323d8f0e29d5ae5deb63a5`
                );
                setWeatherData(response.data);
                // Fetch forecast data for the specified city
                const forecastResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city},GB&units=metric&appid=b8da38f286323d8f0e29d5ae5deb63a5`
                );
                // Filter the forecast data to get extreme weather warnings
                // The forecast data is filtered to include only the items with weather codes that match the warning codes
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

    // Function to handle city change and to update information correspondingly
    const handleCityChange = async(e) => {
        const selectedCity = e.target.value;
        navigate(`/weather/${selectedCity}`);
    }

    console.log(weatherData);
    if (weatherData) {
        if (settings["tempUnit"] === 'Celsius') {
            disTemp = (weatherData.main.temp).toFixed(2) + '°C';
            disFeelTemp = (weatherData.main.feels_like).toFixed(2) + '°C';
        } else {
            disTemp = ((weatherData.main.temp) * 9 / 5 + 32).toFixed(2) + '°F';
            disFeelTemp = (weatherData.main.feels_like * 9/5 + 32).toFixed(2) + '°F';
        }
    }

    return (
        // Render the weather page with sidebar, header, and weather details
        <div className="weather-page">
            <Sidebar city={city} />
            <div className="main-content">
                {/* This displays the name of city and dropdown menu*/}
                <header>

                    <h1>{weatherData?.name }</h1>
                    {/* This displays the different regions*/}
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
                        {/* This displays the current weather information */}
                        <div className="weather-info">
                                    <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt="Weather icon" />
                                    
                                    <p>{disTemp}</p>
                                    <p>{weatherData?.weather[0]?.description}</p>

                            <div className="weather-boxes">

                                <div className="box">
                                    <p>Feels like</p>
                                    <p>{disFeelTemp}</p>
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
                                    <p>Humidity</p>
                                    <p>{weatherData?.main?.humidity}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="weather-info">
                                {/* This displays the weather map */}
                                <WeatherMap weatherData={weatherData} />
                                <img src={windSpeed} alt="Indicator"/>
                        </div>

                    </div>
                        <div className="weather-alerts">
                            {/* This displays the extreme weather warnings if there are any*/}
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
