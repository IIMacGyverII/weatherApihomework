

// search button
document.getElementById("searchButton").addEventListener("click", searchResults);



function searchResults() {
    let apiKey = "5048323430d4a970a6bdd29c47c6b672";
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=estacada&appid=${apiKey}`)
.then(response => response.json())
.then(latNlonData => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&appid=${apiKey}`);

})
.then(response => response.json())
.then(cityData => {
    console.log(cityData);
})
}

