import React, { useEffect, useState } from 'react'

function UseEffectWatch() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("This is notification from count new value : " + count);
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    )
}

export default UseEffectWatch