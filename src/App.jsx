import { useEffect, useState } from 'react' 
import './App.css'
import axios from 'axios'

function App() {
  
  const [weather, setWeather] = useState({})
  const [isFahrenheit, setIsFahrenheit] = useState(false)
  

  useEffect(() => {
    
    function success(pos) {
      const crd = pos.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ac9f182e38a1d679e4008b05c42f457c`). then (res => setWeather(res.data))

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);

  }, [])

  console.log(weather);
  
  const tempKelvin = `${weather.main?.temp}`
  const tempFarenheit = Math.round((tempKelvin - 273.15) * 9 / 5 + 32)
  const tempCelsius = Math.round(tempKelvin - 273.15)

  const feelsLike = `${weather.main?.feels_like}`
  const feelsLikeFarenheit = Math.round((tempKelvin - 273.15) * 9 / 5 + 32)
  const feelsLikeCelsius = Math.round(tempKelvin - 273.15)

   const changeTemperature = () => {
   setIsFahrenheit(!isFahrenheit)
   

    
  }

  return (
    <div className="App" style={{
      backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/003/031/766/small/light-blue-wide-background-with-radial-blurred-gradient-abstract-free-vector.jpg)`,
    }}>
      <div className='card'>
        <h2>Weather App</h2>
        <h4>{weather.name} {weather.sys?.country}</h4>
        <div className='weather'>
          <div className='temperaturediv'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <li className='temperature'> <b>Temperature:</b> {isFahrenheit ? tempFarenheit : tempCelsius} {' '} {isFahrenheit ? '°F' : '°C'} </li>
          </div>
          <div className='pronosticdiv'>
            <ul>
              <li> 
                <i className="fa-solid fa-cloud"></i> <b>Clouds</b> {weather.clouds?.all}%
              </li>
              <li> <i className="fa-solid fa-sun"></i> <b>Feels like:</b> {isFahrenheit ? feelsLikeFarenheit : feelsLikeCelsius} {' '} {isFahrenheit ? '°F' : '°C'}</li>
              <li> <i className="fa-solid fa-cloud-showers-heavy"></i> <b>Humidity:</b> {weather.main?.humidity}%</li>
              <li> <i className="fa-solid fa-wind"></i> <b>Wind speed:</b> {weather.wind?.speed} m/s</li>
            </ul>
          </div>
        </div>
        <div className='button'>
        <button className='changeButton' onClick={changeTemperature}>°F/°C</button>
        </div>
      
      
        
      </div>
      
    </div>
  )
}

export default App
