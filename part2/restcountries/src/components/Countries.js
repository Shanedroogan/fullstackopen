import React from 'react'
import Weather from './Weather'

const CountryListItem = ({name, onClick}) => {
    return(
    <div>
        <p style={{display:'inline-block', margin:'0'}}>{name}</p>
        <button onClick={onClick} value={name}>show</button>
    </div>
    )
}

const CountryDetail = ({ country }) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul>
                {country.languages.map(lang =>
                    <li key={lang.name} >{lang.name}</li> )}
            </ul>
            <img src={country.flag} alt='Country flag' style={{height:'150px', width:'250px'}} />
        </div>
    )
}


const Countries = ({ countries, onClick }) => {
    // console.log(countries)
    
    if (countries.length > 10) {
        return (
            <div>
                <p>There's too many results! Be more specific.</p>
            </div>
        )
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map(country =>
            <CountryListItem key={country.name} name={country.name} onClick={onClick} /> )}
            </div>
        )
    } else if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <CountryDetail country = {country} />
                <Weather country={country} />
            </div>
        )
    }
    else {
        return (
            <div>
                <p>No matches found, please try again.</p>
            </div>
        )
    }
}

export default Countries