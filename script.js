// Event listener & variable declaration
const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");

// initale search value
let searchCity = "Berlin";

// Weather object
const weather = {
  apiKey: "7966c34dfdc2c599ce24f56248ea9aea",
  fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.renderWeather(data));
  },
  renderWeather(data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, temp_max, temp_min, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp_min").innerText = `${Math.round(temp_min)}°C`;
    document.querySelector(".temp").innerText = `${Math.round(temp)}°C`;
    document.querySelector(".temp_max").innerText = `${Math.round(temp_max)}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(
      ".container"
    ).style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
  },
  query() {
    // get searchbar input
    this.fetchWeather(searchBar.value);
  },
};

const search = () => {
  searchButton.addEventListener("click", () => {
    weather.query();
  });

  searchBar.addEventListener("keydown", (e) => {
    e.key === "Enter" && weather.query();
  });
};

// fetch initale data
weather.fetchWeather(searchCity);
search();
