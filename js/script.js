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
                    $("body").css("background-image", "url(https://upload.wikimedia.org/wikipedia/commons/0/07/Clear_Sky.jpg)");
                }
                else if(weatherDescription === "Fog") {
                    $("body").css("background-image", "url(http://i.telegraph.co.uk/multimedia/archive/02061/leicester-park_2061557i.jpg)");
                }
                else if(weatherDescription === "Clouds") {
                    $("body").css("background-image", "url(http://www.ethnotraveler.com/wp-content/uploads/2016/03/storm-clouds-426271_960_720.jpg)");
                }
                else if(weatherDescription === "Rain") {
                    $("body").css("background-image", "url(http://www.weatherwizkids.com/wp-content/uploads/2015/02/rain21.jpg)");
                }
                else if(weatherDescription === "Snow") {
                    $("body").css("background-image", "url(https://www.metoffice.gov.uk/binaries/content/gallery/mohippo/images/learning/learn-about-the-weather/snow/heavy-snow-in-the-uk.jpg)");
                }
                else if(weatherDescription === "Mist") {
                    $("body").css("background-image", "url(https://www.muralswallpaper.com/app/uploads/amidst-the-mist-forest-plain.jpg)");
                }
                else if(weatherDescription === "Thunderstorm") {
                    $("body").css("background-image", "url(https://accuweather.brightspotcdn.com/3b/34/285b347343c69a37f020db11fb51/lightning-getty.jpg)");
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
                $("#humidityIcon").attr("src", "https://cdn.iconscout.com/public/images/icon/free/png-512/humidity-forecast-hydration-precipitation-temperature-weather-3a64e557720613a1-512x512.png").attr("alt", "Humidity icon");
                $("#humidity").html(humidity + "% ");
                $("#windSpeedIcon").attr("src", "https://cdn2.iconfinder.com/data/icons/lovely-weather-icons/32/wind1-256.png").attr("alt", "Wind speed icon");
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