import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleAddClick = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: (persons.length + 1) }))
      setNewNumber('')
      setNewName('')
    }
  }

  const filterNames = () => {
    return persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        nameValue={newName} 
        nameOnChange={handleNameChange} 
        numberValue={newNumber} 
        numberOnChange={handleNumberChange} 
        onClick={handleAddClick}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filterNames()}/>
      </ul>
    </div>
  );
}

export default App;
