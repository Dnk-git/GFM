export const CURRENT_CITY = {
    name: '',
    isFavorite: false,
    isDataSet: false,
    dataSet: {
        temp: null,
        tempFL: null,
        sky: null,
        skyUrl: null,
        sunRise: null,
        sunSet: null
    },

    forecast: {
        date: '',
        time: '',
        temp: '',
        tempFL: '',
        sky: '',
        skyUrl: ''
    },
    forecastSet: [],

    DEFAULT_LAST_CITY: 'Orenburg',
    CITY_NAME_LEN: 25,

    normalizeCityName(cityName) {
        let res = cityName.trim().toLowerCase();

        res = res[0].toUpperCase() + res.slice(1);
        
        return res;
    }
};
