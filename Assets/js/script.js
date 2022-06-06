// sets date string
let currentDate = moment()
let today = (currentDate.format('dddd MMM Do YYYY'));
let day1 = moment().add(1, 'days').format('dddd MMM DD YYYY');
let day2 = moment().add(2, 'days').format('dddd MMM DD YYYY');
let day3 = moment().add(3, 'days').format('dddd MMM DD YYYY');
let day4 = moment().add(4, 'days').format('dddd MMM DD YYYY');
let day5 = moment().add(5, 'days').format('dddd MMM DD YYYY');

// find the lattitude and longitude of the city entered in search
function getLatLon(citySearchInput) {
    apiKey = "5048323430d4a970a6bdd29c47c6b672";
    citySearchInput = "saint michael";
    let latLonApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearchInput +
    "&units=imperial" +
    "&appid=" +
    apiKey;
    
    fetch(latLonApiUrl).then(function (response) {
        if (response.ok) {
            response
            .json()
            .then(function (data) {
                console.log(data);
                lat = data.coord.lat;
                lon = data.coord.lon;
                const { name } = data;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                const { country } = data.sys;
                
                document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
          document.querySelector(".currentConditions").innerText =
            "Current Conditions: " + description;
          document.querySelector(".currentTemp").innerText = temp + "°F";
          document.querySelector(".currentHumidity").innerText =
            "Humidity: " + humidity + "%";
          document.querySelector(".currentWind").innerText =
          "Wind speed: " + speed + " MPH";
          document.querySelector("#currentDate").innerText = today;
        })
        .then(getStateAndCountry);
      //   console.log(data);
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

function getStateAndCountry(citySearchInput) {
    var apiUrl =
      "http://api.openweathermap.org/geo/1.0/reverse?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (stateCountryData) {
          console.log(stateCountryData)
          document.querySelector(".currentCityName").innerText =
            "Weather in " + stateCountryData[0].name + ", " + stateCountryData[0].state + ", " + stateCountryData[0].country;
        })
        .then(getWeatherData);
      //   console.log(data);
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

function getWeatherData(citySearchInput) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&exclude=minutely,hourly,alerts&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (weatherData) {
        console.log(weatherData);
        document.querySelector(".currentUV").innerText = "Current UV index: " + weatherData.current.uvi;
        // day 1
        document.querySelector("#day1Date").innerText = day1;
        // console.log(weatherData.daily[0].weather[0].icon);
        document.querySelector(".day1Icon").src =
            "https://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + ".png";
            document.querySelector(".day1Conditions").innerText =
            "Conditions: " + weatherData.daily[1].weather[0].description;
            document.querySelector(".currentTemp").innerText = temp + "°F";
          document.querySelector(".currentHumidity").innerText =
            "Humidity: " + humidity + "%";
          document.querySelector(".currentWind").innerText =
          "Wind speed: " + speed + " MPH";
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}
