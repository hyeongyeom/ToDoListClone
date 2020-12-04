const COORDS="coords";
const API_KEY="739bd77dd6ca10a5a07006b6619745dd";
const weather=document.querySelector(".js-weather");

function getWeather(lat,lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`
        ).then(function(respose){
            return respose.json();
        })
        .then(function(json){
            const temperature=json.main.temp;
            const place=json.name;
            weather.innerText=`${temperature} @ ${place}`;
        });
}
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
    const latitude= position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj= {
        latitude,longitude
    };
    saveCoords(coordsObj);
    getWeather=(latitude,longitude);
}


function handleGeoError(position) {
    console.log("can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords=localStorage.getItem(COORDS);
    if (loadedCoords===null) {
        askForCoords();
    }   else {
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
        
    }
}

function init() {
    loadCoords();
    
}
init();
