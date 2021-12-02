import React, { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({anecdote, votes}) => {
  if (votes) {
    return (
      <>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </>
    )
  }
  return (
    <>
    <p>{anecdote}</p>
    <p>Vote if you like this anecdote</p>
  </>
  )
};


function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [mostPopular, setMostPopular] = useState(0)

  const selectRandomAnecdote = () => setSelected(Math.floor(Math.random() * (anecdotes.length - 1)))
  const updateVotes = () => {
    let newVotes = {...votes}
    newVotes[selected] ? newVotes[selected] += 1 : newVotes[selected] = 1;
    console.log(newVotes)
    setVotes(newVotes)
  }
  const selectMostPopularAnecdote = () => setMostPopular(mostVotes());

  const mostVotes = () => {
    let currentMax = 0;
    let votesKey = 0;
    Object.keys(votes).forEach(key => {
      if (votes[key] > currentMax) {
        votesKey = key;
      }
    })
    return votesKey;
  }

  return (
    <div>
      <Header title="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={selectRandomAnecdote} text="next anecdote"/>
      <Button handleClick={updateVotes} text="vote"/>
      <br/>
      <Header title="Anecdote with most votes"/>
      <Anecdote anecdote={anecdotes[mostPopular]} votes={votes[selected]}/>
    </div>
  );
}

export default App;
