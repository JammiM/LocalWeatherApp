"use strict";

$(document).ready(function () {
  getCurrentLocation();
  getDateAndTime();
  var initialTemperatureFromServer;
  $("#toggleBtn").on("click", switchTemp);
});

// Switches between Celsius and Fahrenheit
function switchTemp(event) {
  event.preventDefault();

  var fahrenheit = void 0,
      celsius = void 0,
      fahrenheitToCelsius = void 0;
  celsius = parseInt($("#temp").html());

  fahrenheit = parseInt(celsius) * 1.8 + 32;
  fahrenheitToCelsius = (fahrenheit - 32) / 1.8;
  Math.round(fahrenheitToCelsius) * 100;

  if ($("#tempSymbol").html() == "\xB0 C") {
    $("#tempSymbol").html("\xB0 F");
    $("#temp").html(fahrenheit);
    console.log(fahrenheit);
  } else {
    $("#tempSymbol").html("\xB0 C");
    $("#temp").html(initialTemperatureFromServer);
  }
}

function getServerData(lat, lon) {
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + ("" + lat) + "&lon=" + ("" + lon);
  $.getJSON(api, generateHTMLTemplate);
}

function generateHTMLTemplate(serverResponse) {
  $("#location").html(serverResponse.name + ", " + serverResponse.sys.country);
  $("#weatherIcon").attr("src", serverResponse.weather[0].icon);
  $("#main").html(serverResponse.weather[0].main);
  $("#weatherIcon").attr("alt", serverResponse.weather[0].main);
  $("#description").html(serverResponse.weather[0].description);
  $("#country").html(serverResponse.sys.country);
  $("#temp").html(serverResponse.main.temp);
  $("#tempSymbol").html("\xB0 C");

  initialTemperatureFromServer = serverResponse.main.temp;
}

function getCurrentLocation() {
  var lat = void 0,
      lon = void 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getServerData(lat, lon);
    });
  } //if
} //getCurrentLocation

function getDateAndTime() {
  var min = void 0,
      hour = void 0,
      date = void 0;
  date = new Date();
  $("#time").html(" " + date.getHours() + ":" + date.getMinutes());
  $("#date").html(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
}