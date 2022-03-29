import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Statistic from '../components/Statistic';
import ProfileMenu from '../components/ProfileMenu';
import UserProfilePict from '../components/UserProfilePict';
import { Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';

function Profile() {
    const {userid} = useParams();
    
    const token = useSelector((state) => state.data.datas.token)
    const userToken = token === "" ? "" : jwt_decode(token);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [games, setGames] = useState({});
    const [id, setId] = useState("");
    const [friend, setFriend] = useState(false);

    useEffect( () => {
        axios.post('https://mgl-be.herokuapp.com/getUserById', {id : userid})
        .then( res => {
            // console.log(res.data)
            if (res.data === "") {
                alert("no user with such id")
                navigate('/');
            }
            setUser(res.data);
        })

        axios.post("https://mgl-be.herokuapp.com/getUserByEmail", { email: userToken.email })
        .then(res => {
            setId(res.data.id);

            res.data.followings.map(u => {
                if (u == userid) setFriend(true);
            })
        })

        axios.post("https://mgl-be.herokuapp.com/getGamesById", { id: userid })
        .then((res) => {
            // console.log(res.data)
            setGames(res.data);
            setLoading(false);
        })
    }, [])

    function addFriend() {
        axios.post("https://mgl-be.herokuapp.com/addFriend", { follower: id, following: userid });
        setFriend(true);
    }

    function removeFriend() {
        axios.post("https://mgl-be.herokuapp.com/deleteFriend", { follower: id, following: userid });
        setFriend(false);
    }

    return (
        <React.Fragment>
            <Navbar />
            {loading ? (
                <div className='container'>
                    Loading...    
                </div>
            ) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                            <UserProfilePict user={user} />
                            <Statistic user={user} />
                            <br></br>
                            <div className='row'>
                                <div className='col-5'>
                                    <Button className='btn btn-primary' href={`/yourList/${userid}`}>Game List</Button>
                                </div>
                                <div className='col-1'></div>
                                <div className='col-5'>
                                    {user.email === userToken.email && token !== "" ? (
                                        <Button className='btn btn-warning' href={`/editProfile/${userid}`}>Edit Profile</Button>
                                    ) : ( friend ? (<Button className='btn btn-danger' onClick={removeFriend}>Remove Friend</Button>) :
                                        (<Button className='btn btn-success' onClick={addFriend}>Add Friend</Button>))}
                                </div>
                            </div>
                        </div>
                        <div className='col-9'>
                            <ProfileMenu games={games} user={user} />
                        </div>
                    </div>
                </div>
            )}
            
        </React.Fragment>
    );
    
}

export default Profile;