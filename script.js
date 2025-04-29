//The API key
const apiKey = "f6b997465459ea9d713bdb7426b10fb2";
// Getting the search-icon and the input icon from html
const searchIcon = document.getElementById("searchIcon");
const cityInput = document.getElementById("cityInput");
//Getting the parts of the html that needs to be updated
const weatherCondition = document.querySelector(".weather-condition");
const degree = document.querySelector(".degree");
const cityName = document.querySelector(".cityName");
const pressure = document.querySelector(".pressure");
const wind = document.querySelector(".wind");
const visibility = document.querySelector(".visibility");
const humidity = document.querySelector(".humidity");
const weatherImage = document.querySelector(".weatherImage");

// Event listener for search icon
searchIcon.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();

    // Update DOM
    weatherCondition.textContent = data.weather[0].description;
    degree.textContent = `${Math.round(data.main.temp)}°C`;
    cityName.textContent = data.name;
    pressure.textContent = `${data.main.pressure} hPa`;
    wind.textContent = `${data.wind.speed} m/s`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    humidity.textContent = `${data.main.humidity} %`;

    // Set weather image based on weather condition
    const iconCode = data.weather[0].icon;
    weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong. Please try again.");
  }
}
