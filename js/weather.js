var weatherReq = new XMLHttpRequest();
weatherReq.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${openWeatherApiKey}&units=metric`);
weatherReq.responseType = 'json';

const weatherIconsDict = {
  "01d":"☀️" ,
  "02d":"⛅️" ,
  "03d":"☁️" ,
  "04d":"☁️" ,
  "09d":"\uD83C\uDF27" ,
  "10d":"\uD83C\uDF26" ,
  "11d":"⛈" ,
  "13d":"❄️" ,
  "50d":"\uD83C\uDF2B" ,
  "01n":"\uD83C\uDF11" ,
  "02n":"\uD83C\uDF11 ☁" ,
  "03n":"☁️" ,
  "04n":"️️☁☁" ,
  "09n":"\uD83C\uDF27" ,
  "10n":"☔️" ,
  "11n":"⛈" ,
  "13n":"❄️" ,
  "50n":"\uD83C\uDF2B"
}

weatherReq.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    weatherDOM = document.getElementsByClassName('weather')[0];

    temp = Math.round(this.response.main.feels_like);

    tempElement = document.createElement('p');
    tempElement.innerHTML = "🌡️ " + temp + "°C";

    weatherDesc = this.response.weather[0].description
    weatherIcon = weatherIconsDict[this.response.weather[0].icon]
    weatherElement = document.createElement('p');
    weatherElement.innerHTML = weatherIcon + " " + weatherDesc;

    weatherDOM.appendChild(weatherElement);
    weatherDOM.appendChild(tempElement);
  }
}

weatherReq.send(null);
