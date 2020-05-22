import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = (props) => (
  <tr>
    <td>{props.label}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  let all = good + neutral + bad
  let avg = (good - bad)/all
  let pct_pos = (good/all * 100).toString().concat(' %')

  return (
    <table><tbody>
      <Statistic label="good" value={good} />
      <Statistic label="neutral" value={neutral} />
      <Statistic label="bad" value={bad} />
      <Statistic label="all" value={all} />
      <Statistic label="average" value={avg} />
      <Statistic label="positive" value={pct_pos} />
    </tbody></table>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (fun, val) => () => {
    fun(val + 1)
    console.log(val)
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <div className='row'>
        <Button onClick={handleClick(setGood,good)} text='good' />
        <Button onClick={handleClick(setNeutral,neutral)} text='neutral' />
        <Button onClick={handleClick(setBad,bad)} text='bad' />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)