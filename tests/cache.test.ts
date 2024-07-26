import { getCache, setCache } from '../src/cache';
import { WeatherData } from '../src/types';

describe('Cache', () => {
  it('should cache and retrieve weather data', async () => {
    const weatherData: WeatherData = {
      city: 'London',
      date: '2024-07-20',
      temperatureCelsius: 20,
      temperatureFahrenheit: 68,
    };

    await setCache('London', '2024-07-20', weatherData);
    const cachedData = await getCache('London', '2024-07-20');

    expect(cachedData).toEqual(weatherData);
  });
});
