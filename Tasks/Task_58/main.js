const serverUrl = 'https://api.genderize.io';
const nationalUrl = 'https://api.nationalize.io';
const countryUrl = 'https://api.worldbank.org/v2/country/';

let firstName = 'artem';
const MY_TYPE_ERROR = 'MyError';

import { UI_ELEMENTS } from "./view.js";


function setStateElenent(elem, state){
    if (state) {
        elem.classList.remove("hidden");
    } else {
        elem.classList.add("hidden");
    }
}

function resetAppUI(){
    UI_ELEMENTS.BONUS_RESULT.textContent = '';
    UI_ELEMENTS.INTPUT.value = '';

    setStateElenent(UI_ELEMENTS.BONUS_BUTTON, false);
    setStateElenent(UI_ELEMENTS.BONUS_RESULT, false);
}

function logErrorsQuery(error){
    resetAppUI();

    if (error.name == MY_TYPE_ERROR) {
        let outText = error.message;
        UI_ELEMENTS.RESULT.textContent = outText;
        console.log('It is a my error');
        return;
    }

    console.log(this);
    console.log(error);
    throw error;
}


function sendGenderQuery(){
    let inputName = UI_ELEMENTS.INTPUT.value.trim();
    if (!inputName) return;

    inputName = inputName.slice(0, 30); 

    try{
        const queryUrl = `${serverUrl}?name=${inputName}`;
        const serverHeader = fetch(queryUrl); 

        serverHeader.then( (response) => {
            const serverBody = response.json();

            serverBody.then((res) => {
                let outString = ` "${res.name}" name is not present in database`;
                if (res.gender) outString = ` "${res.name}" name is a "${res.gender}" 
                                                    with ${res.probability} probability`;
                UI_ELEMENTS.RESULT.textContent = 'Result: ' + outString;
                firstName = res.name;    
            });
        });
    } catch (err) {
        logErrorsQuery(err);
    }

    setStateElenent(UI_ELEMENTS.BONUS_BUTTON, true);
}

function sendNationalQuery(){
    setStateElenent(UI_ELEMENTS.BONUS_RESULT, true);

    try {
        const queryUrl = `${nationalUrl}?name=${firstName}`;
        const nationHeader = fetch(queryUrl); 

        nationHeader.then( (response) => {
            const nationBody = response.json();

            nationBody.then((res) => {
                const isEmptyArray = (res.country.length == 0);
                let idCountry = null;
                if (!isEmptyArray) idCountry = res.country[0].country_id;
                if (!idCountry){
                    const err = new Error();
                    err.name = MY_TYPE_ERROR;
                    err.message = 'Sorry, we can`t associate you with any country...';
                    logErrorsQuery(err);
                    return;
                }

                const queryUrl = `${countryUrl}${idCountry}?format=json`;
                const countryHeader = fetch(queryUrl); 

                countryHeader.then( (response) => {
                    const countryBody = response.json();

                    countryBody.then((res) => {
                        const isEmptyArray = (res.length == 1);
                        let country = null;
                        if (!isEmptyArray) country = res[1][0].name;
                        if (!country) {
                            const err = new Error();
                            err.name = MY_TYPE_ERROR;
                            err.message = `Sorry, we can't decode id="${idCountry}" country...`;
                            logErrorsQuery(err);
                            return;
                        }
                        const outString = `We think, that you are living in ${country}`;
                        UI_ELEMENTS.BONUS_RESULT.textContent = 'Result: ' + outString;
                    });
                });    
            });
        });
    } catch (err) {
        logErrorsQuery(err);
    }
}


UI_ELEMENTS.BUTTON.addEventListener("click", sendGenderQuery);
UI_ELEMENTS.BONUS_BUTTON.addEventListener("click", sendNationalQuery);

UI_ELEMENTS.FORM.onsubmit = () => { return false };

const elem = UI_ELEMENTS.INTPUT;
    elem.onfocus = () => { 
        elem.value = '';
        setStateElenent(UI_ELEMENTS.BONUS_BUTTON, false);
        setStateElenent(UI_ELEMENTS.BONUS_RESULT, false);
    };
    elem.onchange = () => {
        sendGenderQuery();
        elem.value = '';
    };

