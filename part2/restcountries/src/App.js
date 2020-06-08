import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} onClick={handleFilterChange} />
    </div>
  );
}

export default App;
