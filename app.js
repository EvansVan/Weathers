if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope)
    })
    .catch((error) => {
      // registration failed
      console.log('Registration failed with ' + error)
    })
}
let city = ''
let url = ''
const key = '5d94098c18ec2931455dcb1cb6771279'

const weatherArray = JSON.parse(localStorage.getItem('weatherdata')) || []

document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded')
  getWeather(weatherArray)
  console.table(weatherArray)
})

window.onload = function () {
  submit = document.querySelector('#submit')
  weather = document.querySelector('#weather')

  submit.addEventListener('click', function () {
    console.log('submit clicked')
    city = document.getElementById('city').value
    url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=' +
      key
    console.log(city)
    $.getJSON(url, function (data) {
      weatherArray.unshift(data)
      localStorage.setItem('weatherdata', JSON.stringify(weatherArray))
    })
    getWeather(weatherArray)
  })
}

// function to display/populate the page
const getWeather = (arr) => {
  let mappedArr = arr.map((data) => {
    return `<div class= "col-12 col-md-6 col-lg-4 py-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title" id="name">${data.name}</h5>
                  <p class="card-text">Temp:<span id="temp">${data.main.temp}</p>
                  <p class="card-text">Description:<span id="temp">${data.weather[0].description}</p>
                  <p class="card-text">Temp:<span id="temp">${data.weather[0].icon}</p>
                </div>
              </div>
            </div>`
  })
  mappedArr = mappedArr.join('')
  weather.innerHTML = mappedArr
}
