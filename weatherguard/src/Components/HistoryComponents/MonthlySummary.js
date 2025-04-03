import React,{useState,useEffect} from "react";
import { fetchWeatherData } from "./fetchHistory";
import '../../CSS/MonthlySummary.css';

const MonthlySummary = ({city}) => {//pass city through the props to be able to display information on specified city
    const [summary, setSummary] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const settings = JSON.parse(localStorage.getItem("settings_"));
    console.log(settings['tempUnit']);

    useEffect(() => {
        const loadWeatherData = async () => {
            const today = new Date(); //gets todays date
            const fetchedData = []; 
    
            for (let i = 0; i < 4; i++) { //run 4 times to get the data for the last 4 months
                //obtain a start date and set it to be the first of the month e.g 1st March 2025
                const startDate = new Date(today);
                startDate.setMonth(startDate.getMonth() - (i + 1));
                startDate.setDate(1);
                
                //obtain an end date that contains the last date of that month e.g 31 March 2025
                const endDate = new Date(startDate);
                endDate.setMonth(startDate.getMonth() + 1);
                endDate.setDate(0);
    
                //format date to show month and year e.g March 2025
                const startDateStr = startDate.toISOString().split("T")[0];
                const endDateStr = endDate.toISOString().split("T")[0];
    
                const data = await fetchWeatherData(city, startDateStr, endDateStr);
                fetchedData.push({
                    // Push to the array the month year and the data that corresponds to it
                    month: startDate.toLocaleString("default", { month: "long", year: "numeric" }),
                    data: data.daily
                });
            }
    
            console.log(fetchedData);
            setWeatherData(fetchedData);
        };
    
        loadWeatherData();
    }, [city]);

    useEffect(() => { //useEffect is always run when the DOM first loads
        const getAverage = () => {
            if (!weatherData || weatherData.length === 0) return; // Prevent errors
    
            const summaries = weatherData.map(({ month, data }) => {
                if (!data) return null;
    
                const days = data.time.length; // obtains the amount of days within that month in order to calculate averages
    
                // obtain the average temperature using the max and min temps given by the api
                const avgTemp = data.temperature_2m_max.reduce(
                    (sum, val, i) => sum + (val + data.temperature_2m_min[i]) / 2, 0
<<<<<<< HEAD
                ) / days; 
                
                // obtain the average rainfall using the precipitation sum given by the api
=======
                ) / days;

                let disTemp = avgTemp
    
                console.log(settings["tempUnit"]);
                if (settings["tempUnit"] == "Celsius"){
                    disTemp = avgTemp.toFixed(2) + '°C';
                } else{
                    disTemp = (avgTemp * 9/5 + 32).toFixed(2) + "°F";
                }

>>>>>>> 3d308b783aeaef164de73c0d255fbc1d083dc877
                const avgPrecipitation = data.precipitation_sum.reduce((sum, val) => sum + val, 0) / days;

                // obtain the average windspeed using the wind speed at 10m of the ground given by the api
                const avgWindSpeed = data.wind_speed_10m_max.reduce((sum, val) => sum + val, 0) / days;
                
                //stores the corresponding data into one element on the array
                return {
                    month,
                    disTemp: disTemp, 
                    avgPrecipitation: avgPrecipitation.toFixed(2),
                    avgWindSpeed: avgWindSpeed.toFixed(2),
                };
            });
    
            console.log(summaries);
            setSummary(summaries); 
        };
    
        getAverage();
    }, [weatherData]);

    return (
        <article>
            <h2 className="component-header">Monthly Summary</h2>
            {summary.length > 0 ? (
                <ul>
                    {summary.map(({ month, disTemp, avgPrecipitation, avgWindSpeed }) => (
                    <div key={`${month}`} className="month-container">
                        <li className="Averages">
                            <h3 className="months-summary">{month}</h3>
                            
                            <p>🌡️ Avg Temp: {disTemp}</p>
                            <p>🌧️ Avg Precipitation: {avgPrecipitation} mm</p>
                            <p>💨 Avg Wind Speed: {avgWindSpeed} km/h</p>
                        </li>
                    </div>
                    ))}
                </ul>
            ) : (
                <p>Loading weather data...</p> // displayed if fetching data is taking too long typically due to connectivity
            )}
        </article>
    )
};

export default MonthlySummary;