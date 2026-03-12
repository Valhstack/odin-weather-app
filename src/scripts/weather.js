import { API_KEY } from "../../config.js";
import { renderWeatherInfo } from "./render.js";

function fetchWeather(lon, lat) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            renderWeatherInfo(response);
        });

    console.log(document.getElementById("city-search").value);
}

export { fetchWeather };