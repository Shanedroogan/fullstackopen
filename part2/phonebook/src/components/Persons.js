import React from 'react'

const Person = ({ name, num, deletePerson }) => (
    <div>
        <p>{name} {num}</p>
        <button onClick={deletePerson}>delete</button>
    </div>
)

const Persons = ({ personsToShow, deletePerson }) => (
    <div>
        {personsToShow.map(person =>
            <Person 
              key={person.id} 
              name={person.name} 
              num={person.number}
              deletePerson={() => deletePerson(person)} />)}
    </div>
)

export default Persons