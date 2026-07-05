import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ListUser() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setfilterUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setfilterUsers(data.users);
            })
    }, []);

    useEffect(() => {
        // console.log(search);
        if (search !== '') {
            setfilterUsers(users.filter(user => {
                return user.firstName.toLowerCase().includes(search.toLowerCase());
            }));
        } else {
            setfilterUsers(users);
        }
    }, [search]);

    const onViewDetail = (id) => {
        navigate(`/users/${id}`);
    };

    return (
        <div>
            <div style={{marginBottom: "5px"}}>
                <input
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table border={1} style={{width: '100%'}}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>List Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterUsers.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.age}</td>
                                <td style={{textAlign: "center"}}>
                                    <button onClick={() => onViewDetail(user.id)}>View</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListUser