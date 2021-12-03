import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import Countries from './components/Countries'


const Language = ({ language }) => {
  return <li>{language}</li>
}

const CountryDetails = ({ country }) => {
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

const Countries = ({ countries, onSearchChange }) => {
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
      <CountryDetails country={country}/>
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

  const updateSearch = (event) => {
    setSearch(event.target.value)
  }

  const filterCountries = () => {
    return countries.filter(country => country.name.common.startsWith(search))
  }

  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(countriesHook, [])

  return (
    <div>
      <div>
        find countries <input value={search} onChange={updateSearch}/>
      </div>
      <Countries key={filterCountries().ccn3} countries={filterCountries()} onSearchChange={setSearch}/>
    </div>
  );
}

export default App;
