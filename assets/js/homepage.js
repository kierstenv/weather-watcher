const searchFormEl = document.querySelector('#search-form');
const cityInputEl = document.querySelector('#city-input');

const getCurrentWeather = (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={49042751232a48d91ff906490e4d6b94}`;

  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayWeather(data);
      });
    } else {
      alert("Error: City Not Found!");
    }
  })
  .catch((error) => {
    alert("Unable to connect to OpenWeatherMap.");
  });
}

const formSubmitHandler = (event) => {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    getCurrentWeather(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city!");
  }
};

const displayWeather = (weather) => {
  const city = weather.name;
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const weatherDescription = weather.weather[0].description;
  const iconCode = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  const cityEl = document.createElement('h2');
  cityEl.classList.add('city');
  cityEl.textContent = city;

  const tempEl = document.createElement('p');
  tempEl.classList.add('temp');
  tempEl.textContent = `Temperature: ${temp} F`;

  const humidityEl = document.createElement('p');
  humidityEl.classList.add('humidity');
  humidityEl.textContent = `Humidity: ${humidity}%`;

  const windSpeedEl = document.createElement('p');
  windSpeedEl.classList.add('wind-speed');
  windSpeedEl.textContent = `Wind Speed: ${windSpeed} MPH`;

  const weatherDescriptionEl = document.createElement('p');
  weatherDescriptionEl.classList.add('weather-description');
  weatherDescriptionEl.textContent = `Weather: ${weatherDescription}`;

  const iconEl = document.createElement('img');
  iconEl.classList.add('weather-icon');
  iconEl.src = iconUrl;

  const weatherContainerEl = document.querySelector('.weather-container');
  weatherContainerEl.appendChild(cityEl);
  weatherContainerEl.appendChild(tempEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windSpeedEl);
  weatherContainerEl.appendChild(weatherDescriptionEl);
  weatherContainerEl.appendChild(iconEl);
}

searchFormEl.addEventListener('submit', formSubmitHandler);
