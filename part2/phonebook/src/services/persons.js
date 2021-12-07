import axios from 'axios'

const getAll = () => {
  const request = axios.get('/api/persons')
  return request.then(response => response.data)
}

const addPerson = (person) => {
  const request = axios.post('/api/persons', person)
  return request.then(response => response.data)
}

const deletePerson = (person) => {
  const request = axios.delete(`/api/persons/${person.id}`)
  return request.then(response => response.data)
}

const updateNumber = (person) => {
  const request = axios.put(`/api/persons/${person.id}`, person)
  return request.then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updateNumber}
