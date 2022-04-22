import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import base from '../asset/rickroll-roll.gif';

function SearchUser(props) {

    const [user, setUser] = useState([]);
    const [loadUser, setLoadUser] = useState([]);
    const [load, setLoad] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://mgl-be.herokuapp.com/search/user/${props.name}`)
        .then(res => {
            setUser(res.data);
            setLoadUser(res.data.slice(0, 10));
        })
    }, [])

    function loadMoreUser() {
        setLoadUser(loadUser.concat(user.slice(load, load + 10)))
        setLoad(load + 10);
    }

    return (
        <React.Fragment>
            <div className='overflow-x-auto text-lg'>
            <table className='table mx-14'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {user.length === 0 ? (
                        <div>
                            <h1>No User Found</h1>
                        </div>
                    ) : loadUser.map((u, id) => (
                            <tr key={id}>
                                <td className='w-5'>
                                    <a onClick={()=>navigate(`../profile/${u.id}`)} >{id+1}.</a>
                                </td>
                                <td className='w-40'>
                                    <a onClick={()=>navigate(`../profile/${u.id}`)}>
                                        {u.imgURL === "" || u.imgURL === undefined ? (
                                            <img alt='' className='object-scale-down bg-black rounded-full h-20 w-20' src={base} ></img>
                                        ) : (
                                            <img alt='' className='object-scale-down bg-black rounded-full h-20 w-20' src={u.imgURL}></img>
                                        )}
                                    </a>
                                </td>
                                <td className='w-55'>
                                    <a onClick={()=>navigate(`../profile/${u.id}`)}>
                                        {u.username}
                                    </a>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </React.Fragment>
    );
}

export default SearchUser;