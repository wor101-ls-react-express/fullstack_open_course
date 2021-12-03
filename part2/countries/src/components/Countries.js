import React from 'react'



const Country = ({ country, onSearchChange}) => {
  
  const handleShowClick = (event) => {
    console.log(country)
    console.log(onSearchChange)
    onSearchChange(country.name.common)
  }

  return <li>{country.name.common} <button value={country.name.common} onClick={handleShowClick}>show</button></li>
}


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
            return <Country key={country.ccn3} country={country} onSearchChange={onSearchChange}/>
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

export default Countries

