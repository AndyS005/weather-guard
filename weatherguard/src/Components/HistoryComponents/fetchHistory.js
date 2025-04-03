const getCoordinates = async (city) => { //API responsible for getting the coordinates of the city that is entered
    const CoOrdsApi = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    try {
        const response = await fetch(CoOrdsApi);
        const data = await response.json();
    
        if (data.results && data.results.length > 0) {
          const { latitude, longitude } = data.results[0];
          return { latitude, longitude };
        } else {
          console.error('City not found');
          return null;
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
      }
};

const fetchWeatherData = async (city, startDate, endDate) => { // API that gets historical data depending on the city and the start and end date defining the time for which we require the data
  const coOrds = await getCoordinates(city);
  
  if (!coOrds) {
      console.error(`Could not fetch coordinates for city: ${city}`);
      return null;
  }

  const { latitude, longitude } = coOrds;
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&temperature_unit=celsius&precipitation_unit=mm&wind_speed_unit=ms&timezone=GMT&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
  }
};

export { getCoordinates, fetchWeatherData }; // allows for other programs to make use of these functions where needed.
