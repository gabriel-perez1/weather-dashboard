//api key
const apiKey = 'bd528a2ef708579c5c812bf729e6e8f1';
// deployed cors-anywhere package
const corsURL = "https://cors-anywhere-gabriel-perez1.herokuapp.com/";
const userInput = document.querySelector('#userInput');

$('#citySearch').on('click', event =>{
  let cityName = userInput.value;
  getWeather(cityName);
  getSearch(cityName);
});

$('#userInput').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    let cityName = userInput.value;
    getWeather(cityName);
    getSearch(cityName);
}})

// stores search history
function getSearch (cityName){
  let lastSearch = [];
  lastSearch.push(cityName)
  localStorage.setItem('searchHistory', JSON.stringify(lastSearch));
  let lastCity = JSON.parse(localStorage.getItem('searchHistory'));
  var searchHistory = $("<li id='searchItem'>").addClass("searches").text(lastCity).appendTo("#searchList");
}

// calls stored search history when list item is clicked 
$(".history").on('click', 'li', (function() {
  let cityName = $(this).text();
  getWeather(cityName);
}))


// clear history

$("#clearSearch").click(function() {
  $("#searchList").empty();
})

async function getWeather (cityName) {
  // updates card that will display current weather info
  $("#dayCard").remove();
  $("<div id ='dayCard' class='card'>").appendTo("#container");
  
  //format openweather api and fecth
  const apiUrl = corsURL + "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  const response = await fetch(apiUrl);
  
  //variables with desired api info and card location
  const data = await response.json();
  var city = $("<h2 id='city'>").addClass("ml-auto mr-4 mt-3 mb-0").text(cityName).appendTo("#dayCard");
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var fullDate = $("<p id='date'>").addClass("ml-5 mb-4").text(month + "/" + day + "/" + year).appendTo("#dayCard");
  var tempC = data.main.temp - 273;
  var tempF = $("<h1 id='temp'>").addClass("ml-auto mr-4 large-font").text((Math.floor(tempC * (9/5) + 32) + "°")).appendTo("#dayCard");
  var hum = data.main.humidity + "%";
  var windS = data.wind.speed + "mph";
  var icon = data.weather[0].icon;
  var iconUrl = $('<img>')
  .attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
  var iconText = $("<p id='description' class='ml-auto mr-4 mb-0 med-font'>").text(data.weather[0].description).appendTo("#dayCard");
  var iconImg = $("<p id='icon'>").append(iconUrl).appendTo("#temp");
  var latitude = data.coord.lat;
  var longitude = data.coord.lon;

  const apiUrlUv = corsURL + "api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
  const responseUv = await fetch(apiUrlUv);
  const dataUv = await responseUv.json();
  var UV = dataUv.current.uvi;

  // format openweather 5d api and fetch
  const api5DUrl = corsURL + "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
  const response5D = await fetch(api5DUrl);
  
  //variables with desired api info and card location
  const data5d = await response5D.json();
  $("#fiveRow").empty();

  for (var i = 0; i < 5; i += 1) {
    var fiveCard = $("<div id ='fiveCard' class='card'>").appendTo("#fiveRow");
    var plusDate = today.getTime() + 86400000 * (i+1);
    var nextDate = new Date (plusDate);
    var nextDay = nextDate.getDate();
    var nextMonth = nextDate.getMonth() + 1;
    var nextYear = nextDate.getFullYear();
    var fiveDate = $("<p id='5date'>").addClass("card-title").text(nextMonth + "/" + nextDay + "/" + nextYear).appendTo("#fiveCard");
  }
}