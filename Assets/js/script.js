// sets date string
let currentDate = moment();
let today = currentDate.format("dddd MMM Do YYYY");
let day1 = moment().add(1, "days").format("ddd MMM DD YYYY");
let day2 = moment().add(2, "days").format("ddd MMM DD YYYY");
let day3 = moment().add(3, "days").format("ddd MMM DD YYYY");
let day4 = moment().add(4, "days").format("ddd MMM DD YYYY");
let day5 = moment().add(5, "days").format("ddd MMM DD YYYY");
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let citySearchHistory = [];
let citySearchHistoryBtnEl;
let citySearchHistoryBtnContainerEl = document.querySelector('#btnList')
let latLonApiUrl;

let searchButton = document.getElementById('search-button');
let searchButtonHandler = function (event) {
    event.preventDefault();
    citySearchInput = citySearchInputEl.value.trim(); 
    if (citySearchInput) {
      getLatLon(citySearchInput);
      createSearchHistory(citySearchInput);
    } else {
      alert('Please enter a City');
    }
  };
  
  searchButton.addEventListener('click', searchButtonHandler);
  searchButton.addEventListener('submit', searchButtonHandler);
  
// Local Storage
  function createSearchHistory(citySearchInput) {
    citySearchHistory.unshift(citySearchInput);
    localStorage.setItem('searchHistory', JSON.stringify(citySearchHistory));
    renderHistory();
  };
  

  function renderHistory() {
    let retrievedHistory = localStorage.getItem('searchHistory');
    let searchHistoryParse = JSON.parse(retrievedHistory);
  

    citySearchHistoryBtnEl = document.createElement("button");
    citySearchHistoryBtnEl.innerHTML = searchHistoryParse[0];
    citySearchHistoryBtnEl.setAttribute('type', 'submit');
    citySearchHistoryBtnEl.setAttribute('class', 'btn btn-secondary btn-block custom-btn');
    citySearchHistoryBtnEl.setAttribute('display', 'block');
 
    citySearchHistoryBtnContainerEl.appendChild(citySearchHistoryBtnEl);
  

  citySearchHistoryBtnEl.addEventListener ("click", function(event) {
    citySearchInputEl.value = $(this).html();
    searchButtonHandler(event);
  })
  };
  
  renderHistory();

