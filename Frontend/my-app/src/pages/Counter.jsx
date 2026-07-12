import React, { useState } from 'react'
import '../components/Counter.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, resetData } from '../store/counterSlice';

function Counter() {
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h2>Counter App</h2>
      <div className="display">
        <h1>{count.value}</h1>
      </div>

      <div className="button-group">
        <button onClick={() => dispatch(decrement())} className="btn decrement">
          Decrement (-)
        </button>
        <button onClick={() => dispatch(resetData())} className="btn reset">
          Reset
        </button>
        <button onClick={() => dispatch(increment()) } className="btn increment">
          Increment (+)
        </button>
      </div>
    </div>
  )
}

export default Counter