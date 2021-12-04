import React, { useState, useEffect } from 'react'
import Persons from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import services from './services/persons'

const Alert = ({ alertMessage }) => {
  const alertStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,

  }


  if (alertMessage) {
    return (
      <div style={alertStyle}>
        {alertMessage}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }

}

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

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
                .catch(error => {
                  setAlertMessage(`${newName} was already deleted`)
                  setTimeout(() => {
                    setAlertMessage(null)
                  }, 3000)
                })
      }

    } else {
      services.addPerson({name: newName, number: newNumber})
              .then(newPerson => {
                console.log(newPerson)
                setPersons(persons.concat(newPerson))
                setNewNumber('')
                setNewName('')
                setAlertMessage(`Added ${newPerson.name}`)
                setTimeout(() => {
                  setAlertMessage(null)
                }, 3000)
              }) 
    }
  }

  const handleDelete = (personToDelete) => {
    return () => {
      services.deletePerson(personToDelete)
        .then(response => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
        .catch(error => {
          setAlertMessage(`${personToDelete.name} was already deleted`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 3000)
        })
    }
  }

  const filterNames = () => {
    return persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert alertMessage={alertMessage} />
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
