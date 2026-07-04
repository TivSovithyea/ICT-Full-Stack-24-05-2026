import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {

    const { productId } = useParams();

    return (
        <div>ProductDetail: {productId}</div>
    )
}

export default ProductDetail