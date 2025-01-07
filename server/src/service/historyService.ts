import fs from 'fs';
//import path from 'path';

// TODO: Define a City class with name and id properties
// TODO: Complete the HistoryService class

  //define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {}
}

  //completes the HistoryService class
class HistoryService {
  // Defines the path to the searchHistory.json file
  private filePath = 'db/searchHistory.json';

  // Completes the read method
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return []; // Return an empty array if the file does not exist
      }
      throw error;
    }
  }

    //Completes the write method
  private async write(cities: City[]): Promise<void> {
    await fs.promises.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

    //Completes the getCities method
  async getCities(): Promise<City[]> {
    return await this.read();
  }

    //New method to get city search history
  async getCitySearchHistory(): Promise<City[]> {
    return await this.read(); // Reuse the read method to get the city search history
  }

    //Method to save a city to the search history
  async saveCitySearch(name: string): Promise<void> {
    const cities = await this.read();
    const id = (cities.length + 1).toString(); // Generate a unique ID
    const newCity = new City(name, id);
    cities.push(newCity);
    await this.write(cities);
  }

    //Method to delete a city from the search history
  async deleteCitySearch(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id); // Filter out the city with the given ID
    await this.write(cities);
  }
}

  //Exports the HistoryService class
export default new HistoryService();