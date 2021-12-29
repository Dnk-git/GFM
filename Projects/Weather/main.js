import { CURRENT_CITY } from "./objects.js";
import { FETCH } from "./fetch.js";
import { STORAGE } from "./storage.js"
import { UI } from "./view.js";


STORAGE.restoreStorage();

UI.renderLocationsList();

FETCH.fetchCityWeather(CURRENT_CITY.name)
    .then( res => UI.renderNowSection(res) );

