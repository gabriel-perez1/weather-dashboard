//api key
const apiKey = 'bd528a2ef708579c5c812bf729e6e8f1';
// deployed cors-anywhere package
const corsURL = "https://cors-anywhere-gabriel-perez1.herokuapp.com/";
const searchForm = document.querySelector('#citySearch');
const userInput = document.querySelector('#userInput');



searchForm.addEventListener('click', event =>{
  const cityName = userInput.value;
  getWeather(cityName);
  get5DWeather(cityName);
})


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
  var city = $("<h2 id='city'>").addClass("ml-auto mr-4 mt-1 mb-0").text(cityName).appendTo("#dayCard");
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var dateHumDiv = $("<div>").addClass("dateHum").appendTo("#dayCard");
  var uvDiv = $("<div>").addClass("uv").appendTo("#dayCard");
  var uvT = $("h4").text("UV index:").appendTo(".uv")
  var fullDate = $("<p id='date'>").addClass("ml-5 mb-0").text(month + "/" + day + "/" + year).appendTo(".dateHum");
  var tempC = data.main.temp - 273;
  var tempF = $("<h1 id='temp'>").addClass("ml-auto mr-4 large-font").text((Math.floor(tempC * (9/5) + 32) + "°")).appendTo("#dayCard");
  var hum = $("<p id='humidity'>").addClass("ml-5 mb-0").text("Humidity: " + data.main.humidity + "%").appendTo(".dateHum");
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
  console.log(dataUv);
  var UV = dataUv.current.uvi;
  console.log(UV);
}

async function get5DWeather (cityName) {
  // format openweather 5d api and fetch
  const api5DUrl = corsURL + "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
  const response5D = await fetch(api5DUrl);
  
  //variables with desired api info and card location
  const data5d = await response5D.json();
  console.log(data5d)
}



