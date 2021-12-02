import React from 'react'

function Header(props) {
  return (
    <h1>{props.course.name}</h1>
  )
}

function Part(props) {
  return (
    <p>
      {props.part} {props.excercise}
    </p>
  )
}

function Content(props) {
  let parts = props.course.parts
  return (
    <>
      <Part part={parts[0].name} excercise={parts[0].excercises}/>
      <Part part={parts[1].name} excercise={parts[1].excercises}/>
      <Part part={parts[2].name} excercise={parts[2].excercises}/>
    </>
  )
}

function Total(props) {
  let total = props.course.parts[0].excercises + props.course.parts[1].excercises + props.course.parts[2].excercises
  return (
    <p>Number of excercises {total}</p>  
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10,
      },
      {
        name: 'Using props to pass data',
        excercises: 7,
      },
      {
        name: 'State of a component',
        excercises: 14,
      }
    ]
  } 

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/> 
    </div>
  );
}

export default App;
