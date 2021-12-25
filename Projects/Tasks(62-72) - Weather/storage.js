import { CURRENT_CITY } from './objects.js';

const CITY_LIST_KEY = 'list_Of_Cities';

export const STORAGE = {
    cityList: [],
    
    isValidFirstLetter: function(name) {
        const item = name.slice(0, 1);

        if (item >= 'a' && item <= 'z') return true;
        if (item >= 'A' && item <= 'Z') return true;
        if (item >= 'а' && item <= 'я') return true;
        if (item >= 'А' && item <= 'Я') return true;

        return false;
    },

    isValidCityName: function(name) {
        const checkName = CURRENT_CITY.normalizeCityName(name);

        if (checkName.length > CURRENT_CITY.CITY_NAME_LEN) return false;
        
        const isValid = STORAGE.isValidFirstLetter(checkName);
        if ( !isValid ) return false;

        return true;
    },

    isCityInList: function(cityName) {
        const res = STORAGE.cityList.find( item => item == CURRENT_CITY.normalizeCityName(cityName) );

        if ( res ) return true;

        return false;
    },

    saveStorage: function() {
        STORAGE.initStorage();

        const save = {
            lastCity: '',
            cityList: []
        };

        save.lastCity = ( CURRENT_CITY.name ) ? CURRENT_CITY.name : CURRENT_CITY.DEFAULT_LAST_CITY;
        save.cityList = STORAGE.cityList.filter( () => true );

        const listJSON = JSON.stringify(save);
        localStorage.setItem(CITY_LIST_KEY, listJSON);
    },

    addCity: function(cityName) {
        if ( !STORAGE.isValidCityName(cityName) ) return;

        const addItem = CURRENT_CITY.normalizeCityName(cityName);

        STORAGE.cityList.unshift(addItem);
        STORAGE.saveStorage();
    },

    removeCity: function(cityName) {
        if (STORAGE.cityList.length == 0) return false;

        const removeItem = CURRENT_CITY.normalizeCityName(cityName);
        const isItem = STORAGE.isCityInList(removeItem);

        if ( isItem ) {
            STORAGE.cityList = STORAGE.cityList.filter( item => item !== cityName );
            STORAGE.saveStorage();
        }
    },

    resetBadData: function() {
        STORAGE.cityList.length = 0;

        CURRENT_CITY.name = CURRENT_CITY.DEFAULT_LAST_CITY;
        CURRENT_CITY.isDataSet = false;
    },

    restoreStorage: function() {
        const listJSON = localStorage.getItem(CITY_LIST_KEY);
        if (listJSON == null) {
            STORAGE.resetBadData();
            return;
        }
        
        const restore = JSON.parse(listJSON);
        if (restore == null) {
            STORAGE.resetBadData();
            return;
        }

        CURRENT_CITY.name = restore.lastCity;

        STORAGE.cityList = restore.cityList.filter( () => true );
    },

    initStorage: function() {
        localStorage.removeItem(CITY_LIST_KEY);
    }
}; 

STORAGE.restoreStorage();
if (STORAGE.cityList.length == 0) {
    if (STORAGE.isValidCityName('orenBURg')) STORAGE.addCity('orenBURg');
    if (STORAGE.isValidCityName('chiCago')) STORAGE.addCity('chiCago');
    if (STORAGE.isValidCityName('saMaRa')) STORAGE.addCity('saMaRa');
    if (STORAGE.isValidCityName('boston')) STORAGE.addCity('boston');
    if (STORAGE.isValidCityName('Yekaterinburg')) STORAGE.addCity('yekaTerinburg');
    if (STORAGE.isValidCityName('oslo')) STORAGE.addCity('oslo');
    if (STORAGE.isValidCityName('   moscow  ')) STORAGE.addCity('   moscow  ');
    if (STORAGE.isValidCityName('  121221 саверовка  ')) STORAGE.addCity('  121121221221 саверовка  ');
}
