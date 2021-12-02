// const Hello = () => {
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }

function Hello(props) {
  return (
    <div>
      <p>Hello {props.name} is {props.age} years old</p>
    </div>
  )
}

function App() {
  const name = "Jerry"
  const age = "60"


  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" age={20 + 36}/>
      <Hello name="Elaine" age="55"/>
      <Hello name={name} age={age}/>
      <Hello name="Kramer"/>
    </div>
  );
}

export default App;
