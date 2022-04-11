let apiOMDBKey = "749b1679"
let apiKey = "5048323430d4a970a6bdd29c47c6b672"

fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=55301,US&appid=${apiKey}`)
.then(response => response.json())
.then(data =>{

    console.log(data);
    (function () {
        var old = console.log;
        var logger = document.getElementById('weatherLog');
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
            } else {
                logger.innerHTML += message + '<br />';
            }
        }
    })();
})

fetch(`http://www.omdbapi.com/?apikey=${apiOMDBKey}&t=last+samurai`)
.then(response => response.json())
.then(data =>{

    console.log(data);
    (function () {
        var old = console.log;
        var logger = document.getElementById('omdbLog');
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
            } else {
                logger.innerHTML += message + '<br />';
            }
        }
    })();
})

fetch(`https://www.loc.gov/search/?q=baseball&fo=json`)
.then(response => response.json())
.then(data =>{

    console.log(data);
    (function () {
        var old = console.log;
        var logger = document.getElementById('locLog');
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
            } else {
                logger.innerHTML += message + '<br />';
            }
        }
    })();
})

