// api key : 2973c93e465d7c2cfff34051775fa4c4

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value");
const descElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {}
weather.temperature = {
    unit : "celcius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "2973c93e465d7c2cfff34051775fa4c4";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Browser doesn't Support Geolocation</p>`;
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let date = response.json();
        return date;
    })
    .then(function(date){
        weather.temperature.value = Math.floor(date.main.temp-KELVIN);
        weather.description = date.weather[0].description;
        weather.iconId = date.weather[0].icon;
        weather.city = date.name;
        weather.country = date.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`;
    tempElement.innerHTML = `<p>${weather.temperature.value}°<span>C</span></p>`;
    descElement.innerHTML = `<p>${weather.description}</p>`;
    locationElement.innerHTML = `<p>${weather.city},${weather.country}</p>`;
}

// C to F conversion
function celciusToFahrenheite(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined){
        return;
    }
    if(weather.temperature.unit == "celcius"){
        let fahrenheite = celciusToFahrenheite(weather.temperature.value);
        fahrenheite = Math.floor(fahrenheite);
        tempElement.innerHTML = `<p>${fahrenheite}°<span>F</span></p>`;
        weather.temperature.unit = "fahrenheite";
    }else{
        tempElement.innerHTML = `<p>${weather.temperature.value}°<span>C</span></p>`;
        weather.temperature.unit = "celcius";
    }
})