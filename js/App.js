const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const title = document.querySelector('.title');

const updateUI = (data) => {
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
  <h5 class="my-3 ${!weather.IsDayTime ? 'text-white' : ''}">${cityDets.EnglishName}</h5>
  <div class="my-3 ${!weather.IsDayTime ? 'text-light' : ''}">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span class="${!weather.IsDayTime ? 'text-light' : ''}">${weather.Temperature.Metric.Value}</span>
    <span class="${!weather.IsDayTime ? 'text-light' : ''}">&deg;C</span>
  </div>
  `;

  //update the night/day & icon images

  const darkMode = (isDayTime) => {
    if (!isDayTime) {
      document.body.classList.add('night');
      title.classList.add('night');
      cityForm.classList.add('night');
      card.classList.add('night');
    } else if (isDayTime) {
      document.body.classList.remove('night');
      title.classList.remove('night');
      cityForm.classList.remove('night');
      card.classList.remove('night');
    }
  };

  darkMode(weather.IsDayTime);

  const iconSrc = `assets/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  weather.IsDayTime === true ? (timeSrc = 'assets/images/day.svg') : (timeSrc = 'assets/images/night.svg');

  time.setAttribute('src', timeSrc);

  //remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
