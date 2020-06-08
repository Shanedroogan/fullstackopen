import React from 'react'

const PersonForm = (props) => (
  <div>
    <form onSubmit={props.onSubmit}>
    <div>
          name: <input 
                  value={props.newName}
                  onChange={props.handleNameChange}
                />
        </div>
        <div>
        phone number: <input 
                  value={props.newPhone}
                  onChange={props.handlePhoneChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  </div>
)

export default PersonForm