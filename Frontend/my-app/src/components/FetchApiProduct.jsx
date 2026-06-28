import React, {useState, useEffect} from 'react'

function FetchApiProduct() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }

    return (
        <ul>
            {products.map(p => <li key={p.id}>{p.title}</li>)}
        </ul>

    )
}

export default FetchApiProduct