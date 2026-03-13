const render = (function () {
    const reset = (elemID, className) => {
        const elems = document.getElementById(elemID).querySelectorAll(className);

        elems.forEach(elem => elem.remove());
    };

    const cityDropdownItems = (list, cityName, countryName, lat, lon) => {
        list.classList.remove("inactive");

        const divCity = document.createElement("div");
        const pCityInfo = document.createElement("p");

        const spanCityName = document.createElement("span");
        spanCityName.classList.add("city-name-span");
        spanCityName.textContent = `${cityName}, `;

        const spanCountryName = document.createElement("span");
        spanCountryName.classList.add("country-name-span");
        spanCountryName.textContent = countryName;

        pCityInfo.appendChild(spanCityName);
        pCityInfo.appendChild(spanCountryName);

        divCity.classList.add("city-info-dropdown-item");

        divCity.dataset.lat = lat;
        divCity.dataset.lon = lon;
        divCity.appendChild(pCityInfo);
        list.appendChild(divCity);
    };

    const weatherInfo = (result) => {
        document.getElementById("list").classList.add("inactive");

        const divResults = document.getElementById("weather-result");

        divResults.classList.remove("inactive");

        const divLocation = document.createElement("div");
        divLocation.classList.add("weather-result-location");

        const pLocation = document.createElement("div");
        pLocation.textContent = document.getElementById("city-search").value;

        divLocation.appendChild(pLocation);
        divResults.appendChild(divLocation);

        const divTemperature = document.createElement("div");
        const pCurrentTemp = document.createElement("p");

        divTemperature.classList.add("weather-result-temperature");

        pCurrentTemp.textContent = `${(result.main.temp).toFixed(0)}°`;

        const imgWeatherIcon = document.createElement("img");
        imgWeatherIcon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

        divTemperature.appendChild(pCurrentTemp);
        divTemperature.appendChild(imgWeatherIcon);
        divResults.appendChild(divTemperature);

        const divDescription = document.createElement("div");
        divDescription.classList.add("weather-result-description");

        const pDescription = document.createElement("p");

        pDescription.textContent = result.weather[0].description;

        divDescription.appendChild(pDescription);
        divResults.appendChild(divDescription);

        const divMinMaxTempt = document.createElement("div");
        divMinMaxTempt.classList.add("weather-result-min-max-temp");

        const pMinTemp = document.createElement("p");
        const pMaxTemp = document.createElement("p");

        pMinTemp.textContent = `Min: ${(result.main.temp_min).toFixed(0)}°`;
        pMaxTemp.textContent = `Max: ${(result.main.temp_max).toFixed(0)}°`;

        divMinMaxTempt.appendChild(pMinTemp);
        divMinMaxTempt.appendChild(pMaxTemp);
        divResults.appendChild(divMinMaxTempt);

        const divWeatherDetails = document.createElement("div");
        divWeatherDetails.classList.add("weather-result-details");

        const pHumidityLabel = document.createElement("p");
        pHumidityLabel.classList.add("weather-result-details-label");
        pHumidityLabel.textContent = "Humidity";

        const pHumidityValue = document.createElement("p");
        pHumidityValue.classList.add("weather-result-details-value");
        pHumidityValue.textContent = `${result.main.humidity}%`;

        const pWindLabel = document.createElement("p");
        pWindLabel.classList.add("weather-result-details-label");
        pWindLabel.textContent = "Wind";

        const pWindValue = document.createElement("p");
        pWindValue.classList.add("weather-result-details-value");
        pWindValue.textContent = `${(result.wind.speed * 3.6).toFixed(0)} km/h`;

        const pPressureLabel = document.createElement("p");
        pPressureLabel.classList.add("weather-result-details-label");
        pPressureLabel.textContent = "Presure";

        const pPressureValue = document.createElement("p");
        pPressureValue.classList.add("weather-result-details-value");
        pPressureValue.textContent = `${result.main.pressure} hPa`;

        const pTempFeelsLabel = document.createElement("p");
        pTempFeelsLabel.classList.add("weather-result-details-label");
        pTempFeelsLabel.textContent = "Feels like";

        const pTempFeelsValue = document.createElement("p");
        pTempFeelsValue.classList.add("weather-result-details-value");
        pTempFeelsValue.textContent = `${(result.main.feels_like.toFixed(0))}°`;

        divWeatherDetails.appendChild(pHumidityLabel);
        divWeatherDetails.appendChild(pHumidityValue);
        divWeatherDetails.appendChild(pWindLabel);
        divWeatherDetails.appendChild(pWindValue);
        divWeatherDetails.appendChild(pPressureLabel);
        divWeatherDetails.appendChild(pPressureValue);
        divWeatherDetails.appendChild(pTempFeelsLabel);
        divWeatherDetails.appendChild(pTempFeelsValue);

        divResults.appendChild(divWeatherDetails);
    }

    return { reset, cityDropdownItems, weatherInfo };
})();

const reset = (elemID, className) => render.reset(elemID, className);
const renderCityDropdown = (list, cityName, countryName, lat, lon) => render.cityDropdownItems(list, cityName, countryName, lat, lon);
const renderWeatherInfo = (result) => render.weatherInfo(result);

export { reset, renderCityDropdown, renderWeatherInfo };