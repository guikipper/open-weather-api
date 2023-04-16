const button = document.querySelector("#search")
const cityInput = document.querySelector("#city-input")
const api_key = "52daf5b68db39003aa08b231fd44f765"
//52daf5b68db39003aa08b231fd44f765
let data
const container = document.querySelector("#container")
const city_name = document.querySelector("#city-name")
const temperature = document.querySelector("#temperature")
const wind = document.querySelector("#wind")
const rain = document.querySelector("#rain")
const conditions = document.querySelector("#conditions")
const weather_icon = document.querySelector("#weather-icon")
const pressure = document.querySelector("#pressure")
const max = document.querySelector("#max")
const min = document.querySelector("#min")
const h3text = document.querySelector("#h3text")
const divWeatherData = document.getElementById("weather-data")
const loading = document.getElementById("loading")
const weather_data = document.querySelector("#weather-data")
const show_json = document.querySelector("#show-json")
const json_data_div = document.querySelector("#json-data")
const json_data_pre = document.querySelector("#json-data-pre")

const hide_weather_data = () => weather_data.style.display = "none"
const show_weather_data = () => weather_data.style.display = "flex"
const hide_loading = () => loading.style.display = "none"
const show_loading = () => loading.style.display = "flex"
const clear_input_value = () => cityInput.value = ""
const container_block = () => container.style.display = "block"
const container_none = () => container.style.display = "none"
const hide_json_button = () => show_json.style.display = "none"
const hide_json_div = () => json_data_div.style.display = "none"
const show_json_button = () => show_json.style.display = "flex"
const show_json_div = () => json_data_div.style.display = "flex"

hide_json_button()
hide_json_div()
hide_weather_data()
hide_loading()

const getData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}&lang=pt_br`
    const res = await fetch(url);
    data = await res.json();
    console.log(data)
    return data;
}

const showWeather = async(city) => {
    show_loading()
    container_none()
    const data = await getData(city)
    if (data.cod == "404") {
        hide_loading()
        hide_weather_data()
        clear_input_value()
        container_block()
        hide_json_button()
        h3text.innerHTML = "Não encontrado, verifique o nome."
        
    } else if (data.cod == "200"){
        hide_loading()
        show_weather_data()
        clear_input_value()
        container_block()
        show_json_button()
        city_name.innerHTML = data.name
        h3text.innerHTML = "Confira o clima de uma cidade."
        temperature.innerHTML = data.main.temp.toFixed(1)
        wind.innerHTML = data.wind.speed.toFixed(1)
        conditions.innerHTML = data.weather[0].description
        weather_icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        pressure.innerHTML = data.main.pressure.toFixed(1)
        max.innerHTML = data.main.temp_max.toFixed(1)
        min.innerHTML = data.main.temp_min.toFixed(1)
    } else if (data.value = "401") {
        hide_loading()
        clear_input_value()
        hide_weather_data()
        container_block()
        h3text.innerHTML = "Api Key inválida."
    }
}


button.addEventListener("click", (e) => {
    e.preventDefault()
    const city = cityInput.value
    if(city == null || city == "") {
        alert('Informe o nome da cidade!')
    } else {
        showWeather(city)
    }  
})

cityInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    const city = cityInput.value
    if(city == null || city == "") {
        alert('Informe o nome da cidade!')
    } else {
        showWeather(city)
    }  
    }
  })
  
  show_json.addEventListener("click", (e) => {
    if (json_data_div.style.display == "none") {
        show_json_div()
        const jsonString = JSON.stringify(data, null, 2);
        json_data_pre.innerHTML = jsonString;
    } else if (json_data_div.style.display == "flex") {
        hide_json_div()
    }
})