import React from 'react'

function RenderList() {
  const items = ["Apple", "Banana", "Orange"];
  return (
    <div>
      <ul>
        {items.map((item, i) =>
          <li key={i}>{item} ({i})</li>
        )}
      </ul>
    </div>
  )
}

export default RenderList