$(document).ready(function() {
  if(navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var latitude = position.coords.latitude; // geografska širina
      var longitude = position.coords.longitude; // geografska dužina
      var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude; // link servera sa koga se prikupljaju podaci

      $.getJSON(api, function(data) {
        var place = data.name; // ime mesta
        var country = data.sys.country; // inicijali zemlje
        var weatherIcon = data.weather[0].icon; // ikonica vremena
        var temperature = data.main.temp; // temperatura
        var weatherInfo = data.weather[0].description; // opis vremena
        var humidity = data.main.humidity; // procenat vlažnosti
        var windSpeed = data.wind.speed; // brzina vetra
        var pressure = data.main.pressure; // vazdušni pritisak
        var weatherDescription = data.weather[0].main; // vreme
        var celsius = temperature.toFixed(0); // temperatura u Celzijusima
        var fahrenheit = (celsius * 9 / 5 + 32).toFixed(0); // temperatura u Farenhajtima
        var i = 1; // brojač parnih i neparnih klikova za naizmenično menjanje stepena temperature

        /* Postavljanje pozadina na osnovu trenutnog vremena */
        if(weatherDescription === "Clear") { // vedro
          $("body").css("background-image", "url(https://lintvksnt.files.wordpress.com/2015/09/sunshine.jpg?w=650)");
        }
        else if(weatherDescription === "Fog") { // magla
          $("body").css("background-image", "url(http://i.telegraph.co.uk/multimedia/archive/02061/leicester-park_2061557i.jpg)");
        }
        else if(weatherDescription === "Clouds") { // oblačno
          $("body").css("background-image", "url(http://www.ethnotraveler.com/wp-content/uploads/2016/03/storm-clouds-426271_960_720.jpg)");
        }
        else if(weatherDescription === "Rain") { // kišovito
          $("body").css("background-image", "url(http://www.weatherwizkids.com/wp-content/uploads/2015/02/rain21.jpg)");
        }
        else if(weatherDescription === "Snow") { // sneg
          $("body").css("background-image", "url(https://fs.nwstatic.co.uk/monthly_2017_11/snow-lane-sacra.jpg.e43c7ed1a033b93281108579b9c357f8.jpg)");
        }
        else if(weatherDescription === "Mist") { // izmaglica
          $("body").css("background-image", "url(https://www.muralswallpaper.com/app/uploads/amidst-the-mist-forest-plain.jpg)");
        }
        else if(weatherDescription === "Thunderstorm") { // grmljavina
          $("body").css("background-image", "url(https://accuweather.brightspotcdn.com/3b/34/285b347343c69a37f020db11fb51/lightning-getty.jpg)");
        }

        /* Postavljanje podataka prikupljenih sa servera */
        $("#place").html(place + ", ");
        $("#country").html(country);
        if(weatherIcon) { // ako link od ikonice postoji na serveru, postavi ikonicu i alternativni tekst
          $("#weatherIcon").attr("src", weatherIcon);
          $("#weatherIcon").attr("alt", "Weather icon");
        }
        else { // u suprotnom ne prikazuj podrazumevanu ikonicu ni alternativni tekst
          $("#weatherIcon").attr("src", "#");
          $("#weatherIcon").attr("alt", "");
        }
        $("#temperature").html(" " + celsius);
        $("#degrees").html("&#8451;|&#8457;");
        $("#degrees").attr("title", "Switch to Fahrenheit");
        $("#weatherInfo").html(" (" + weatherInfo + ")");
        $("#humidityIcon").attr("src", "https://cdn.iconscout.com/public/images/icon/free/png-512/humidity-forecast-hydration-precipitation-temperature-weather-3a64e557720613a1-512x512.png");
        $("#humidityIcon").attr("alt", "Humidity icon");
        $("#humidity").attr("title", "Humidity");
        $("#humidity").html(humidity + "% ");
        $("#windSpeedIcon").attr("src", "https://cdn2.iconfinder.com/data/icons/lovely-weather-icons/32/wind1-256.png");
        $("#windSpeedIcon").attr("alt", "Wind speed icon");
        $("#windSpeed").attr("title", "Wind speed");
        $("#windSpeed").html(windSpeed + "m/s");
        $("#pressureIcon").attr("src", "https://cdn.iconscout.com/public/images/icon/premium/png-128/barometer-gauge-measure-pressure-air-device-meteorology-3f669ec554602790-128x128.png");
        $("#pressureIcon").attr("alt", "Pressure icon");
        $("#pressure").attr("title", "Pressure");
        $("#pressure").html(pressure + "hPa");

        /* Menjanje stepena temperature */
        $("#degrees").on("click", function() {
          i++;
          if(i % 2 === 0) {
            $("#temperature").html(" " + fahrenheit);
            $("#degrees").html("&#8457;|&#8451;");
            $("#degrees").attr("title", "Switch to Celsius");
          }
          else {
            $("#temperature").html(" " + celsius);
            $("#degrees").html("&#8451;|&#8457;");
            $("#degrees").attr("title", "Switch to Fahrenheit");
          }
        });
      });
    });
  }
  else {
    alert("Sorry, your browser doesn't support HTML5 geolocation. We are unable to determine your location.");
  }
});