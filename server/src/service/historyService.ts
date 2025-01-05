import fs from 'fs';
import path from 'path';

// TODO: Define a City class with name and id properties

// TODO: Complete the HistoryService class
  //completes the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

//defines the path to the searchHistory.json file
const filePath = path.join(__dirname, 'searchHistory.json');

//defines the City class
class City {
  constructor(public name: string, public id: string) {}
}

//completes the read method
class HistoryService {
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  //completes the write method
  private async write(cities: City[]): Promise<void> {
    await fs.promises.writeFile(filePath, JSON.stringify(cities, null, 2));
  }

  //completes the getCities method
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  //completes the addCity method
  async addCity(name: string): Promise<void> {
    const cities = await this.read();
    const id = (cities.length + 1).toString();
    const newCity = new City(name, id);
    cities.push(newCity);
    await this.write(cities);
  }

  //completes the removeCity method
  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

//exports the HistoryService class
export default new HistoryService();