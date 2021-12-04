import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import Countries from './components/Countries'

const API_KEY = process.env.REACT_APP_API_KEY

const Language = ({ language }) => {
  return <li>{language}</li>
}

const CountryDetails = ({ country, weather }) => {

  console.log("Weather: ", weather)

  if (weather.main) {
    let iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <Language key={language} language={language}/>)}
        </ul>
        <img src={country.flags.png} alt="flag"/>
        <h2>Weather in {country.name.common}</h2>
        <p><b>temperature: </b>{weather.main.temp}</p>
        <img src={iconURL} alt="weather"/>
        <p><b>wind:</b> {weather.wind.speed} mph direction {weather.wind.deg}</p>
      </div>
      )
  }
  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map(language => <Language key={language} language={language}/>)}
    </ul>
    <img src={country.flags.png} alt="flag"/>
  </div>
  )
}

const Countries = ({ countries, onSearchChange, weather }) => {
  const updateSearch = (event) => {
    onSearchChange(event.target.value)
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
        <div>Matches: {countries.length}</div>
      </div>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <>
        <ul>
          {countries.map(country => {
            return <li key={country.ccn3}>{country.name.common} <button value={country.name.common} onClick={updateSearch}>show</button></li>
          })}
        </ul>
        <div>Matches: {countries.length}</div>
      </>
      )
  } else if (countries.length === 1) {
    let country = countries[0]
    return (
      <CountryDetails country={country} weather={weather}/>
    )

  } else {
    return (
      <div>
        No results
        <div>Matches: {countries.length}</div>
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountries, setSelected] = useState({})
  const [weather, setWeather] = useState({})

  const updateSearch = (event) => {
    setSearch(event.target.value)
  }

  // const filterCountries = () => {
  //   let filteredCountries = countries.filter(country => country.name.common.startsWith(search))
  //   return filteredCountries
  // }

  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  const searchHook = () => {
    let currentCountries = countries.filter(country => country.name.common.startsWith(search))
    setSelected(currentCountries)
  }

  const weatherHook = () => {
    if (selectedCountries.length === 1) {
      let capital = selectedCountries[0].capital[0]
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
      .then(response => {
        console.log('weather promise fulfilled')
        setWeather(response.data)
      })
    }
  }


  useEffect(searchHook, [search, countries])


  useEffect(countriesHook, [])
  
  useEffect(weatherHook, [selectedCountries])
 

  return (
    <div>
      <div>
        find countries <input value={search} onChange={updateSearch}/>
      </div>
      <Countries countries={selectedCountries} onSearchChange={setSearch} weather={weather}/>
    </div>
  );
}

//key={filterCountries().ccn3}

export default App;
