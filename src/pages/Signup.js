import axios from "axios";
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ADD_USER } from "../redux/sliceData";
import NavBar from "../components/NavBar";

function LoginForm() {
    const [details, setDetails] = useState({ username: "", email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const submitHandler = e => {
        e.preventDefault();

        axios.post('http://localhost:5000/signup', details)
        .then(res => {
            axios.post('http://localhost:5000/loadUser');
            
            navigate("/login");
        })
        .catch(err => setError(true));
    }

    return (
        <div className="bg-gray-800 text-white">
            <NavBar/>
            <div>
                <form onSubmit={submitHandler} className="mx-4 grid grid-cols-6 lg:grid-cols-12">
                    <div className="col-span-6 lg:col-span-12 lg:mx-32">
                        {error ? (<p className="bg-red-400 hover:bg-red-500 rounded-md p-5" onClick={() => setError(false)} dismissible >
                            Email or Username Already Exist..
                            Click This box to close
                        </p>) : null}
                    </div>
                    <div className="col-span-6 lg:col-span-12 lg:mx-32">
                        <h2>Sign up</h2>
                    </div>
                    <div className="col-span-2 lg:col-span-2 lg:mx-32">
                        <label htmlFor="email">Email: </label>
                    </div>
                    <div className="col-span-4 lg:col-span-6 lg:mx-32">
                        <input className="text-black lg:w-80 outline m-1 outline-offset-2 outline-blue-800" type='email' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                    </div>

                    <div className="col-span-2 lg:col-span-2 lg:row-start-4 lg:mx-32">
                        <label htmlFor="email">Username: </label>
                    </div>
                    <div className="col-span-4 lg:col-span-6 lg:mx-32">
                        <input className="text-black lg:w-80 outline m-1 outline-offset-2 outline-yellow-800" type='username' name='username' id='username' onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
                    </div>

                    <div className="col-span-2 lg:col-span-2 lg:row-start-5 lg:mx-32">
                        <label htmlFor="password">Password: </label>
                    </div>
                    <div className="col-span-4 lg:col-span-6 lg:mx-32">
                        <input className="text-black lg:w-80 outline m-1 outline-offset-2 outline-green-800" type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                    </div>

                    <div className="col-span-6 lg:col-span-12 lg:ml-64">
                        <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-28' type='submit'> Submit </button>
                    </div>

                    <div className="col-span-6 lg:col-span-12 lg:ml-64 mt-4">
                        <p>Already Have an Account? <a onClick={()=>navigate('/login')}><span className="text-cyan-400 hover:text-cyan-500 cursor-pointer">&laquo; Back to Login</span></a></p>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default LoginForm;