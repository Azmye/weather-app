class Forecast {
  constructor() {
    this.key = 'GNQAboJdL56MXJ5b251Iv47DnVJmYA0B';
    this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  }
  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);

    return { cityDets, weather };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const data = await response.json();

    return data[0];
  }
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI + query, {
      headers: {
        'Content-Type': 'text/plain',
      },
      mode: 'cors',
    });

    const data = await response.json();

    return data[0];
  }
}
