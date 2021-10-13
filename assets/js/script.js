
//var lastCity = JSON.parse(localStorage.getItem());
const searchForm = document.querySelector('#citySearch');
const userInput = document.querySelector('#userInput');

searchForm.addEventListener('click', event =>{
  event.preventDefault();
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
  //date
  var tempC = data.main.temp - 273;
  var tempF = (Math.floor(tempC * (9/5) + 32) + "˚F");
  var hum = data.main.humidity + "%";
  var windS = data.wind.speed + "mph";
  var icon = data.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  var iconText = data.weather[0].description;
  var latitude = data.coord.lat;
  var longitude = data.coord.lon;

  const apiURL5D = corsURL + "api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
  const response5D = await fetch(apiURL5D);
  const data5D = await response5D.json();
  var UV = data5D.current.uvi;
}
