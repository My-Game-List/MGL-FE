import axios from "axios";
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ADD_USER } from "../redux/sliceData";
import NavBar from "../components/NavBar";

function LoginForm() {
    const [details, setDetails] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        
        axios.post('http://localhost:5000/loadUser');

        // console.log(details)
        axios.post('http://localhost:5000/login', details)
        .then(res => {
            // console.log(res.data)
            setError(false);
            dispatch(ADD_USER({token: res.data}));
            navigate("/");
        })
        .catch(err => { setError(true) })
        // Login(details);
    }

    return (
        <div className="bg-gray-800 text-white">
            <NavBar/>
            <div>
                <form onSubmit={submitHandler} className="mx-4 grid grid-cols-6 lg:grid-cols-12">
                    <div className="col-span-6 lg:col-span-12 lg:mx-32">
                        {error ? (<p className="bg-red-400 hover:bg-red-500 rounded-md p-5" onClick={() => setError(false)} dismissible >
                            Email or Password Error, Please try again..
                            Click This box to close
                        </p>) : null}
                    </div>
                    <div className="col-span-6 lg:col-span-12 lg:mx-32">
                        <h2>Login</h2>
                    </div>
                    <div className="col-span-2 lg:col-span-2 lg:mx-32">
                        <label htmlFor="email">Email: </label>
                    </div>
                    <div className="col-span-4 lg:col-span-6 lg:mx-32">
                        <input className="text-black lg:w-80 outline m-1 outline-offset-2 outline-blue-800" type='email' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                    </div>

                    <div className="col-span-2 lg:col-span-2 lg:row-start-4 lg:mx-32">
                        <label htmlFor="password">password: </label>
                    </div>
                    <div className="col-span-4 lg:col-span-6 lg:mx-32">
                        <input className="text-black lg:w-80 outline m-1 outline-offset-2 outline-green-800" type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                    </div>

                    <div className="col-span-6 lg:col-span-12 lg:ml-64">
                        <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-28' type='submit'> Login </button>
                    </div>
                    <div className="col-start-3 text-sm col-span-3 mt-4 lg:col-span-12 lg:ml-96 lg:text-lg">
                        Don't Have an Account?
                    </div>
                    <div className="col-span-6 lg:col-span-12 lg:ml-64">
                        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-28 mr-4' onClick={()=>navigate('/signup')}> Sign Up </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginForm;