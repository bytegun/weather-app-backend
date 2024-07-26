import axios from 'axios';
import { getCache, setCache } from './cache';
import { WeatherData } from './types';
import { convertTemperature } from './utils';

const API_URL = 'https://staging.v4.api.wander.com/hiring-test/weather';

export async function getWeather(city: string, date: string): Promise<WeatherData> {
  const cachedWeather = await getCache(city, date);
  if (cachedWeather) {
    return cachedWeather;
  }

  try {
    const response = await axios.get(`${API_URL}?city=${city}&date=${date}`);
    let temperature = response.data.temperature;
    let scale = response.data.scale;

    if (scale === 'fahrenheit') {
      temperature = convertTemperature(temperature, 'F');
    }

    const weatherData: WeatherData = {
      city,
      date,
      temperatureCelsius: temperature,
      temperatureFahrenheit: convertTemperature(temperature, 'C'),
    };

    await setCache(city, date, weatherData);

    return weatherData;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}
