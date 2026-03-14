import { fetchWeather, fetchWeatherForecast } from "./weather.js";

const attachListeners = (items, handler) => {
    for (let item of items) {
        item.addEventListener("click", handler);
    }
};

const listeners = () => {
    document.getElementById("celcius-btn").addEventListener("click", (e) => {
        const location = document.getElementById("weather-result");
        if (!document.getElementById("celcius-btn").classList.contains("selected-btn")) {
            document.getElementById("celcius-btn").classList.add("selected-btn");
            document.getElementById("farengheight-btn").classList.remove("selected-btn");
            fetchWeather(location.dataset.lat, location.dataset.lon, "metric");
        }
    });

    document.getElementById("farengheight-btn").addEventListener("click", (e) => {
        const location = document.getElementById("weather-result");
        if (!document.getElementById("farengheight-btn").classList.contains("selected-btn")) {
            document.getElementById("farengheight-btn").classList.add("selected-btn");
            document.getElementById("celcius-btn").classList.remove("selected-btn");
            fetchWeather(location.dataset.lat, location.dataset.lon, "imperial");
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, () => { });
    }

    function success(position) {
        fetchWeather(position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2), "metric");
        fetchWeatherForecast(position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2), "metric");
    }
}

export { attachListeners, listeners };