import React from 'react'

function ProductCard(props) {

  const onAddToCard = (name) => {
    alert('Add to cart successfully, item name: ' + props.name + ', price: riel' + props.price )
  };

  return (
    <div>
        <div style={{backgroundColor: 'grey', width: '300px', textAlign: 'center', borderTopRightRadius: '5px'}}>
            <div>Product Information</div>
            <hr style={{border: '1px solid blue'}} />
            <div>
              <p style={{fontSize: '20px'}}>Product name: <span style={{fontSize: '10px'}}>{props.name}</span></p>
            </div>
            <div>
              Product price: {props.price}
            </div>
            <div>
              <button onClick={onAddToCard}>Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard