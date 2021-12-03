import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

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
