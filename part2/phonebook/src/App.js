import React, { useState, useEffect } from 'react'
import Persons from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import services from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    services.getAll()
      .then(allPersons => {
        console.log('promise fulfilled')
        setPersons(allPersons)
        console.log(allPersons)
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
    let existingPerson = persons.find(person => person.name === newName)
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} already exists. Do you want to update their number?`)) {
        services.updateNumber({...existingPerson, number: newNumber})
                .then(updatedPerson => {
                  console.log('update fulfilled')
                  console.log(updatedPerson)
                  setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
                })
      }

    } else {
      services.addPerson({name: newName, number: newNumber})
              .then(newPerson => {
                console.log(newPerson)
                setPersons(persons.concat(newPerson))
                setNewNumber('')
                setNewName('')
              }) 
    }
  }

  const handleDelete = (personToDelete) => {
    return () => {
      services.deletePerson(personToDelete)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
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
        <Persons persons={filterNames()} onDelete={handleDelete}/>
      </ul>
    </div>
  );
}

export default App;
