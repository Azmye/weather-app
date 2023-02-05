const key = 'GNQAboJdL56MXJ5b251Iv47DnVJmYA0B';

//get weather information
const getWeather = async (locKey) => {
  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${locKey}?apikey=${key}`;

  const response = await fetch(base + query, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  const data = await response.json();

  return data[0];
};

//get city information
const getCity = async (city) => {
  const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  const data = await response.json();

  return data[0];
};
