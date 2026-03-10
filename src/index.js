const input = document.getElementById("city-search");
const list = document.getElementById("list");
const coordinates = new Map();

input.addEventListener("input", (e) => {
    const value = e.target.value;

    if (value.length >= 3) {
        fetch(`https://photon.komoot.io/api/?q=${value}&limit=5&osm_tag=place:city&osm_tag=place:town&osm_tag=place:village`)
            .then(response => response.json())
            .then(data => {

                list.innerHTML = "";
                const seen = new Set();

                for (let result of data.features) {
                    let city = `${result.properties.name}, ${result.properties.country}`;

                    if (!seen.has(city)) {
                        seen.add(city);

                        const divCity = document.createElement("div");
                        const pCityInfo = document.createElement("p");
                        pCityInfo.textContent = city;
                        divCity.classList.add("city-info-dropdown-item");

                        coordinates.set(city, { lat: (result.geometry.coordinates[0].toFixed(2)), lon: (result.geometry.coordinates[1]).toFixed(2) });

                        divCity.dataset.lat = (result.geometry.coordinates[0]).toFixed(2);
                        divCity.dataset.lon = (result.geometry.coordinates[1]).toFixed(2);
                        divCity.appendChild(pCityInfo);
                        list.appendChild(divCity);
                    }
                }

                attachListeners(document.getElementsByClassName("city-info-dropdown-item"), optionSelectedHandler);
            });
    }
});

const attachListeners = (items, handler) => {
    for (let item of items) {
        item.addEventListener("click", handler);
    }
}

function optionSelectedHandler(e) {
    const lon = e.currentTarget.dataset.lon;
    const lat = e.currentTarget.dataset.lat;

    document.getElementById("city-search").value = e.currentTarget.querySelector("p").textContent;
    fetchWeather(lat, lon);
}

function fetchWeather(lon, lat) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid={KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        });

    console.log(document.getElementById("city-search").value);
}

document.getElementById("search-btn").addEventListener("click", (e) => {
    console.log(e);
    console.log(document.getElementById("city-search").value);
});