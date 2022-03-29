import React, { useEffect, useState } from 'react';
import UserHeader from '../components/UserEditImg';
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
        axios.post("https://mgl-be.herokuapp.com/getUserById", { id: userid })
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
            <div className='container'>
                loading...
            </div>
        ) : (
            <React.Fragment>
                <Navbar />
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'></div>
                        <div className='col-6'>
                            <center>
                                {user.imgURL !== "" ? (
                                    pict === "" ? (<img src={user.imgURL} className="profileIMG rounded-circle"></img>) :
                                    (<img src={pict} className="profileIMG rounded-circle"></img>)
                                ) : (<img src={base}></img>)}
                                <div className='row'>
                                    <div className='col'>
                                        <UserHeader file={changeFile} />
                                    </div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    );
    
}

export default EditProfile;