import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ weather, setWeather ] = useState([])
    
  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: country.capital,
            units : 'imperial',
            mode  : 'json',
            appid : api_key
          }
      })
      .then(response => {
        setWeather([response.data])
      })
    }, [])
    
    if (weather.length === 1) {
        const capitalWeather = weather[0]
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p><strong>Temperature: </strong> {capitalWeather.main.temp} Fahrenheit</p>
                <p><strong>Description:</strong> {capitalWeather.weather[0].description} </p>
            </div>
        )
    } else { return (<div><p>Fetching the weather...</p></div>) }
}

export default Weather