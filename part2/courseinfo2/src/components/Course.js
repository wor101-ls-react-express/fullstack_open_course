import React from 'react'

function Header({ course }) {
  return (
    <h1>{course.name}</h1>
  )
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

function Content({ course }) {
  let parts = course.parts
  return parts.map(part => <Part key={part.id} part={part}/>);
}

function Total({ course }) {
  console.log(course)
  let total = course.parts.reduce((total, part) => total += part.exercises, 0)
  return (
    <p><b>Number of excercises {total}</b></p>  
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/> 
    </div>  
  )
}
// <Total course={course}/> 
export default Course