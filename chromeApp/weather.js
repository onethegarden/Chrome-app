const weather = document.querySelector(".js-wheather");

const API_KEY = '241051bf13976dd3ddf8b8d9f247255e';
const COORDS = 'coords';

function getWeather(lat, lng){
fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        const temprature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temprature} @ ${place}`;
    });//call function
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}
function handleGeoSuccess(position){
    const latitude= position.coords.latitude;
    const longitude= position.coords.longitude;
    const coordsObj ={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cant access geo location");
}

function askForCoords(){
    //using navigator api, geolocation object
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();