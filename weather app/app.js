let input = document.getElementById("input");
let searchBtn = document.getElementById("searchBtn");
let temp = document.getElementById("temp");
let cityEl = document.getElementById("city");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let weatherIcon = document.getElementById("weather-icon")

const searchWeather = async()=>{
    const city = input.value.toLowerCase();
    const API_KEY = "7ede3a7b73da8b5cf90d681e3375dcd0";
    const url= `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=${city}`;
    await fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        temp.innerHTML = `${data.main.temp} °c`;
        humidity.innerHTML = `${data.main.humidity} %`
        cityEl.innerHTML = data.name;
        wind.innerHTML = `${data.wind.speed} km/h`
        input.value = ""

        if(data.weather[0].main === "Clouds"){
            weatherIcon.src = "./images/clouds.png"
        }else if(data.weather[0].main === "Drizzle"){
            weatherIcon.src = "./images/drizzle.png";
        }
        else if(data.weather[0].main === "Mist"){
            weatherIcon.src = "./images/mist.png";
        }
        else if(data.weather[0].main === "Rain"){
            weatherIcon.src = "./images/rain.png";
        }
        else if(data.weather[0].main === "Snow"){
            weatherIcon.src = "./images/snow.png";
        }else{
            weatherIcon.src = "./images/clear.png";
        }
    })
}
searchBtn.addEventListener("click", searchWeather)

document.addEventListener("keydown",(e)=>{
    const key = e.key;
    if(key === "Enter"){
        searchWeather()
    }
})