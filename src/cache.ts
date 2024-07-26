import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { WeatherData } from './types';

const dbPromise = open({
  filename: 'weather.db',
  driver: sqlite3.Database,
});

async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cache (
      city TEXT,
      date TEXT,
      temperatureCelsius REAL,
      temperatureFahrenheit REAL,
      PRIMARY KEY (city, date)
    )
  `);
}

initializeDatabase();

export async function getCache(city: string, date: string): Promise<WeatherData | null> {
  const db = await dbPromise;
  const row = await db.get('SELECT * FROM cache WHERE city = ? AND date = ?', [city, date]);

  if (row) {
    return {
      city: row.city,
      date: row.date,
      temperatureCelsius: row.temperatureCelsius,
      temperatureFahrenheit: row.temperatureFahrenheit,
    };
  }
  return null;
}

export async function setCache(city: string, date: string, weatherData: WeatherData): Promise<void> {
  const db = await dbPromise;
  await db.run(
    'INSERT INTO cache (city, date, temperatureCelsius, temperatureFahrenheit) VALUES (?, ?, ?, ?)',
    [city, date, weatherData.temperatureCelsius, weatherData.temperatureFahrenheit]
  );
}
