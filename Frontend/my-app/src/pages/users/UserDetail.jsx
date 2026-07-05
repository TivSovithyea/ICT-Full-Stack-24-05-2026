import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                console.log(data);
            })
    }, []);


    return (
        <div>
            <div>
                <NavLink to="/users">Go Back</NavLink>
            </div>
            <div>
                <div>
                    UserDetail
                </div>
                <hr></hr>
                <div>
                    First Name: {user.firstName}
                </div>
                <hr></hr>
                <div>
                    Last Name: {user.lastName}
                </div>
                <hr></hr>
                <div>
                    Age: {user.age}
                </div>
                <hr></hr>
                <div>
                    Gender: {user.gender}
                </div>
            </div>
        </div>
    )
}

export default UserDetail