// import Greeting from './components/Greeting.jsx'
import ConditionalRendering from './components/ConditionalRendering.jsx'
import FormInput from './components/FormInput.jsx'
import ProductCard from './components/ProductCard.jsx'
import TextInput from './components/TextInput.jsx'

function App() {
  return (
    <div>
        {/* <h1>Hello World</h1>
        <h2>My name is John</h2>
        <Greeting name="dara" age="20"/>
        <Greeting name="Sokly" age="15"/>
        <Greeting name="Kunthea" age="18"/>
        <Greeting/> */}
        <ProductCard name="Coca Cola" price={2000}/>
        <ConditionalRendering />
        <TextInput />
        <FormInput />
    </div>
  )
}

export default App
