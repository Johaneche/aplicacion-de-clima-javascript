const urlBase= `https://api.openweathermap.org/data/2.5/weather`
const API_KEY= '981611edb974dbd357be0ecfceb3cf6b'  // Aqui va la API KEY generada desde la pag web openweathermap.com
const diffKelvin = 273.15  //Aqui va la diferencia entre los grados Kelvin vs Celcius

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city){
        // Llamar a la API para que nos de la informacion del clima
        fetchWeather(city)
    } else{
        alert('Ingrese una ciudad Válida!!!')
    }
})


function fetchWeather(city){
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(data => data.json())
    .then(data => showWeatherData(data))
}


function showWeatherData(data){
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = ''  //

    const cityName = data.name      //Nombre de la ciudad
    const countryName = data.sys.country    //nombre del pais
    const temp = data.main.temp     //Temperatura
    const humidity = data.main.humidity     //Humedad
    const description = data.weather[0].description     //Descripcion (puede que tenga varios climas y seleccionamos el primero con 0)
    const icon = data.weather[0].icon       //


    const cityInfo = document.createElement('h2')   //Creamos un h2
    cityInfo.textContent = `${cityName}, ${countryName}`     //Con la informacion de la ciudad y el pais

    const tempInfo = document.createElement('p')        //Creamos un parrafo para la Temperatura
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp-diffKelvin)}ºC`    //Hacemos la diferencia de grados Kelvin a Celcius

    const humidityInfo = document.createElement('p')    //Creamos uno parrafo para informar la humedad
    humidityInfo.textContent = `La humedad es del ${humidity}%` //

    const icoInfo = document.createElement('img')   //Creamos una imagen
    icoInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`    //Buscamos la URL que corresponda a la imagen

    const descriptionInfo = document.createElement('p')     //Agregamos un parrafo con la descripcion metereologica
    descriptionInfo.textContent = `La descripción meteorológica es ${description}`

    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(icoInfo)
    divResponseData.appendChild(descriptionInfo)
}