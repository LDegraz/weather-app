import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
// TODO: GET weather data from city name
// TODO: save city to search history
  //defines the POST route to retrieve weather data
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherByCity(city);
    await HistoryService.saveSearch(city);

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  //defines the GET route to retrieve search history
  try {
    const history = await HistoryService.getSearchHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  //defines the DELETE route to delete a city from the search history
  try {
    const { id } = req.params;
    await HistoryService.deleteSearch(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete search history' });
  }
});

export default router;