
//var lastCity = JSON.parse(localStorage.getItem());
const searchForm = document.querySelector('#citySearch');
const userInput = document.querySelector('#userInput');

searchForm.addEventListener('click', event =>{
  const cityName = userInput.value;
  getWeather(cityName);
  console.log(cityName)

});

async function getWeather (cityName) {
  
  const apiKey = 'bd528a2ef708579c5c812bf729e6e8f1';
  //format openweather api
  const corsURL = "https://cors-anywhere-gabriel-perez1.herokuapp.com/";
  const apiUrl = corsURL + "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  const response = await fetch(apiUrl);
  const data = await response.json();
  var city = $("#city").text(cityName)
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var fullDate = $("#date").text(month + "/" + day + "/" + year)
  var tempC = data.main.temp - 273;
  var tempF = $("#temp").text((Math.floor(tempC * (9/5) + 32) + "°"));
  var hum = data.main.humidity + "%";
  var windS = data.wind.speed + "mph";
  var icon = data.weather[0].icon;
  var iconUrl = $('<img>')
  .attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
  var iconImg = $("#icon").append(iconUrl)
  var iconText = $("#description").text(data.weather[0].description);
  var latitude = data.coord.lat;
  var longitude = data.coord.lon;

  const apiURL5D = corsURL + "api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
  const response5D = await fetch(apiURL5D);
  const data5D = await response5D.json();
  var UV = data5D.current.uvi;
}
