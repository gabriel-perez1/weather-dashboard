var cityName = "toronto";
var lastCity = JSON.parse(localStorage.getItem());

function getWeather (cityName) {

  var apiKey = 'bd528a2ef708579c5c812bf729e6e8f1';
  //format openweather api
  var corsURL = "https://cors-anywhere-gabriel-perez1.herokuapp.com/";
  var apiUrl = corsURL + "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  //make a get request to url
  fetch(apiUrl).then(function(response){
    return response.json()
    .then(function(data) {
      console.log(data);
    })
  });
}

window.onload = getWeather(cityName);