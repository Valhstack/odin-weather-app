import { API_KEY } from "../../config.js";
import { renderWeatherInfo, renderWeatherForecast } from "./render.js";

function fetchWeather(lat, lon, units) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}&units=${units}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            renderWeatherInfo(response);
        });
}

function fetchWeatherForecast(lat, lon, units) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            renderWeatherForecast(response);
        });
}

export { fetchWeather, fetchWeatherForecast };