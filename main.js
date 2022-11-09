//task1
let movie_imgs = document.querySelectorAll(".movie-box"),
movie_name = document.querySelectorAll("#movie-name");
let response = [], data = [];

(async function movies() {
    response[0] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=The+Owl+House');
    data[0] = await response[0].json();
    response[1] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Gravity+Falls');
    data[1] = await response[1].json();
    response[2] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Game+of+Thrones');
    data[2] = await response[2].json();
    response[3] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Avengers%3A+Endgame');
    data[3] = await response[3].json();
    response[4] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Guardians+of+the+Galaxy');
    data[4] = await response[4].json();
    response[5] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Iron+Man');
    data[5] = await response[5].json();
    response[6] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Real+Steel');
    data[6] = await response[6].json();
    response[7] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=The+Lord+of+the+Rings%3A+The+Rings+of+Power');
    data[7] = await response[7].json();
    response[8] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Andor');
    data[8] = await response[8].json();
    response[9] = await fetch('http://www.omdbapi.com/?apikey={yourOwnKey}&t=Man+of+Steel');
    data[9] = await response[9].json();
    for(let i = 0; i < response.length; i++) {
        movie_imgs[i].querySelector("img").src = data[i].Poster;
        movie_name[i].textContent = data[i].Title;
    }
})()

//task2
const CELCIA = '℃';
let city_input = document.querySelector("#city-name"),
btn_get_loc = document.querySelector(".get-location"),
btn_return = document.querySelector("#return"),
weather_box_start = document.querySelector(".weather-box-start"),
weather_box_result = document.querySelector(".weather-box-result"),
temp = document.querySelector("h2.temp"), description = document.querySelector(".description"),
get_location = document.querySelector(".location"),
feels_like = document.querySelector(".temp-like"),
humidity = document.querySelector(".temp-humidity");

city_input.addEventListener('keydown',async function(e) {
    if(e.keyCode === 13) {
        weather_box_start.style.display = "none";
        weather_box_result.style.display = "grid";
        btn_return.style.display = "inline-block";
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_input.value}&limit=1&appid={yourOwnKey}`);
        let data = await response.json();
        city_input.value = "";
        show_weather(data[0].lat, data[0].lon);
        get_City(data[0].lat, data[0].lon);
    }
});
btn_get_loc.addEventListener('click', function() {
    weather_box_start.style.display = "none";
    weather_box_result.style.display = "grid";
    btn_return.style.display = "inline-block";
    navigator.geolocation.getCurrentPosition(async function(position) {
        show_weather(position.coords.latitude, position.coords.longitude);
        get_City(position.coords.latitude, position.coords.longitude);
    });
});
btn_return.addEventListener('click', function() {
    weather_box_result.style.display = "none";
    btn_return.style.display = "none";
    weather_box_start.style.display = "grid";
    temp.innerHTML = "";
    description.innerHTML = "";
    feels_like.innerHTML = "";
    humidity.innerHTML = "";
    get_location.innerHTML = "";
});
async function show_weather(lat, lon) {
    let response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid={yourOwnKey}`);
    let data2 = await response2.json();
    temp.innerHTML = data2.main.temp + CELCIA;
    description.innerHTML = data2.weather[0].description;
    feels_like.innerHTML = data2.main.feels_like + CELCIA;
    humidity.innerHTML = data2.main.humidity + "%";
}
async function get_City(latitude,longitude) {
    let response1 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid={yourOwnKey}`);
    let data1 = await response1.json();
    get_location.innerHTML = data1[0].name;
}
