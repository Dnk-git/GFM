import { CURRENT_CITY } from "./objects.js";

const SERVER = {
    API_URL: 'https://api.openweathermap.org/data/2.5/weather',
    API_KEY: '35a0fff3c5c56838727c64962f33c3f9',
    API_ARTEM_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',

    API_METRIC: '&units=metric',
    API_FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast',
    API_FORECAST_COUNT: '&cnt=8',

    ICON_URL: 'https://openweathermap.org/img/wn/',
    ICON_POSTFIX4: '@4x.png',
    ICON_POSTFIX2: '@2x.png'
}


export const FETCH = {
    toNormalTime: function(unix) {
        const dateObj = new Date(unix*1000);

        let hour = dateObj.getHours();
        let min = dateObj.getMinutes();

        hour = (hour < 10) ? '0'+hour : hour;
        min = (min < 10) ? '0'+min : min;

        return hour + ':' + min;
    },
    
    toNormalDate: function(unix) {
        const dateObj = new Date(unix*1000);

        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('en-EN', {month: 'short'});

        return day + ' ' + month;
    },

    roundTempValue: function (value){
        if ( !value ) return;

        const isNumerable = +value;
        if ( !isNumerable ) return value;

        return Math.floor(+value);
    },

    fetchCityWeather: async function(cityName) {
        const apiUrl = `${SERVER.API_URL}?q=${cityName}
                    &APPID=${SERVER.API_KEY}${SERVER.API_METRIC}`;

        try {
            const response = await fetch(apiUrl);
            const resultSet = await response.json();

            CURRENT_CITY.name = CURRENT_CITY.normalizeCityName(cityName);

            CURRENT_CITY.isFavorite = false;
            CURRENT_CITY.isDataSet = true;

            CURRENT_CITY.dataSet.temp = FETCH.roundTempValue(resultSet.main.temp);
            CURRENT_CITY.dataSet.tempFL = FETCH.roundTempValue(resultSet.main.feels_like);

            const sky = resultSet.weather[0].main;
            CURRENT_CITY.dataSet.sky = sky;

            const icon = resultSet.weather[0].icon;
            const iconUrl = `${SERVER.ICON_URL}${icon}${SERVER.ICON_POSTFIX4}`;
            CURRENT_CITY.dataSet.skyUrl = iconUrl;

            CURRENT_CITY.dataSet.sunRise = FETCH.toNormalTime(resultSet.sys.sunrise);
            CURRENT_CITY.dataSet.sunSet = FETCH.toNormalTime(resultSet.sys.sunset);

            return CURRENT_CITY;
        }

        catch ( err ) {
            throw err;
        }
    },

    fetchForecastCityWeather: async function(cityName) {
        const apiUrl = `${SERVER.API_FORECAST_URL}?q=${cityName}
            &appid=${SERVER.API_KEY}${SERVER.API_FORECAST_COUNT}${SERVER.API_METRIC}`;
                
        try {
            const response = await fetch(apiUrl);
            const resultSet = await response.json();

            CURRENT_CITY.forecastSet.length = 0;

            resultSet.list.forEach( item => {
                let elem = JSON.parse(JSON.stringify(CURRENT_CITY.forecast));

                elem.date = FETCH.toNormalDate(item.dt);
                elem.time = FETCH.toNormalTime(item.dt);

                elem.temp = FETCH.roundTempValue(item.main.temp);
                elem.tempFL = FETCH.roundTempValue(item.main.feels_like);

                elem.sky = item.weather[0].main;
                elem.skyUrl = SERVER.ICON_URL + item.weather[0].icon + SERVER.ICON_POSTFIX4;

                CURRENT_CITY.forecastSet.push(elem);
            });

            return CURRENT_CITY.forecastSet;
        }

        catch ( err ) { 
            console.dir(err);
            throw err;
        }
    }

}
