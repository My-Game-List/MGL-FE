import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base from '../asset/rickroll-roll.gif';

function SearchUser(props) {

    const [user, setUser] = useState([]);
    const [loadUser, setLoadUser] = useState([]);
    const [load, setLoad] = useState(10);

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
            <div className='container'>
                {user.length === 0 ? (
                    <div className='container'>
                        <h1>No User Found</h1>
                    </div>
                ) : loadUser.map((u, id) => 
                        (<a href={`../profile/${u.id}`} key={id} id='searchGame'>
                        <div key={id} className='row' id='searchOne'>
                            <div className='col-1'>
                                <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                            </div>
                            <div className='col-1'>
                                {console.log(u)}
                                {u.imgURL === "" || u.imgURL === undefined ? (
                                    <img src={base} className='profileIMGSmaller rounded-circle'></img>
                                ) : (
                                    <img src={u.imgURL} className="profileIMGSmaller rounded-circle"></img>
                                )}
                            </div>
                            <div className='col-9 '>
                                <br/>
                                {u.username}
                            </div>
                        </div>
                    </a>
                    )
                )}
                
                <div className='row'>
                    {loadUser.length === user.length && user.length !== 0 ? (<h3>No More User To Load</h3>) : (
                    user.length !== 0 ? 
                    (<button className='btn btn-primary' onClick={loadMoreUser}>Load More...</button>) : 
                    ("")
                    )}
                </div>
                <div className='row'><br/><br/><br/></div>
            </div>
        </React.Fragment>
    );
}

export default SearchUser;