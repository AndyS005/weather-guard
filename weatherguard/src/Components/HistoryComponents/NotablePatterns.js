import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./fetchHistory";

const NotablePatterns = ({ city }) => {
  const [patterns, setPatterns] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // Load weather data for the past 30 days
  useEffect(() => {
    const loadWeatherData = async () => {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - 7);
      const endingDate = endDate.toISOString().split("T")[0];

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const startingDate = startDate.toISOString().split("T")[0];

      try {
        const fetchedData = await fetchWeatherData(city, startingDate, endingDate);
        console.log(fetchedData);
        // Check if fetchedData and fetchedData.daily exist
        if (fetchedData && fetchedData.daily) {
          setWeatherData(fetchedData.daily);
        } else {
          console.error("Weather data is missing or not in expected format");
          setWeatherData([]); // Set an empty array as fallback
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData([]); // Set an empty array in case of error
      }
    };

    loadWeatherData();
  }, [city]);

  // Process weather patterns when weatherData changes
  useEffect(() => {
    if (!weatherData || weatherData.length === 0) {
      return; // Skip if there's no data
    }

    const gatherPatterns = () => {
      let weatherPatterns = [];

      // Check if wind speed data exists and is valid before processing
      const windSpeedData = weatherData?.wind_speed_10m_max ?? [];
      if (windSpeedData.length >= 3) {
        let avgWindSpeedStart = windSpeedData.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
        let avgWindSpeedEnd = windSpeedData.slice(-3).reduce((a, b) => a + b, 0) / 3;

        if (avgWindSpeedEnd > avgWindSpeedStart * 1.1) {  // 10% increase threshold
          weatherPatterns.push({
            type: "Increasing Wind Intensity",
            description: `10% increase in average wind speed over the last month.`,
          });
        }

        if (avgWindSpeedEnd < avgWindSpeedStart * 0.9) {
          weatherPatterns.push({
            type: "Decreasing Wind Intensity",
            description: `Wind speed has decreased by more than 10% over the last month.`,
          });
        }
      }

      // Check if precipitation data exists and is valid before processing
      const precipitationData = weatherData?.precipitation_sum ?? [];
      if (precipitationData.length >= 3) {
        let avgRainfallStart = precipitationData.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
        let avgRainfallEnd = precipitationData.slice(-3).reduce((a, b) => a + b, 0) / 3;

        if (avgRainfallEnd < avgRainfallStart * 0.8) {
          weatherPatterns.push({
            type: "Decreasing Rainfall",
            description: "Rainfall amounts have dropped significantly over the last month.",
          });
        } else if (avgRainfallEnd > avgRainfallStart * 1.2) {
          weatherPatterns.push({
            type: "Increasing Rainfall",
            description: "Rainfall has increased by more than 20% in recent weeks.",
          });
        }
      }

      // Check if temperature data exists and is valid before processing
      const temperatureData = weatherData?.temperature_2m_max ?? [];
      if (temperatureData.length >= 3) {
        let avgTempStart = temperatureData.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
        let avgTempEnd = temperatureData.slice(-3).reduce((a, b) => a + b, 0) / 3;

        if (avgTempEnd < avgTempStart - 2) {
          weatherPatterns.push({
            type: "Cooling Trend",
            description: "Average daily temperatures have decreased gradually.",
          });
        } else if (avgTempEnd > avgTempStart + 2) {
          weatherPatterns.push({
            type: "Warming Trend",
            description: "A steady increase in daily temperatures has been observed.",
          });
        }
      }

      setPatterns(weatherPatterns);
    };

    gatherPatterns();
  }, [weatherData]); // Only run gatherPatterns when weatherData changes

  return (
    <div>
      <h2>Notable Patterns</h2>
      {patterns.length === 0 ? (
        <p className="text-gray-400">No notable patterns detected.</p>
      ) : (
        <ul>
          {patterns.map((pattern, index) => (
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
