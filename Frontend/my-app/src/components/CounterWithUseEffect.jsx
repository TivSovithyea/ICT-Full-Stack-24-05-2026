import React, { useEffect, useState } from 'react'

function CounterWithUseEffect() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((c) => c + 1)
        }, 1000);

        return () => clearInterval(interval);
    }, []);

  return (
        <>
            <h1>{count}</h1>
        </>
  )
}

export default CounterWithUseEffect