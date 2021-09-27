function getWeather (cityName) {
  //apiKey is on config.js to not push it to github
  var apiKey = config.MY_KEY;
  //format openweather api
  var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  //make a get request to url
  fetch(apiUrl).then(function(response){
    return response.json()
    .then(function(data) {
      console.log(data);
    })
  });
}

window.onload = function() {
  getWeather("toronto");
}