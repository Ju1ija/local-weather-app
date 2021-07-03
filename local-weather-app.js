(function () {
  let temp = 0;

  let weatherIcons = {
    Drizzle: "bi bi-cloud-drizzle",
    Thunderstorm: "bi bi-cloud-lightning",
    Rain: "bi bi-cloud-rain",
    Snow: "bi bi-cloud-snow",
    Clouds: "bi bi-clouds",
    Clear: "bi-sun"
  }

  const locationSuccessCallback = position => getLocalWeather(position.coords.latitude, position.coords.longitude);

  function getLocalWeather(lat, lon) {
    $.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`, handleWeatherData);
  }

  function handleWeatherData(data) {
    temp = data.main.temp.toFixed(1);
    $("#location").text(data.name);
    $("#temperature").text(temp + "\u00B0C");
    $("#description").text(data.weather[0].main);
    $(".card").show("slow");
    if (weatherIcons[data.weather[0].main]) {
      $("#weather-icon").attr("class", weatherIcons[data.weather[0].main]);
    }
  }

  function changeCelsiusToFahrenheit() {
    let fahrenheit = (temp * 9 / 5) + 32;
    $("#temperature").text(`${fahrenheit.toFixed(1)}\u00B0F`);
  }

  function changeFahrenheitToCelsius() {
    $("#temperature").text(`${temp}\u00B0C`);
  }

  $(document).ready(function () {
    $("#fahrenheit").click(changeCelsiusToFahrenheit);
    $("#celsius").click(changeFahrenheitToCelsius);
    navigator.geolocation.getCurrentPosition(locationSuccessCallback);
  });
})();