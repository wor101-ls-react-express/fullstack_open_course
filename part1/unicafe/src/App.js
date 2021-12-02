import React, {useState} from 'react'

const Header = ({title}) => <h1>{title}</h1>
const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>
const Statistic = ({title, value}) => (
  <tr>
    <td>{title}</td><td>{value}</td>
  </tr>
  )
const Statistics = ({good, neutral, bad, all}) => {
  if (all <= 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic title="good" value={good}/>
        <Statistic title="neutral" value={neutral}/>
        <Statistic title="bad" value={bad}/>
        <Statistic title="all" value={good + neutral + bad}/>
        <Statistic title="average" value={(good - bad) / all}/>
        <Statistic title="positive" value={good / all}/>
      </tbody>
    </table>
  )
} 

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad

  return (
    <div>
      <Header title="give feedback"/>
      <Button clickHandler={() => setGood(good + 1)} text="good"/>
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button clickHandler={() => setBad(bad + 1)} text="bad"/>
      <Header title="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  );
}

export default App;
