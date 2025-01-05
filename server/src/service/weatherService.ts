import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
  //defines an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
  //defines a class for the Weather object
class Weather {
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  icon: string;

  constructor(city: string, temp: number, humidity: number, windSpeed: number, uvIndex: number, icon: string) {
    this.city = city;
    this.temp = temp;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.uvIndex = uvIndex;
    this.icon = icon;
  }

  formatWeather() {
    return `${this.city} - Temp: ${this.temp}°F, Humidity: ${this.humidity}%, Wind Speed: ${this.windSpeed} MPH, UV Index: ${this.uvIndex}`;
  }
}

// TODO: Complete the WeatherService class
  //completes the WeatherService class
class WeatherService {
  private baseURL: string;
  private APIKey: string;
  private cityName: string;

  constructor(apiKey: string) {
    this.APIKey = apiKey;
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.cityName = '';
  }

  //creates fetchLocationData method
  private async fetchLocationData(query: string) {
    const url = `${this.baseURL}/weather?q=${query}&appid=${this.APIKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  //creates destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon
    };
  }

  //creates buildGeocodeQuery method
  //private buildGeocodeQuery(): string {
    //return `${this.baseURL}/weather?q=${this.cityName}&appid=${this.APIKey}`;
  //}

  //creates buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.APIKey}`;
  }

  //creates fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  //creates fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  //builds parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const { name: city, main: { temp, humidity }, wind: { speed: windSpeed }, uvi: uvIndex, weather } = response;
    const icon = weather[0].icon;
    return new Weather(city, temp, humidity, windSpeed, uvIndex, icon);
  }

  //completes buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((data: any) => {
      const { temp, humidity, wind_speed: windSpeed, uvi: uvIndex, weather } = data;
      const icon = weather[0].icon;
      return new Weather(currentWeather.city, temp, humidity, windSpeed, uvIndex, icon);
    });
  }

  //completes getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData.current);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    return { currentWeather, forecastArray };
  }
}

//exports the WeatherService class
export default new WeatherService(process.env.API_KEY || '');
