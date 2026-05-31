import React, { useState } from 'react'

function ConditionalRendering() {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <>
            {isVisible && <p>Now You can see me!</p>}
            <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
        </>
    )
}

export default ConditionalRendering