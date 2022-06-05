// city search
let city = "albertville";

// search button
// document.getElementById("searchButton").addEventListener("click", searchResults);



// function searchResults() {
//     let apiKey = "5048323430d4a970a6bdd29c47c6b672";
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=estacada&appid=${apiKey}`)
// .then(response => response.json())
// .then((data) => console.log(data))
// .then(latNlonData => {
//     return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&appid=${apiKey}`);

// })
// .then(response => response.json())
// .then(cityData => {
//     console.log(cityData);
// })
// }

let weather = {
    apiKey: "5048323430d4a970a6bdd29c47c6b672",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        // .then((response) => response.json())
        // .then((data) => console.log(data))
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
},

displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;
    console.log(data);
    console.log(name,icon,description,temp,humidity,speed, country);
    document.querySelector(".currentCityName").innerText = "Weather in " + name + ", " + country;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".currentConditions").innerText = "Current Conditions: " + description;
    document.querySelector(".currentTemp").innerText = temp + "°C";
    document.querySelector(".currentHumidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".currentWind").innerText =
      "Wind speed: " + speed + " km/h";
//     document.querySelector(".weather").classList.remove("loading");
//     document.body.style.backgroundImage =
//       "url('https://source.unsplash.com/1600x900/?" + name + "')";
//   },
//   search: function () {
//     this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


// {
//     "coord": {
//         "lon": -86.2089,
//         "lat": 34.2676
//     },
//     "weather": [
//         {
//             "id": 802,
//             "main": "Clouds",
//             "description": "scattered clouds",
//             "icon": "03d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 27.93,
//         "feels_like": 27.89,
//         "temp_min": 26.94,
//         "temp_max": 28.74,
//         "pressure": 1011,
//         "humidity": 44
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 1.34,
//         "deg": 135,
//         "gust": 3.58
//     },
//     "clouds": {
//         "all": 40
//     },
//     "dt": 1654460744,
//     "sys": {
//         "type": 2,
//         "id": 18680,
//         "country": "US",
//         "sunrise": 1654425190,
//         "sunset": 1654476831
//     },
//     "timezone": -18000,
//     "id": 4829791,
//     "name": "Albertville",
//     "cod": 200
// }