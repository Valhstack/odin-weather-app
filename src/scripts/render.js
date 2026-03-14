import { DAYS_OF_WEEK } from "./weekDay.js"

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
        divCity.dataset.location = `${cityName}, ${countryName}`;
        divCity.appendChild(pCityInfo);
        list.appendChild(divCity);
    };

    const weatherBackgroundSelection = (weatherID) => {
        if (weatherID < 300) {
            document.body.setAttribute("class", "");
            document.body.classList.add("thunderstorm");
        }
        else if (weatherID >= 300 && weatherID < 500) {
            document.body.setAttribute("class", "");
            document.body.classList.add("drizzle");
        }
        else if (weatherID >= 500 && weatherID < 600) {
            document.body.setAttribute("class", "");
            document.body.classList.add("rain");
        }
        else if (weatherID >= 600 && weatherID < 700) {
            document.body.setAttribute("class", "");
            document.body.classList.add("snow");
        }
        else if (weatherID >= 700 && weatherID < 800) {
            document.body.setAttribute("class", "");
            document.body.classList.add("mist");
        }
        else if (weatherID >= 801) {
            document.body.setAttribute("class", "");
            document.body.classList.add("clouds");
        }
        else {
            document.body.setAttribute("class", "");
            document.body.classList.add("default");
        }
    };

    const weatherInfo = (result) => {
        document.getElementById("city-search").value = "";

        const defaultBtn = document.getElementById("celcius-btn");
        const isMetric = defaultBtn.classList.contains("selected-btn");

        if ((result.weather[0].icon).includes("n")) {
            document.body.classList.remove("default");
            document.body.classList.add("night");
        }
        else {
            weatherBackgroundSelection(result.weather[0].id);
        }

        reset("weather-result", ".weather-result-wrapper");

        document.getElementById("list").classList.add("inactive");

        const divResults = document.getElementById("weather-result");

        const divWeatherResultsWrapper = document.createElement("div");
        divWeatherResultsWrapper.classList.add("weather-result-wrapper");

        divResults.classList.remove("inactive");
        document.getElementById("temp-btns").classList.remove("inactive");

        const divLocation = document.createElement("div");
        divLocation.classList.add("weather-result-location");

        const pLocation = document.createElement("div");
        pLocation.textContent = divResults.dataset.location ? divResults.dataset.location : result.name;

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
        pWindValue.textContent = isMetric ? `${(result.wind.speed * 3.6).toFixed(0)} km/h` : `${result.wind.speed.toFixed(0)} mph`;

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
    };

    const weatherForecast = (result) => {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1) < 10 ? ("0" + (currentDate.getMonth() + 1)) : (currentDate.getMonth() + 1);
        const date = currentDate.getDate() < 10 ? ("0" + (currentDate.getDate() + 1)) : (currentDate.getDate());
        const currentDay = currentDate.getFullYear() + "-" + month + "-" + date;

        const forecastToRender = [];

        for (let r of result.list) {
            if (!r.dt_txt.includes(currentDay) && r.dt_txt.includes("12:00:00")) {
                forecastToRender.push(r);
            }
        }

        console.log(forecastToRender);

        const divForecast = document.getElementById("weather-forecast");
        divForecast.classList.remove("inactive");

        reset("weather-forecast", ".weather-forecast-wrapper");

        const divWrapper = document.createElement("div");
        divWrapper.id = "weather-forecast-wrapper";
        divWrapper.classList.add("weather-forecast-wrapper");

        for (let day of forecastToRender) {
            const dayOfWeek = new Date(day.dt_txt);
            console.log(dayOfWeek.getDay());

            divWrapper.appendChild(forecastDay(day, DAYS_OF_WEEK[dayOfWeek.getDay()]));
        }

        divForecast.appendChild(divWrapper);
    };

    const forecastDay = (day, dayOfWeek) => {
        const divDayWrapper = document.createElement("div");
        divDayWrapper.classList.add("forecast-day-wrapper");

        const pDayOfWeek = document.createElement("p");
        pDayOfWeek.textContent = dayOfWeek;

        const imgWeatherIcon = document.createElement("img");
        imgWeatherIcon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`;

        const pTempForecast = document.createElement("p");
        pTempForecast.textContent = day.main.temp;

        const pPopForecast = document.createElement("p");
        pPopForecast.textContent = `${day.pop * 10}%`;

        divDayWrapper.appendChild(pDayOfWeek);
        divDayWrapper.appendChild(imgWeatherIcon);
        divDayWrapper.appendChild(pTempForecast);
        divDayWrapper.appendChild(pPopForecast);

        return divDayWrapper;
    }

    return { reset, cityDropdownItems, weatherInfo, weatherForecast };
})();

const reset = (elemID, className) => render.reset(elemID, className);
const renderCityDropdown = (list, cityName, countryName, lat, lon) => render.cityDropdownItems(list, cityName, countryName, lat, lon);
const renderWeatherInfo = (result) => render.weatherInfo(result);
const renderWeatherForecast = (result) => render.weatherForecast(result);

export { reset, renderCityDropdown, renderWeatherInfo, renderWeatherForecast };