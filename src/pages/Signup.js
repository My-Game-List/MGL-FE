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

        axios.post('https://mgl-be.herokuapp.com/signup', details)
        .then(res => {
            axios.post('https://mgl-be.herokuapp.com/loadUser');
            
            navigate("/login");
        })
        .catch(err => setError(true));
    }

    return (
        <React.Fragment>
            <NavBar/>
            <div className="container">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <div className="row">

                            <h2>Signup</h2>
                            {error ? (<Alert variant="danger" onClose={() => setError(false)} dismissible >
                                <p>Email or Username Already Exist..</p>
                            </Alert>) : ("")}
                            <div className="col-1">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="username">Username: </label>
                                    </div>
                                </div>
                                {/* <br></br> */}
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email: </label>
                                    </div>
                                </div>
                                {/* <br></br> */}
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="password">password: </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-8">
                            <div className="row">
                                    <div className="form-group">
                                        <input type='username' name='username' id='username' required onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
                                    </div>
                                </div>
                                {/* <br></br> */}
                                <div className="row">
                                    <div className="form-group">
                                        <input type='email' name='email' id='email' required onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                                    </div>
                                </div>
                                {/* <br></br> */}
                                <div className="row">
                                    <div className="form-group">
                                        <input type='password' name='password' id='password' required onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                                    </div>
                                </div>
                                <br></br>
                                
                                <Button type='submit' variant="primary"> Submit </Button>
                                <br></br>
                                <br></br>
                                <p>Already Have an Account? <a href="/login" id="searchGame">&laquo; Back to Login</a></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}

export default LoginForm;