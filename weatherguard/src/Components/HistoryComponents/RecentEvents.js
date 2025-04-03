import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./fetchHistory";
import '../../CSS/RecentEvent.css';

const RecentEvents = ({ city }) => {//pass city through the props to be able to display information on specified city
    const [events, setEvents] = useState([]);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const loadWeatherData = async () => {
            const today = new Date().toISOString().split("T")[0]; //todays date

            const oneWeeksAgo = new Date();
            oneWeeksAgo.setDate(oneWeeksAgo.getDate() - 7);
            const oneWeeksAgoDate = oneWeeksAgo.toISOString().split("T")[0]; // date last week

            const fetchedData = await fetchWeatherData(city, oneWeeksAgoDate, today);
            console.log(fetchedData);
            setWeatherData(fetchedData.daily);
        };

        loadWeatherData();
    }, [city]);

    useEffect(() => {
        if (!weatherData) return;

        console.log(weatherData);

        const createEvents = () => {
            let weatherEvents = [];

            for (let i = 0; i < weatherData.time.length; i++) {
                console.log(weatherData.time[i]);

                // Wind Events that occured in the last week
                if (weatherData.wind_speed_10m_max[i] > 5 && weatherData.wind_speed_10m_max[i] <= 10) { //moderate class still harmful but only to young crops
                    weatherEvents.push({
                        date: weatherData.time[i],
                        type: "Moderate Winds",
                        description: `Wind speeds of ${weatherData.wind_speed_10m_max[i]} m/s were reached, affecting young crops.`,
                    });
                }  
                if (weatherData.wind_speed_10m_max[i] > 10) { // dangerous class. very harmful to any crops
                    weatherEvents.push({
                        date: weatherData.time[i],
                        type: "Strong Winds",
                        description: `Wind speeds of ${weatherData.wind_speed_10m_max[i]} m/s were reached, affecting all crops dangerously.`,
                    });
                }

                // Temperature Events that occured in the last week
                if (weatherData.temperature_2m_max[i] > 28) { //dangerously hot temps for crops
                    weatherEvents.push({
                        date: weatherData.time[i],
                        type: "Dangerous Temperatures",
                        description: `Temperature of up to ${weatherData.temperature_2m_max[i]}°C, dangerously affecting crops.`,
                    });
                }  
                if (weatherData.temperature_2m_max[i] < 0) {// dangerously low temps for crops
                    weatherEvents.push({
                        date: weatherData.time[i],
                        type: "Critically Low Temperature",
                        description: `Temperature below ${weatherData.temperature_2m_max[i]}°C, causing frost to build up.`,
                    });
                }

                // Rain Events that occured in the last week
                if (weatherData.precipitation_sum[i] > 7.5) {// dangerous amounts of rain for crops and soil
                    weatherEvents.push({
                        date: weatherData.time[i],
                        type: "Excessive Rainfall",
                        description: `Total Rainfall accumulated ${weatherData.precipitation_sum[i]} mm, affecting soil.`,
                    });
                }
            }

            setEvents(weatherEvents);  
        };

        createEvents();
    }, [weatherData]);

    return (
        <article>
            <h2 className="event-title">Recent Events</h2>

            {events.length === 0 ? (
                <p className="no-events">No major events within the last week.</p>
            ) : (
                <ul className="event-list">
                    {events.map((event, index) => ( //loop through all events and display them
                        <li key={index} className="event-item">
                            <h3 className="event-title">{event.type}</h3>
                            <p className="event-date">{event.date}</p>
                            <p>{event.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
};

export default RecentEvents;
