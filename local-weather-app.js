(function () {
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
        $("#location").text(data.name);
        $("#temperature").text(Math.round(data.main.temp) + "\u2103");
        $("#description").text(data.weather[0].main);
        $("#image").attr("src", data.weather[0].icon);
    }
})();