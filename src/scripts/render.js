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
        let location = document.getElementById("city-search").value;
        document.getElementById("city-search").value = "";

        reset("weather-result", ".weather-result-wrapper");

        document.getElementById("list").classList.add("inactive");

        const divResults = document.getElementById("weather-result");
        const divWeatherResultsWrapper = document.createElement("div");
        divWeatherResultsWrapper.classList.add("weather-result-wrapper");

        divResults.classList.remove("inactive");
        document.getElementById("temp-btns").classList.remove("inactive");

        /*const divButtonsWrapper = document.createElement("div");
        divButtonsWrapper.classList.add("btns-wrapper");
        divButtonsWrapper.id = "bts-wrapper";

        const btnCelcius = document.createElement("button");
        btnCelcius.classList.add("toggle-btn");
        btnCelcius.classList.add("selected-btn");
        btnCelcius.id = "celcius-btn";
        btnCelcius.textContent = "°C";

        const btnFarengheight = document.createElement("button");
        btnFarengheight.classList.add("toggle-btn");
        btnFarengheight.id = "farengheight-btn";
        btnFarengheight.textContent = "°F";

        divButtonsWrapper.appendChild(btnCelcius);
        divButtonsWrapper.appendChild(btnFarengheight);

        const main = document.querySelector("main");
        main.insertBefore(divButtonsWrapper, divResults);*/

        const divLocation = document.createElement("div");
        divLocation.classList.add("weather-result-location");

        const pLocation = document.createElement("div");
        pLocation.textContent = location;

        divLocation.appendChild(pLocation);
        divWeatherResultsWrapper.appendChild(divLocation);

        const divTemperature = document.createElement("div");
        const pCurrentTemp = document.createElement("p");

        divTemperature.classList.add("weather-result-temperature");

        pCurrentTemp.textContent = `${(result.main.temp).toFixed(0)}°`;

        const imgWeatherIcon = document.createElement("img");
        imgWeatherIcon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;

        divTemperature.appendChild(pCurrentTemp);
        divTemperature.appendChild(imgWeatherIcon);
        divWeatherResultsWrapper.appendChild(divTemperature);

        const divDescription = document.createElement("div");
        divDescription.classList.add("weather-result-description");

        const pDescription = document.createElement("p");

        pDescription.textContent = result.weather[0].description;

        divDescription.appendChild(pDescription);
        divWeatherResultsWrapper.appendChild(divDescription);

        const divMinMaxTempt = document.createElement("div");
        divMinMaxTempt.classList.add("weather-result-min-max-temp");

        const pMinTemp = document.createElement("p");
        const pMaxTemp = document.createElement("p");

        pMinTemp.textContent = `Min: ${(result.main.temp_min).toFixed(0)}°`;
        pMaxTemp.textContent = `Max: ${(result.main.temp_max).toFixed(0)}°`;

        divMinMaxTempt.appendChild(pMinTemp);
        divMinMaxTempt.appendChild(pMaxTemp);
        divWeatherResultsWrapper.appendChild(divMinMaxTempt);

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

        divWeatherResultsWrapper.appendChild(divWeatherDetails);

        divResults.appendChild(divWeatherResultsWrapper);
    }

    return { reset, cityDropdownItems, weatherInfo };
})();

const reset = (elemID, className) => render.reset(elemID, className);
const renderCityDropdown = (list, cityName, countryName, lat, lon) => render.cityDropdownItems(list, cityName, countryName, lat, lon);
const renderWeatherInfo = (result) => render.weatherInfo(result);

export { reset, renderCityDropdown, renderWeatherInfo };