$(document).ready(function() {
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

            $.getJSON(api, function(data) {
                var place = data.name;
                var country = data.sys.country;
                var weatherIcon = data.weather[0].icon;
                var temperature = data.main.temp;
                var weatherInfo = data.weather[0].description;
                var humidity = data.main.humidity;
                var windSpeed = data.wind.speed;

                var weatherDescription = data.weather[0].main; // Used to determine background

                var celsius = temperature.toFixed(0);
                var fahrenheit = (celsius * 9 / 5 + 32).toFixed(0);
                var i = 1; // Counter of even and odd number of clicks for changing between Celsius and Fahrenheit

                /* Logic for showing background image */
                if(weatherDescription === "Clear") {
                    $("body").css("background-image", "url(https://image.ibb.co/f4fV3V/Clear-Sky.jpg)");
                }
                else if(weatherDescription === "Fog") {
                    $("body").css("background-image", "url(https://image.ibb.co/gcKUxq/leicester-park-2061557i.jpg)");
                }
                else if(weatherDescription === "Clouds") {
                    $("body").css("background-image", "url(https://image.ibb.co/iW5PVA/storm-clouds-426271-960-720.jpg)");
                }
                else if(weatherDescription === "Rain") {
                    $("body").css("background-image", "url(https://image.ibb.co/ctAPVA/rain21.jpg)");
                }
                else if(weatherDescription === "Snow") {
                    $("body").css("background-image", "url(https://image.ibb.co/gzsciV/heavy-snow-in-the-uk.jpg)");
                }
                else if(weatherDescription === "Mist") {
                    $("body").css("background-image", "url(https://image.ibb.co/gxn4VA/amidst-the-mist-forest-plain.jpg)");
                }
                else if(weatherDescription === "Thunderstorm") {
                    $("body").css("background-image", "url(https://image.ibb.co/fTmL3V/lightning-getty.jpg)");
                }

                /* Placing data from the server */
                $("#place").html(place + ", ");
                $("#country").html(country);
                if(weatherIcon) {
                    $("#weatherIcon").attr("src", weatherIcon).attr("alt", "Weather icon");
                }
                else {
                    $("#weatherIcon").attr("src", "#").attr("alt", "");
                }
                $("#temperature").html(" " + celsius);
                $("#degrees").html("&#8451;|&#8457;").attr("title", "Switch to Fahrenheit");
                $("#weatherInfo").html(" (" + weatherInfo + ")");
                $("#humidityIcon").attr("src", "https://image.ibb.co/fiQDOV/humidity-forecast-hydration-precipitation-temperature-weather-38924.png").attr("alt", "Humidity icon");
                $("#humidity").html(humidity + "% ");
                $("#windSpeedIcon").attr("src", "https://image.ibb.co/g8XhHq/wind1-256.png").attr("alt", "Wind speed icon");
                $("#windSpeed").html(windSpeed + "m/s");

                /* Switching between Celsius and Fahrenheit */
                $("#degrees").on("click", function() {
                    i++;
                    if(i % 2 === 0) {
                        $("#temperature").html(" " + fahrenheit);
                        $("#degrees").html("&#8457;|&#8451;").attr("title", "Switch to Celsius");
                    }
                    else {
                        $("#temperature").html(" " + celsius);
                        $("#degrees").html("&#8451;|&#8457;").attr("title", "Switch to Fahrenheit");
                    }
                });
            });
        });
    }
    else {
        alert("Sorry, your browser doesn't support HTML5 geolocation. We are unable to determine your location.");
    }
});