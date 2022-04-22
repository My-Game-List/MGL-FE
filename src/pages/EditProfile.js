import React, { useEffect, useState } from 'react';
import UserEditImg from '../components/UserEditImg';
import Navbar from '../components/NavBar';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import base from '../asset/rickroll-roll.gif'
import jwt_decode from 'jwt-decode';

function EditProfile() {    
    const {userid} = useParams();
    const [user, setUser] = useState({});
    const [pict, setPict] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const token = useSelector((state) => state.data.datas.token)
    const userToken = token === "" ? "" : jwt_decode(token);

    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:5000/getUserById", { id: userid })
        .then(res => {
            // console.log(res.data);
            if (res.data.email !== userToken.email) {
                navigate('/');
            } else {
                setUser(res.data);
                setIsLoading(false);
            }
        })
    }, [])

    function changeFile(e) {
        // console.log(e);

        const reader = new FileReader();
        const url = reader.readAsDataURL(e);

        reader.onload = function (event) {
            setPict([reader.result]);
        }.bind(this);
    }

    return (
        isLoading ? (
            <div className=''>
                loading...
            </div>
        ) : (
            <div className='bg-gray-800 text-white'>
                <Navbar />
                <div className='grid grid-cols-1'>
                    <div className='col-span-1 mx-14'>
                        <center>
                            {user.imgURL !== "" ? (
                                pict === "" ? (
                                    <img alt="" src={user.imgURL} className="h-44 w-44 lg:w-56 lg:h-56 border rounded-full object-scale-down"></img>
                                ) : (
                                    <img alt="" src={pict} className="h-44 w-44 lg:w-56 lg:h-56 rounded-full object-scale-down"></img>
                                )
                            ) : (<img alt="" src={base} className="h-44 w-44 lg:w-56 lg:h-56 rounded-full object-scale-down"></img>)}
                        </center>
                        <div className='mt-4'>
                            <UserEditImg file={changeFile} />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
    
}

export default EditProfile;