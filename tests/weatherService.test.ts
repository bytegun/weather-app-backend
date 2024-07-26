import { getWeather } from '../src/weatherService';

describe('Weather Service', () => {
  it('should fetch weather data and convert temperature', async () => {
    const weather = await getWeather('London', '2024-07-20');
    expect(weather.city).toBe('London');
    expect(weather.date).toBe('2024-07-20');
    expect(weather.temperatureCelsius).toBeDefined();
    expect(weather.temperatureFahrenheit).toBeDefined();
  });
});
