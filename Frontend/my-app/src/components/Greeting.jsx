function Greeting(props) {
    return (
        <div>
            <h2>Hello, {props.name ? props.name : 'Guest'}, Age: {props.age ? props.age : 'N/A'} years old</h2>
            {/* <h3></h3> */}
        </div>
    )
}

export default Greeting