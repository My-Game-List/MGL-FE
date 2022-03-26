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
        
        axios.post('https://mgl-be.herokuapp.com/loadUser');

        // console.log(details)
        axios.post('https://mgl-be.herokuapp.com/login', details)
        .then(res => {
            console.log(res.data)
            setError(false);
            dispatch(ADD_USER({token: res.data}));
            navigate("/");
        })
        .catch(err => { setError(true) })
        // Login(details);
    }

    return (
        <React.Fragment>
            <NavBar/>
            <div className="container">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <div className="row">

                            <h2>Login</h2>
                            {error ? (<Alert variant="danger" onClose={() => setError(false)} dismissible >
                                <p>Email or Password Error, Please try again..</p>
                            </Alert>) : ("")}
                            <div className="col-1">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email: </label>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="password">password: </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-8">
                                <div className="row">
                                    <div className="form-group">
                                        <input type='email' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="form-group">
                                        <input type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                                    </div>
                                </div>
                                <br></br>
                                
                                <Button type='submit' variant="primary"> Login </Button>
                                <br></br>
                                <br></br>
                                <p>Don't Have an Account?</p>
                                <Button type='button' variant="warning" href="/signup"> Sign Up </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}

export default LoginForm;