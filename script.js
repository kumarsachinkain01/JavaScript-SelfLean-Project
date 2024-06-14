console.log("Sachin kumar");
const apiKey = "cd4e084885f8665a6e9e090e9efc3f4e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcons = document.querySelector(".weather-icon");


async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            if (data.weather[0].main == "Clouds") {
                weatherIcons.src = "Images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcons.src = "Images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcons.src = "Images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcons.src = "Images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcons.src = "Images/mist.png";
            } else if (data.weather[0].main == "Snow") {
                weatherIcons.src = "Images/snow.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching the weather data: ", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
