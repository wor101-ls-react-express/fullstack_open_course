import React, { useState } from 'react'
import Persons from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
