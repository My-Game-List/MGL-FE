import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

function UserEditImg(props) {
    const navigate = useNavigate();
    const [file, setFile] = useState();

    const [load, setLoad] = useState(false);

    let token = useSelector((state) => state.data.datas.token);
    let user = token === "" ? "" : jwt_decode(token);

    useEffect(() => {
        if (token === "") {
            navigate('/');
        }
    })

    function changeHandler(e) {
        props.file(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    function submitHandler(e) {
        e.preventDefault();

        if (file === undefined) {
            return;
        }

        const cek = window.confirm("If you save your profile, the previous data will be replace, Are you sure?")
        
        if (!cek) {
            return;
        }

        const formData = new FormData();
        // console.log(file);
        formData.append('file', file);
        formData.append('email', user.email);
        
        setLoad(true);

        axios.post("http://localhost:5000/updateUser", formData)
        .then(res => {
            window.location.reload();
        })
    }

    return (
        <React.Fragment>
            <div className='grid grid-cols-1 place-content-center text-center'>
                <div className='col-span-1'>
                    <input type="file" accept="image/png, image/gif, image/jpeg" onChange={changeHandler} />
                </div>
                <div className='col-span-1'>
                    <Button className="btn btn-success" type='submit' onClick={submitHandler}>Save</Button>
                </div>
            </div>
            <div className='grid grid-cols-1 place-content-center text-center'>
                {load ? (<p>Uploading! Please Wait...</p>) : null}
            </div>
        </React.Fragment>
    );
    
}

export default UserEditImg;