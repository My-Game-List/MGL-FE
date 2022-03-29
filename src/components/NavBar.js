import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { REMOVE_USER } from '../redux/sliceData';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import base from '../asset/rickroll-roll.gif';

function NavBar() {
    const navigate = useNavigate();

    // console.log(useSelector((state) => state.data.datas.token))
    const dispatch = useDispatch();
    const token = useSelector((state) => state.data.datas.token)
    const user = token === "" ? "" : jwt_decode(token);
    const [search, setSearch] = useState('');
    const [User, setUser] = useState('');

    useEffect(() => {
        axios.post("https://mgl-be.herokuapp.com/getUserByEmail", { email: user.email })
        .then(res => {
            setUser(res.data)
        })
    }, [])

    // console.log(user)
    function handlerSubmit(event) {
        event.preventDefault();
        // console.log(search);
        window.location.href = (`/search/${search.search}`);
    }

    function handlerChange(event) {
        setSearch({search: event.target.value});
    }

    function logOutHander() {
        axios.post('https://mgl-be.herokuapp.com/logout')
        dispatch(REMOVE_USER());
    }

    return (
        <React.Fragment>
            <Navbar bg="primary" variant='dark' expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="/">MGL</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#action2">Top Games</Nav.Link>
                    <Nav.Link href={user.email !== undefined ? (`/yourList/${User.id}`) : ("/login")}>{user.email !== undefined ? ("Your List") : ("Login")}</Nav.Link>
                    <NavDropdown title="Other" id="navbarScrollingDropdown">
                    <NavDropdown.Item href={`/profile/${User.id}`} disabled={user.email === undefined}>Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action4" disabled={user.email === undefined}>Friends</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {user.email !== undefined ? (
                        <NavDropdown.Item className="text-danger" onClick={logOutHander}>
                            Log Out
                        </NavDropdown.Item>
                        ) : (
                        <NavDropdown.Item disabled> Log Out </NavDropdown.Item> )
                    }
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                    Link
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href={`/profile/${User.id}`}>
                        <img width="27" height="27" className='rounded-circle' src={User.imgURL === "" || User.imgURL === undefined ? base : User.imgURL}></img>
                        {" " + User.username}
                    </Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={handlerSubmit}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handlerChange}
                    />
                    <Button id='button' variant="outline-success -warning" type='Submit'>Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </React.Fragment>
    );

}

export default NavBar;