const apiKey = "9d48df029ee717c4a9acb3d0ed66a673";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

function showLoading(){
    loading.style.display = "block";
    error.textContent = "";
}

function hideLoading(){
    loading.style.display = "none";
}

async function getWeather(city){

    if(city === ""){
        error.textContent = "Please enter a city name.";
        return;
    }

    showLoading();

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }
    catch(err){

        error.textContent = err.message;

    }

    hideLoading();
}

function displayWeather(data){

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        data.weather[0].description;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} km/h`;

    pressure.textContent =
        `${data.main.pressure} hPa`;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

searchBtn.addEventListener("click",()=>{

    getWeather(cityInput.value.trim());

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){
        getWeather(cityInput.value.trim());
    }

});

locationBtn.addEventListener("click",()=>{

    if(!navigator.geolocation){

        error.textContent =
        "Geolocation is not supported.";

        return;

    }

    showLoading();

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try{

                const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
                );

                const data = await response.json();

                displayWeather(data);

            }
            catch{

                error.textContent =
                "Unable to fetch weather.";

            }

            hideLoading();

        },

        ()=>{

            hideLoading();

            error.textContent =
            "Location permission denied.";

        }

    );

});

// Default city when page loads
getWeather("Delhi");