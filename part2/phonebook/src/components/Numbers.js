import React from 'react'


const Number = ( { person, onDelete }) => <li>{person.name} @ {person.number} <button onClick={onDelete(person)}>delete</button></li>

const Numbers = ( { persons, onDelete }) => {
  console.log(onDelete)
  return persons.map(person => <Number key={person.id} person={person} onDelete={onDelete}/>)
}

export default Numbers