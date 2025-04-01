import React,{useState, useEffect} from "react";
import {fetchWeatherData} from './fetchHistory';

const RecentEvents = ({city}) => {
    const [event,setEvent] = useState(null);
    const [weatherData,setWeatherData] = useState(null);

    useEffect(() =>{
        const loadWeatherData = async () => {
            const today = new Date().toISOString().split('T')[0];

            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
            const twoWeeksAgoDate = twoWeeksAgo.toISOString().split('T')[0];

            const fetchedData = await fetchWeatherData(city, twoWeeksAgoDate, today);
            console.log(fetchedData);
            setWeatherData(fetchedData.daily);
        };
        loadWeatherData()
    },[city]);

    useEffect(() => {
        if (!weatherData) return;

        const createEvents = () => {

            let weatherEvents = [];
            for(let i = 0; i < weatherData.time.length; i++){
                console.log(weatherData.time[i]);

                if (weatherData.wind_speed_10m_max[i] > 5 && weatherData.wind_speed_10m_max[i] <= 10) {
                    weatherEvents.push ({
                        date: weatherData.time[i],
                        type: "Moderate Winds",
                        desctription: `Wind speeds of ${weatherData.wind_speed_10m_max[i]} m/s were reached, affecting young crop`
                    })
                } else if (weatherData.wind_speed_10m_max[i] > 10){
                    weatherEvents.push ({
                        date: weatherData.time[i],
                        type: "Strong Winds",
                        desctription: `Wind speeds of ${weatherData.wind_speed_10m_max[i]} m/s were reached, affecting all crops dangerously`
                    })
                }
            }
        }

        createEvents();
    },[weatherData]);
    
    return (
        <article>
            <h2>Recent Events</h2>
            
        </article>
    );
};

export default RecentEvents;