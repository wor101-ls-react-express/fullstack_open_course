import axios from 'axios'

const getAll = () => {
  const request = axios.get('http://localhost:3001/persons')
  return request.then(response => response.data)
}

const addPerson = (person) => {
  const request = axios.post('http://localhost:3001/persons', person)
  return request.then(response => response.data)
}

const deletePerson = (person) => {
  const request = axios.delete(`http://localhost:3001/persons/${person.id}`)
  return request.then(response => response.data)
}

const updateNumber = (person) => {
  const request = axios.put(`http://localhost:3001/persons/${person.id}`, person)
  return request.then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updateNumber}
