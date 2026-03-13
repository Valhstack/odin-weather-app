import { reset, renderCityDropdown } from "./render.js";
import { attachListeners } from "./listeners.js";
import { fetchWeather } from "./weather.js";

function optionSelectedHandler(e) {
    const lon = e.currentTarget.dataset.lon;
    const lat = e.currentTarget.dataset.lat;

    document.getElementById("city-search").value = e.currentTarget.querySelector("p").textContent;
    fetchWeather(lat, lon);
}

const cityName = () => {
    const input = document.getElementById("city-search");
    const list = document.getElementById("list");

    input.addEventListener("input", (e) => {
        const value = e.target.value;

        if (value.length >= 3) {
            fetch(`https://photon.komoot.io/api/?q=${value}&limit=5&osm_tag=place:city&osm_tag=place:town&osm_tag=place:village`)
                .then(response => response.json())
                .then(data => {

                    reset("list", ".city-info-dropdown-item");

                    const seen = new Set();

                    for (let result of data.features) {
                        let city = `${result.properties.name}, ${result.properties.country}`;

                        if (!seen.has(city)) {
                            seen.add(city);

                            renderCityDropdown(list, result.properties.name, result.properties.country, (result.geometry.coordinates[0]).toFixed(2), (result.geometry.coordinates[1]).toFixed(2));
                        }
                    }

                    attachListeners(document.getElementsByClassName("city-info-dropdown-item"), optionSelectedHandler);
                });
        }
    });
};

export { cityName }