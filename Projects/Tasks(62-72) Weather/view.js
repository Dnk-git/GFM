import { CURRENT_CITY } from "./objects.js";
import { FETCH } from "./fetch.js";
import { STORAGE } from "./storage.js";

const DEGREE_CELSII = "&#176;";

const ADD_BUTTON_URL = 'url("./img/add_location.svg")';
const ADD_BUTTON_FILL_URL = 'url("./img/add_location_fill.svg")';

export const UI = {
    now: document.querySelector(".summary__nav .item__now"),
    details: document.querySelector(".summary__nav .item__details"),
    forecast: document.querySelector(".summary__nav .item__forecast"),

    nowSummary: document.querySelector(".weather__summary .summary__now"),
    detailsSummary: document.querySelector(".weather__summary .summary__details"),
    forecastSummary: document.querySelector(".weather__summary .summary__forecast"),

    locationsList: document.querySelector(".weather__locations .locations__list"),

    searchInput: document.querySelector(".search .search__input"),
    searchButton: document.querySelector(".search .search__button"),

    addNowButton: document.querySelector(".summary__now .now__button"),


    handlerNowSection: function () {
        UI.now.classList.add("active");
        UI.nowSummary.style.display = "flex";

        UI.details.classList.remove("active");
        UI.detailsSummary.style.display = "none";

        UI.forecast.classList.remove("active");
        UI.forecastSummary.style.display = "none";
    },

    handlerDetailsSection: function () {
        UI.now.classList.remove("active");
        UI.nowSummary.style.display = "none";

        UI.details.classList.add("active");
        UI.detailsSummary.style.display = "flex";

        UI.forecast.classList.remove("active");
        UI.forecastSummary.style.display = "none";

        UI.renderDetailsSection();
    },

    handlerForecastSection: function () {
        UI.now.classList.remove("active");
        UI.nowSummary.style.display = "none";

        UI.details.classList.remove("active");
        UI.detailsSummary.style.display = "none";

        UI.forecast.classList.add("active");
        UI.forecastSummary.style.display = "flex";

        FETCH.fetchForecastCityWeather(CURRENT_CITY.name)
            .then( res => UI.renderForecastSection(res) )

            .catch( err => console.dir(err) );
    },

    handlerSearchInput: function () {
        const generateEvent = new Event("click");
        UI.now.dispatchEvent(generateEvent);

        const cityName = UI.searchInput.value;
        const isValidName = STORAGE.isValidCityName(cityName);

        if ( !isValidName ) {
            UI.renderNowSection('Sorry, name of your city is not valid. Try arain...');
            return;
        }

        FETCH.fetchCityWeather(cityName)
            .then( res => UI.renderNowSection(res) )

            .catch( err => {
                console.dir(err);
                UI.renderNowSection('Sorry, cant get any info about this city. Try arain...');
            });
    },

    handlerToggleListButton: function () {
        const isCityInList = STORAGE.isCityInList(CURRENT_CITY.name);

        if ( isCityInList ) {
            STORAGE.removeCity(CURRENT_CITY.name);
        } else {
            STORAGE.addCity(CURRENT_CITY.name);
        }

        UI.renderNowSection();
        UI.renderLocationsList();
    },

    handlerLocationsList: function (event) {
        const target = event.target;

        if (target.nodeName == 'SPAN') {
            const cityName = target.textContent;

            UI.searchInput.value = cityName;
            UI.handlerSearchInput();

            return;
        }

        if (target.nodeName == 'BUTTON') {
            const cityName = target.previousElementSibling.textContent;
            STORAGE.removeCity(cityName);

            const removeLocationsItem = target.parentElement;
            removeLocationsItem.remove();

            UI.renderNowSection();

            return;
        }
    },

    renderNowSection: function (message) {
        const divErrorMessage = document.querySelector(".summary__now .now__error");

        let isError = false;
        if (typeof(message) == 'string') {
            divErrorMessage.textContent = message;
            isError = true;
        }

        const divNowSummary = UI.nowSummary;
        const len = divNowSummary.children.length;

        if ( isError ) {                       // Hide all elems, show error
            for (let i = 0; i < len; i++) {
                const elem = divNowSummary.children[i];

                if (elem.classList.contains("now__item")) {
                    elem.style.display = "none";
                }
            }

            divErrorMessage.style.display = "block";
            return;
        }

        for (let i = 0; i < len; i++) {         // Show all elems, hide error
            const elem = divNowSummary.children[i];

            if (elem.classList.contains("now__item")) {
                elem.style.display = "block";
            }
        }

        divErrorMessage.style.display = "none";

        const temp = document.querySelector(".summary__now .now__temp");
        temp.innerHTML = CURRENT_CITY.dataSet.temp + DEGREE_CELSII;

        const city = document.querySelector(".summary__now .now__city");
        city.textContent = CURRENT_CITY.name;

        const skyImage = document.querySelector(".summary__now .now__img");
        skyImage.src = CURRENT_CITY.dataSet.skyUrl;

        const addButton = document.querySelector(".summary__now .now__button");
        addButton.style.backgroundImage = ADD_BUTTON_URL;

        const isCityInList = STORAGE.isCityInList(CURRENT_CITY.name);

        if ( isCityInList ) {
            addButton.style.backgroundImage = ADD_BUTTON_FILL_URL;
        }

        STORAGE.saveStorage();
    },

    renderDetailsSection: function () {
        const city = document.querySelector(".summary__details .details__city");
        city.textContent = CURRENT_CITY.name;

        const temp = document.querySelector(".summary__details .params__temp");
        temp.innerHTML = "Temperature:  " + CURRENT_CITY.dataSet.temp + DEGREE_CELSII;

        const tempFeels = document.querySelector(".summary__details .params__tempfeels");
        tempFeels.innerHTML = "Feels like:  " + CURRENT_CITY.dataSet.tempFL + DEGREE_CELSII;

        const sky = document.querySelector(".summary__details .params__weather");
        sky.textContent = "Weather:  " + CURRENT_CITY.dataSet.sky;

        const sunrise = document.querySelector(".summary__details .params__sunrise");
        sunrise.textContent = "Sunrise:  " + CURRENT_CITY.dataSet.sunRise;

        const sunset = document.querySelector(".summary__details .params__sunset");
        sunset.textContent = "Sunset:  " + CURRENT_CITY.dataSet.sunSet;
    },

    renderForecastSection: function (forecastSet) {
        const cityFSection = document.querySelector(".summary__forecast .forecast__city");
        cityFSection.textContent = CURRENT_CITY.name;

        const cardsFSection = document.querySelector(".summary__forecast .forecast__cards");
        while (cardsFSection.children.length > 1) {      // children[0] = Template!!!
            cardsFSection.lastElementChild.remove();
        }
        cardsFSection.children[0].style.display = "block";

        const template = cardsFSection.firstElementChild;

        forecastSet.forEach( item => {
            const elem = template.cloneNode(true);

            elem.children[0].textContent = item.date;
            elem.children[1].textContent = item.time;

            const temp = 'Temperature:  ' + item.temp + DEGREE_CELSII;
            elem.children[2].innerHTML = temp;

            const tempFeels = 'Feeels like:  ' + item.tempFL + DEGREE_CELSII;
            elem.children[3].innerHTML = tempFeels;

            elem.children[4].textContent = item.sky;

            elem.children[5].firstElementChild.src = item.skyUrl;

            cardsFSection.append(elem);
        });

        cardsFSection.children[0].style.display = "none";
    },

    renderLocationsList: function () {
        const list = UI.locationsList;

        while (list.children.length > 1) {     // children[0] = Template!!!
            list.lastElementChild.remove();
        }

        const template = list.firstElementChild;

        STORAGE.cityList.forEach( item => {
            const elem = template.cloneNode(true);

            elem.firstElementChild.textContent = item;
            elem.style.display = "flex";

            list.append(elem);
        });

    },
}

UI.now.addEventListener("click", UI.handlerNowSection);
UI.details.addEventListener("click", UI.handlerDetailsSection);
UI.forecast.addEventListener("click", UI.handlerForecastSection);

UI.locationsList.addEventListener("click", UI.handlerLocationsList);

UI.searchInput.addEventListener("change", UI.handlerSearchInput);
UI.searchButton.addEventListener("click", UI.handlerSearchInput);

UI.addNowButton.addEventListener("click", UI.handlerToggleListButton);

