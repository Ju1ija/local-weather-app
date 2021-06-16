(function () {
    let temp = 0;

    $(document).ready(function() {
        $("#fahrenheit").click(changeCelsiusToFahrenheit);
        $("#celsius").click(changeFahrenheitToCelsius);
    });

    function success(pos) {
        let crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getLocalWeather(crd.latitude, crd.longitude);
    }

    navigator.geolocation.getCurrentPosition(success);

    function getLocalWeather(lat, lon) {
        $.get(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`, handleWeatherData);
    }

    function handleWeatherData(data) {
        console.log(data);
        temp = Math.round(data.main.temp * 10) / 10;
        $("#location").text(data.name);
        $("#temperature").text(temp + "\u00B0C");
        $("#description").text(data.weather[0].main);
        // $("#weather-icon").attr("src", data.weather[0].icon);
        $(".card").show("slow");
        weatherIcon();

        function weatherIcon() {
            if(data.weather[0].main == "Drizzle") {
                $("#weather-icon").attr("class", "bi bi-cloud-drizzle");
            } else if(data.weather[0].main == "Thunderstorm") {
                $("#weather-icon").attr("class", "bi bi-cloud-lightning");
            } else if(data.weather[0].main == "Rainy") {
                $("#weather-icon").attr("class", "bi bi-cloud-rain");
            } else if(data.weather[0].main == "Snowy") {
                $("#weather-icon").attr("class", "bi bi-cloud-snow");
            } else if(data.weather[0].main == "Cloudy") {
                $("#weather-icon").attr("class", "bi bi-clouds");
            } else if(data.weather[0].main == "Clear") {
                $("#weather-icon").attr("class", "bi-sun");
            } else if(data.weather[0].main == "Windy") {
                $("#weather-icon").attr("class", "bi bi-wind");
            } else {
                $("#weather-icon").attr("class", "bi bi-emoji-dizzy");
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