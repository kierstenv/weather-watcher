const searchBtnEl = document.querySelector('#search-btn');
const clearBtnEl = document.querySelector('#clear-btn');
const cityInputEl = document.querySelector('#city-input');
const savedCityEl = document.querySelectorAll('div.city');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fc7b3204a1msh0c2f8953f3100a8p1b3e5cjsn096e40600e11',
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
	}
};

const getCurrentWeather = (city) => {
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e820387128e6fe0d92e2a3bb21d58e91';
  
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

const displayWeather = (data) => {
  const weatherContainerEl = document.querySelector('#weather-container');
  weatherContainerEl.innerHTML = '';

  const weatherEl = document.createElement('div');
  weatherEl.classList.add('weather');

  const date = new Date();
  const dateString = date.toLocaleDateString();
  
  weatherEl.innerHTML = `
    <h2>${data.name}
      <span>(${dateString})</span>
    </h2>
    <p>Temperature: ${data.main.temp} &deg;F</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} mph</p>
    <p>Conditions: ${data.weather[0].main}</p>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
  `;
  weatherContainerEl.appendChild(weatherEl);
}

const saveCity = (city) => {
  const cityList = JSON.parse(localStorage.getItem('cityList')) || [];
  if (cityList.includes(city)) {
    alert('City already exists!');
  } else {
    cityList.push(city);
    localStorage.setItem('cityList', JSON.stringify(cityList));
  }
}

const displaySavedCities = () => {
  const cityList = JSON.parse(localStorage.getItem('cityList')) || [];
  const savedCitiesEl = document.querySelector('#saved-cities');
  savedCitiesEl.innerHTML = '';
  cityList.forEach((city) => {
    const cityEl = document.createElement('div');
    cityEl.classList.add('city');
    cityEl.innerHTML = `
      <h3>${city}</h3>
    `;
    savedCitiesEl.appendChild(cityEl);
  });
}

const loadSavedCity = (event) => {
  const city = event.target.innerText;
  getCurrentWeather(city);
}

const formSubmitHandler = (event) => {
  event.preventDefault();
  
  const city = cityInputEl.value.trim();

  if (!city) {
    alert('Please enter a city!');
  } else if (city == localStorage.getItem('cityList')) {
    alert('City already exists!');
  } else {
    saveCity(city);
    displaySavedCities();
    getCurrentWeather(city);
  }
};

const clearCities = (event) => {
  event.preventDefault();

  localStorage.clear();
  displaySavedCities();
}

displaySavedCities();

searchBtnEl.addEventListener('click', formSubmitHandler);
clearBtnEl.addEventListener('click', clearCities);
savedCityEl.forEach((city) => {
  city.addEventListener('click', loadSavedCity);
});