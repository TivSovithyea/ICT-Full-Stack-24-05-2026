import React, { useState } from 'react'
import './Counter.css'

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => prevCount - 1);
    const reset = () => setCount(0);
  return (
    <div className="counter-container">
      <h2>Counter App</h2>
      <div className="display">
        <h1>{count}</h1>
      </div>

      <div className="button-group">
        <button onClick={decrement} className="btn decrement">
          Decrement (-)
        </button>
        <button onClick={reset} className="btn reset">
          Reset
        </button>
        <button onClick={increment} className="btn increment">
          Increment (+)
        </button>
      </div>
    </div>
  )
}

export default Counter