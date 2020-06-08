import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageClass, setMessageClass ] = useState('')
  
  useEffect(() =>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])
  


  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const showNotification = (messageContent, classSetting) => {
    setMessageClass(classSetting)
    setMessage(
      messageContent
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const deletePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    const id = person.id
    if (result) {
    personService
    .deletePerson(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== id))

      showNotification(`Successfully deleted ${person.name} from the server.`, 'success')
    })
    } else {
      showNotification('Deletion aborted.', 'failure')
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }
    if (persons.every((person) => person.name !== newName)) {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          showNotification(`Successfully added ${personObject.name}.`, 'success')

          setNewName('')
          setNewPhone('')
        })
    } else {
      const result = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)

      if (result) {
        const person = persons.find(p => p.name === personObject.name)
        const changedPerson = {...person, number: personObject.number}

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== personObject.name ? person : returnedPerson))
            showNotification(`Successfully added ${personObject.name}.`, 'success')
          })
          .catch(error => {
            showNotification(`Information of ${personObject.name} was already removed from the server`, 'error')
            setPersons(persons.filter(person => person.name !== personObject.name))
          })

      } else {
        console.log('update phone number cancelled')
      }
    }
    
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  //console.log('personsToShow:', personsToShow)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass={messageClass} />
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm 
          onSubmit={addName} 
          newName={newName} 
          newPhone={newPhone} 
          handleNameChange={handleNameChange} 
          handlePhoneChange={handlePhoneChange} 
      />
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App