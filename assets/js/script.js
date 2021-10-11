let currentWeather;
let cityName;
//var lastCity = JSON.parse(localStorage.getItem());
const searchForm = document.querySelector('#citySearch');
const userInput = document.querySelector('#userInput');

searchForm.addEventListener('click', event =>{
  event.preventDefault();
  let cityName = userInput.value;
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
  console.log(data)
}