import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./fetchHistory";

const NotablePatterns = ({ city }) => { //pass city through the props to be able to display information on specified city
  const [patterns, setPatterns] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // Load weather data for the past 30 days
  useEffect(() => {
    const loadWeatherData = async () => {
      //obtain the date from one week ago
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - 7);
      const endingDate = endDate.toISOString().split("T")[0];

      //obtain date from a month ago
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const startingDate = startDate.toISOString().split("T")[0];

      try {
        //fetch historical data during those dates
        const fetchedData = await fetchWeatherData(city, startingDate, endingDate);
        console.log(fetchedData);

        if (fetchedData) {
          setWeatherData(fetchedData.daily); // store data into weatherData

        } else {
          console.error("Weather data is missing or not in expected format");
          setWeatherData([]); //set as [] to avoid null errors
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData([]); //set as [] to avoid null errors
      }
    };

    loadWeatherData();
  }, [city]);

  useEffect(() => {
    if (!weatherData || weatherData.length === 0) { //Prevent errors
      return; 
    }

    const gatherPatterns = () => {
      let weatherPatterns = [];


      const windSpeedData = weatherData?.wind_speed_10m_max ?? []; //ensures that none of the fields retrieved from the api are null
      if (windSpeedData.length >= 3) {
        let avgWindSpeedStart = windSpeedData.slice(0, 3).reduce((a, b) => a + b, 0) / 3; //obtain wind speed avg from the first 3 days of data
        let avgWindSpeedEnd = windSpeedData.slice(-3).reduce((a, b) => a + b, 0) / 3; //obtain wind speed avg from the last 3 days of data

        //using the averges to analyze the data patterns
        if (avgWindSpeedEnd > avgWindSpeedStart * 1.1) { //increasing wind speed if wind speed is more than 10%
          weatherPatterns.push({
            type: "Increasing Wind Intensity",
            description: `10% increase in average wind speed over the last month.`,
          });
        } else if (avgWindSpeedEnd < avgWindSpeedStart * 0.9) {//decreasing wind speed if wind speed is less by 10%
          weatherPatterns.push({
            type: "Decreasing Wind Intensity",
            description: `Wind speed has decreased by more than 10% over the last month.`,
          });
        }
      }


      const precipitationData = weatherData?.precipitation_sum ?? [];//ensures that none of the fields retrieved from the api are null
      if (precipitationData.length >= 3) {
        let avgRainfallStart = precipitationData.slice(0, 3).reduce((a, b) => a + b, 0) / 3;//obtain rainfall avg from the first 3 days of data
        let avgRainfallEnd = precipitationData.slice(-3).reduce((a, b) => a + b, 0) / 3;//obtain rainfall avg from the last 3 days of data

        //using the averges to analyze the data patterns
        if (avgRainfallEnd < avgRainfallStart * 0.8) {//decreasing rainfall if latest rainfall is below 20% than previous
          weatherPatterns.push({
            type: "Decreasing Rainfall",
            description: "Rainfall amounts have dropped significantly over the last month.",
          });
        } else if (avgRainfallEnd > avgRainfallStart * 1.2) {// increase in rainfall if latest avg is more that previous by 20%
          weatherPatterns.push({
            type: "Increasing Rainfall",
            description: "Rainfall has increased by more than 20% in recent weeks.",
          });
        }
      }

      const temperatureData = weatherData?.temperature_2m_max ?? [];//ensures that none of the fields retrieved from the api are null
      if (temperatureData.length >= 3) {
        let avgTempStart = temperatureData.slice(0, 3).reduce((a, b) => a + b, 0) / 3;//obtain temperature avg from the first 3 days of data
        let avgTempEnd = temperatureData.slice(-3).reduce((a, b) => a + b, 0) / 3; //obtain temperature avg from the last 3 days of data

        //using the averges to analyze the data patterns
        if (avgTempEnd < avgTempStart - 2) {//cooling temps if temperature difference is more than 2 less that start
          weatherPatterns.push({
            type: "Cooling Trend",
            description: "Average daily temperatures have decreased gradually.",
          });
        } else if (avgTempEnd > avgTempStart + 2) {// warmer temps if temperature difference is more than from the start
          weatherPatterns.push({
            type: "Warming Trend",
            description: "A steady increase in daily temperatures has been observed.",
          });
        }
      }

      setPatterns(weatherPatterns);
    };

    gatherPatterns();
  }, [weatherData]); 

  return (
    <div>
      <h2>Notable Patterns</h2>
      {patterns.length === 0 ? (
        <p>No notable patterns detected.</p>
      ) : (
        <ul>
          {patterns.map((pattern, index) => ( //loop through each element and display the patterns
            <li key={index} className="event-item">
              <h3 className="event-title">{pattern.type}</h3>
              <p>{pattern.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotablePatterns;