// find the lattitude and longitude of the city entered in search
function getLatLon(citySearchInput) {
  apiKey = "5048323430d4a970a6bdd29c47c6b672";
//   citySearchInput = "saint michael";
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
    "https://api.openweathermap.org/geo/1.0/reverse?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (stateCountryData) {
          console.log(stateCountryData);
          document.querySelector(".currentCityName").innerText =
            "Weather in " +
            stateCountryData[0].name +
            ", " +
            stateCountryData[0].state +
            "(" +
            stateCountryData[0].country +
            ")";
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
        // document.querySelector(".currentUVIndexValue").innerText =
        //   "Current UV index: " + weatherData.current.uvi;
          let currentUVIndexEl = document.querySelector('#currentUV');
          let currentUVIndex;
          // set current uv info box
          currentUVIndex = (weatherData.current.uvi);
          currentUVIndexEl.innerHTML = "Current UV index: " + currentUVIndex;
          if (currentUVIndex < 2.99) {
            currentUVIndexEl.classList.add('low');
            currentUVIndexEl.classList.remove('medium');
            currentUVIndexEl.classList.remove('high');
          } else if (currentUVIndex > 3 && currentUVIndex < 5.99) {
            currentUVIndexEl.classList.add('medium');
            currentUVIndexEl.classList.remove('low');
            currentUVIndexEl.classList.remove('high');
          } else {
            currentUVIndexEl.classList.add('high');
            currentUVIndexEl.classList.remove('low');
            currentUVIndexEl.classList.remove('medium');
          };
          
        // day 1
        document.querySelector("#day1Date").innerText = day1;
        document.querySelector(".day1Icon").src =
          "https://openweathermap.org/img/wn/" +
          weatherData.daily[1].weather[0].icon +
          ".png";
        document.querySelector(".day1Conditions").innerText =
          "Conditions: " + weatherData.daily[1].weather[0].description;
        document.querySelector(".day1HighTemp").innerText =
          "High Temp: " + weatherData.daily[1].temp.max + " °F";
        document.querySelector(".day1LowTemp").innerText =
          "Low Temp: " + weatherData.daily[1].temp.min + " °F";
        document.querySelector(".day1WindSpeed").innerText =
          "Wind speed: " + weatherData.daily[1].wind_speed + " MPH";
        document.querySelector(".day1WindGust").innerText =
          "Wind Gusts: " + weatherData.daily[1].wind_gust + " MPH";
        document.querySelector(".day1Humidity").innerText =
          "Humidity: " + weatherData.daily[1].humidity + "%";
        document.querySelector(".day1UV").innerText =
          "UV index: " + weatherData.daily[1].uvi;
        // day 2
        document.querySelector("#day2Date").innerText = day2;
        document.querySelector(".day2Icon").src =
          "https://openweathermap.org/img/wn/" +
          weatherData.daily[2].weather[0].icon +
          ".png";
        document.querySelector(".day2Conditions").innerText =
          "Conditions: " + weatherData.daily[2].weather[0].description;
        document.querySelector(".day2HighTemp").innerText =
          "High Temp: " + weatherData.daily[2].temp.max + " °F";
        document.querySelector(".day2LowTemp").innerText =
          "Low Temp: " + weatherData.daily[2].temp.min + " °F";
        document.querySelector(".day2WindSpeed").innerText =
          "Wind speed: " + weatherData.daily[2].wind_speed + " MPH";
        document.querySelector(".day2WindGust").innerText =
          "Wind Gusts: " + weatherData.daily[2].wind_gust + " MPH";
        document.querySelector(".day2Humidity").innerText =
          "Humidity: " + weatherData.daily[2].humidity + "%";
        document.querySelector(".day2UV").innerText =
          "UV index: " + weatherData.daily[2].uvi;
        // day 3
        document.querySelector("#day3Date").innerText = day3;
        document.querySelector(".day3Icon").src =
          "https://openweathermap.org/img/wn/" +
          weatherData.daily[3].weather[0].icon +
          ".png";
        document.querySelector(".day3Conditions").innerText =
          "Conditions: " + weatherData.daily[3].weather[0].description;
        document.querySelector(".day3HighTemp").innerText =
          "High Temp: " + weatherData.daily[3].temp.max + " °F";
        document.querySelector(".day3LowTemp").innerText =
          "Low Temp: " + weatherData.daily[3].temp.min + " °F";
        document.querySelector(".day3WindSpeed").innerText =
          "Wind speed: " + weatherData.daily[3].wind_speed + " MPH";
        document.querySelector(".day3WindGust").innerText =
          "Wind Gusts: " + weatherData.daily[3].wind_gust + " MPH";
        document.querySelector(".day3Humidity").innerText =
          "Humidity: " + weatherData.daily[3].humidity + "%";
        document.querySelector(".day3UV").innerText =
          "UV index: " + weatherData.daily[3].uvi;
        // day 4
        document.querySelector("#day4Date").innerText = day4;
        document.querySelector(".day4Icon").src =
          "https://openweathermap.org/img/wn/" +
          weatherData.daily[4].weather[0].icon +
          ".png";
        document.querySelector(".day4Conditions").innerText =
          "Conditions: " + weatherData.daily[4].weather[0].description;
        document.querySelector(".day4HighTemp").innerText =
          "High Temp: " + weatherData.daily[4].temp.max + " °F";
        document.querySelector(".day4LowTemp").innerText =
          "Low Temp: " + weatherData.daily[4].temp.min + " °F";
        document.querySelector(".day4WindSpeed").innerText =
          "Wind speed: " + weatherData.daily[4].wind_speed + " MPH";
        document.querySelector(".day4WindGust").innerText =
          "Wind Gusts: " + weatherData.daily[4].wind_gust + " MPH";
        document.querySelector(".day4Humidity").innerText =
          "Humidity: " + weatherData.daily[4].humidity + "%";
        document.querySelector(".day4UV").innerText =
          "UV index: " + weatherData.daily[4].uvi;
        // day 5
        document.querySelector("#day5Date").innerText = day5;
        document.querySelector(".day5Icon").src =
          "https://openweathermap.org/img/wn/" +
          weatherData.daily[5].weather[0].icon +
          ".png";
        document.querySelector(".day5Conditions").innerText =
          "Conditions: " + weatherData.daily[5].weather[0].description;
        document.querySelector(".day5HighTemp").innerText =
          "High Temp: " + weatherData.daily[5].temp.max + " °F";
        document.querySelector(".day5LowTemp").innerText =
          "Low Temp: " + weatherData.daily[5].temp.min + " °F";
        document.querySelector(".day5WindSpeed").innerText =
          "Wind speed: " + weatherData.daily[5].wind_speed + " MPH";
        document.querySelector(".day5WindGust").innerText =
          "Wind Gusts: " + weatherData.daily[5].wind_gust + " MPH";
        document.querySelector(".day5Humidity").innerText =
          "Humidity: " + weatherData.daily[5].humidity + "%";
        document.querySelector(".day5UV").innerText =
          "UV index: " + weatherData.daily[5].uvi;
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}
