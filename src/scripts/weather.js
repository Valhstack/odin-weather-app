import { API_KEY } from "../../config.js";
import { renderWeatherInfo } from "./render.js";

function fetchWeather(lat, lon, units) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}&units=${units}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            renderWeatherInfo(response);
        });
}

export { fetchWeather };