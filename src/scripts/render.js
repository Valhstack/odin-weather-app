const render = (function () {
    const reset = (elemID, className) => {
        const elems = document.getElementById(elemID).querySelectorAll(className);

        elems.forEach(elem => elem.remove());
    };

    const cityDropdownItems = (list, city, lat, lon) => {
        const divCity = document.createElement("div");
        const pCityInfo = document.createElement("p");
        pCityInfo.textContent = city;
        divCity.classList.add("city-info-dropdown-item");

        divCity.dataset.lat = lat;
        divCity.dataset.lon = lon;
        divCity.appendChild(pCityInfo);
        list.appendChild(divCity);
    };

    const weatherInfo = (result) => {
        const divResults = document.getElementById("weather-result");

        const divDescription = document.createElement("div");
        const pDescription = document.createElement("p");

        pDescription.textContent = result.weather[0].description;

        const imgWeatherIcon = document.createElement("img");
        imgWeatherIcon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

        divDescription.appendChild(pDescription);
        divDescription.appendChild(imgWeatherIcon);

        const divTemperature = document.createElement("div");
        const pCurrentTemp = document.createElement("p");
        const pMinTemp = document.createElement("p");
        const pMaxTemp = document.createElement("p");
        const pHumidity = document.createElement("p");

        pCurrentTemp.textContent = `Current temperature: ${result.main.temp}`;
        pMinTemp.textContent = `Minimal temperature today: ${result.main.temp_min}`;
        pMaxTemp.textContent = `Maximal temperature today: ${result.main.temp_max}`;
        pHumidity.textContent = `Humidity: ${result.main.humidity}%`;

        divTemperature.appendChild(pCurrentTemp);
        divTemperature.appendChild(pMinTemp);
        divTemperature.appendChild(pMaxTemp);
        divTemperature.appendChild(pHumidity);

        divResults.appendChild(divDescription);
        divResults.appendChild(divTemperature);
    }

    return { reset, cityDropdownItems, weatherInfo };
})();

const reset = (elemID, className) => render.reset(elemID, className);
const renderCityDropdown = (list, city, lat, lon) => render.cityDropdownItems(list, city, lat, lon);
const renderWeatherInfo = (result) => render.weatherInfo(result);

export { reset, renderCityDropdown, renderWeatherInfo };