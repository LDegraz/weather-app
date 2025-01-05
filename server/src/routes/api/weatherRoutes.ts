import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
  //post request with city name to retrieve weather data
  router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const { city } = req.body;
      if (!city || typeof city !== 'string') {
        return res.status(400).json({ error: 'City name must be a string' });
      }
      const weatherData = await WeatherService.getWeatherForCity(city);
      if (!weatherData) {
        return res.status(404).json({ error: 'Weather data not found' });
      }
      res.status(200).json({ message: 'Weather data retrieved successfully', weatherData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
  });

// TODO: GET weather data from city name
  //get weather data from city name
router.get('/history', async (_req: Request, res: Response): Promise<void> => {
  try {
    const history = await HistoryService.getCitySearchHistory();
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// TODO: save city to search history
  //save city to search history
  router.post('/history', async (req: Request, res: Response): Promise<void> => {
    try {
      const { city } = req.body;
      if (!city || typeof city !== 'string') {
        return res.status(400).json({ error: 'City name must be a string' });      }
      await HistoryService.saveCitySearch(city); // Assuming you have a method to save the city
      res.status(201).json({ message: 'City saved to search history' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save city to search history' });
    }
  });
  
// * BONUS TODO: DELETE city from search history
  //delete city from search history
  router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; {
      await HistoryService.deleteCitySearch(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete search history' });
    }
  });
  
  export default router;