const Button = () => {

    const handleClick = () => {
        console.log("Button clicked");
        alert("Button clicked")
    }

    return (
        <div>
            <button onClick={handleClick} style={{color: "red", backgroundColor: "grey"}}>Click me</button>
        </div>
    );
}

export default Button;