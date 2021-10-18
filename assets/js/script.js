
//var lastCity = JSON.parse(localStorage.getItem());
const searchForm = document.querySelector('#citySearch');
const userInput = document.querySelector('#userInput');

searchForm.addEventListener('click', event =>{
  const cityName = userInput.value;
  getWeather(cityName);

  console.log(cityName)

});

async function getWeather (cityName) {
  $(".card").remove();
  $("<div id ='dayCard' class='card'>").appendTo("#container");
  //api key
  const apiKey = 'bd528a2ef708579c5c812bf729e6e8f1';
  //format openweather api and fecth
  const corsURL = "https://cors-anywhere-gabriel-perez1.herokuapp.com/";
  const apiUrl = corsURL + "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  const response = await fetch(apiUrl);
  
  //variables with desired api info
  const data = await response.json();
  var city = $("<h2 id='city'>").addClass("ml-auto mr-4 mt-3 mb-0").text(cityName).appendTo(".card");
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var fullDate = $("<p id='date'>").addClass("ml-5 mb-4").text(month + "/" + day + "/" + year).appendTo(".card");
  var tempC = data.main.temp - 273;
  var tempF = $("<h1 id='temp'>").addClass("ml-auto mr-4 large-font").text((Math.floor(tempC * (9/5) + 32) + "°")).appendTo(".card");
  var hum = data.main.humidity + "%";
  var windS = data.wind.speed + "mph";
  var icon = data.weather[0].icon;
  var iconUrl = $('<img>')
  .attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
  var iconText = $("<p id='description' class='ml-auto mr-4 mb-0 med-font'>").text(data.weather[0].description).appendTo(".card");
  var iconImg = $("<p class='col-sm-6 text-right' id='icon'>").append(iconUrl).appendTo("#temp");
  var latitude = data.coord.lat;
  var longitude = data.coord.lon;

  const apiURL5D = corsURL + "api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
  const response5D = await fetch(apiURL5D);
  const data5D = await response5D.json();
  console.log(data5D);
  var UV = data5D.current.uvi;
  console.log(UV);
}
