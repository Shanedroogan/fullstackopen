import React from 'react'


const Filter = (props) => (
    <div>
      <p>filter: <input value={props.filter} onChange={props.onChange} /></p>
    </div>
  )


export default Filter;