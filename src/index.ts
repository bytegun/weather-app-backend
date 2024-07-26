import express from 'express';
import { getWeather } from './weatherService';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
  const { city, date } = req.query;

  if (!city || !date) {
    return res.status(400).send('City and date are required');
  }

  try {
    const weather = await getWeather(city as string, date as string);
    res.json(weather);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
