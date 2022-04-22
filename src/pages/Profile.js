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
        setLoading(true);
        axios.post('http://localhost:5000/getUserById', {id : userid})
        .then( res => {
            // console.log(res.data)
            if (res.data === "") {
                alert("no user with such id")
                navigate('/');
            }
            setUser(res.data);
        })

        axios.post("http://localhost:5000/getUserByEmail", { email: userToken.email })
        .then(res => {
            setId(res.data.id);

            res.data.followings.map(u => {
                if (u == userid) setFriend(true);
            })
        })

        axios.post("http://localhost:5000/getGamesById", { id: userid })
        .then((res) => {
            // console.log(res.data)
            setGames(res.data);
            setLoading(false);
        })
    }, [userid])

    function addFriend() {
        axios.post("http://localhost:5000/addFriend", { follower: id, following: userid });
        setFriend(true);
    }

    function removeFriend() {
        axios.post("http://localhost:5000/deleteFriend", { follower: id, following: userid });
        setFriend(false);
    }

    return (
        <div className="bg-gray-800 text-white'">
            <Navbar />
            {loading ? (
                <div className='text-white'>
                    Loading...
                </div>
            ) : (
                <div className='mx-4 grid gap-5 grid-cols-1 grid-rows-1 place-content-center lg:grid-cols-12 bg-gray-800 text-white'>
                    <div className='col-span-1 lg:col-span-3'>
                        <UserProfilePict user={user} />
                        <div className='mx-4 lg:row-start-2'>
                            <Statistic user={user} />
                        </div>

                        <div className='lg:row-start-3'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 mr-4' onClick={()=>navigate(`/yourList/${userid}`)}>Game List</button>

                            {user.email === userToken.email && token !== "" ? (
                                <button className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded' onClick={()=>navigate(`/editProfile/${userid}`)}>Edit Profile</button>
                            ) : ( 
                                userToken === "" ? (
                                    <button className='bg-yellow-400 opacity-60 text-white font-bold py-2 px-4 rounded' disabled>Add Friend</button>
                                ) : (
                                    friend ? 
                                    (
                                        <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={removeFriend}>Remove Friend</button>
                                    ) : (
                                        <button className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded' onClick={addFriend}>Add Friend</button>
                                    )
                                )
                            )}
                        </div>
                    </div>
                    <div className='col-span-1 lg:col-span-9 row-span-1 mb-32'>
                        <ProfileMenu games={games} user={user} />
                    </div>
                </div>
            )}
            
        </div>
    );
    
}

export default Profile;