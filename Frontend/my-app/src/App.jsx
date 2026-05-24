import Greeting from './components/Greeting.jsx'

function App() {
  return (
    <div>
        <h1>Hello World</h1>
        <h2>My name is John</h2>
        <Greeting name="dara" age="20"/>
        <Greeting name="Sokly" age="15"/>
        <Greeting name="Kunthea" age="18"/>
        <Greeting/>
    </div>
  )
}

export default App
