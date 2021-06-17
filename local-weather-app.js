(function () {
    let temp = 0;

    let weatherIcons = {
        Drizzle: "bi bi-cloud-drizzle",
        Thunderstorm: "bi bi-cloud-lightning",
        Rain: "bi bi-cloud-rain",
        Snow: "bi bi-cloud-snow",
        Clouds: "bi bi-clouds", //works
        Clear: "bi-sun", //works
        Wind: "bi bi-wind"
    }

    $(document).ready(function () {
        $("#fahrenheit").click(changeCelsiusToFahrenheit);
        $("#celsius").click(changeFahrenheitToCelsius);
    });

    function success(pos) {
        let crd = pos.coords;
        getLocalWeather(crd.latitude, crd.longitude);
    }

    navigator.geolocation.getCurrentPosition(success);

    function getLocalWeather(lat, lon) {
        $.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`, handleWeatherData);
    }

    function handleWeatherData(data) {
        temp = Math.round(data.main.temp * 10) / 10;
        $("#location").text(data.name);
        $("#temperature").text(temp + "\u00B0C");
        $("#description").text(data.weather[0].main);
        $(".card").show("slow");
        weatherIcon();

        function weatherIcon() {
            if (weatherIcons[data.weather[0].main]) {
                $("#weather-icon").attr("class", weatherIcons[data.weather[0].main]);
            }
        }
    }

    function changeCelsiusToFahrenheit() {
        $("#temperature").text(Math.round(((temp * 9 / 5) + 32) * 10) / 10 + "\u00B0F");
    }

    function changeFahrenheitToCelsius() {
        $("#temperature").text(temp + "\u00B0C");
    }
})();