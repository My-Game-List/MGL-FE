import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { REMOVE_USER } from '../redux/sliceData';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
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
        axios.post("http://localhost:5000/getUserByEmail", { email: user.email })
        .then(res => {
            setUser(res.data)
        })
    }, [User])

    // console.log(user)
    function handlerSubmit(event) {
        event.preventDefault();
        // console.log(search);
        navigate(`/search/${search.search}`);
    }

    function handlerChange(event) {
        setSearch({search: event.target.value});
    }

    function logOutHander() {
        axios.post('http://localhost:5000/logout')
        setUser('');
        dispatch(REMOVE_USER());
    }

    return (
        <React.Fragment>
            <div className='sticky top-0 z-10 navbar shadow-md shadow-green-700 bg-blue-800 mb-3'>
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <label tabIndex="0" className="btn bg-transparent border-none hover:bg-transparent lg:invisible swap swap-rotate">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content text-base-300 mt-3 p-2 shadow rounded-box w-52 bg-yellow-300">
                            <li>
                                <Link to={'/'} style={{textDecoration: 'none'}}>
                                    <a style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 text-blue-400 font-semibold'>Home</a>
                                </Link>
                            </li>
                            <li>
                                {user ? (
                                    <Link to={`/yourList/${User.id}`} style={{textDecoration: 'none'}}>
                                        <a className='hover:bg-primary-focus hover:bg-opacity-40 text-blue-400 font-semibold' style={{textDecoration: "none"}}>YourList</a>
                                    </Link>
                                ) : (
                                    <Link to={'/login'} style={{textDecoration: 'none'}}>
                                        <button className='text-blue-400'>Login</button>
                                    </Link>
                                )}
                            </li>
                            <hr/>
                            <li tabIndex="0">
                                <a>
                                    More
                                </a>
                                <ul className="p-2 bg-green-300">
                                    <Link to={`/profile/${User.id}`} style={{textDecoration: 'none'}}>
                                        <li>
                                            {user ? (
                                                <button style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 text-blue-400 font-semibold'>Profile</button>
                                            ) : (
                                                <button style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 text-blue-400 opacity-30 font-semibold' disabled>Profile</button>
                                            )}
                                        </li>
                                    </Link>
                                    <Link to={`#action4`} style={{textDecoration: 'none'}}>
                                        <li>
                                            <a style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 text-blue-400 font-semibold'>Friends</a>
                                        </li>
                                    </Link>
                                    <hr/>
                                    <li>
                                        {user ? (
                                            <button style={{textDecoration: 'none'}} onClick={logOutHander} className='hover:bg-primary-focus hover:bg-opacity-40 font-medium text-red-500'>Log Out</button>
                                        ) : (
                                            <button style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 font-medium text-gray-500 opacity-25' disabled>Log Out</button>
                                        )}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <label className="btn bg-transparent border-none hover:bg-transparent lg:flex hidden swap swap-rotate">
                        <Link to={'/'} style={{textDecoration: 'none'}}>
                            <h3 className='hover:text-white'>MGL</h3>
                        </Link>
                    </label>
                    <div className='lg:hidden justify-center ml-auto'>
                        <ul className="menu menu-horizontal p-0 my-0 text-md font-semibold">
                            <li className='bg-white rounded mt-1 mb-0 h-8'>
                                <input className='h-7 mt-0 w-28 text-black' type="text" onChange={handlerChange}></input>
                            </li>
                            <li>
                                <button className='hover:bg-yellow-400 mt-0.5 border-2 h-8 bg-green-700 hover:bg-opacity-75 rounded text-white' onClick={handlerSubmit}>Search</button>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:flex hidden justify-center ml-auto">
                        <ul className="menu menu-horizontal p-0 my-0 text-base font-semibold">
                            <li className='hover:bg-yellow-400 hover:bg-opacity-75 rounded'>
                                <Link to={`/`} style={{textDecoration: 'none'}}>
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li className='hover:bg-yellow-400 hover:bg-opacity-75 rounded'>
                                {user ? (
                                    <Link to={`/yourList/${User.id}`} style={{textDecoration: 'none'}}>
                                        <a>YourList</a>
                                    </Link>
                                ) : (
                                    <Link to={'/login'} style={{textDecoration: 'none'}}>
                                        Login
                                    </Link>
                                )}
                            </li>
                            <li tabIndex="0">
                                <a className='text-white hover:bg-yellow-400 hover:bg-opacity-75 rounded' style={{textDecoration: 'none'}}>
                                    More
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                                </a>
                                <ul className="p-2 bg-base-content">
                                    <Link to={`/profile/${User.id}`} style={{textDecoration: 'none'}}>
                                        <li>
                                            {user ? (
                                                <button style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 text-white font-semibold'>Profile</button>
                                            ) : (
                                                <button style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 text-white-400 opacity-30 font-semibold' disabled>Profile</button>
                                            )}                                        
                                        </li>
                                    </Link>
                                    <Link to={`#action4`} style={{textDecoration: 'none'}}>
                                        <li>
                                            <a style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 font-medium'>Friends</a>
                                        </li>
                                    </Link>
                                    <hr/>
                                    <li>
                                        {user ? (
                                            <button style={{textDecoration: 'none'}} onClick={logOutHander} className='hover:bg-primary-focus hover:bg-opacity-40 font-medium text-red-500'>Log Out</button>
                                        ) : (
                                            <button style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 font-medium text-gray-500 opacity-25' disabled>Log Out</button>
                                        )}
                                    </li>
                                </ul>
                            </li>
                            <li className='bg-white rounded mt-2 mb-0 h-10'>
                                <input className='h-8 mt-0 text-black' type="text" onChange={handlerChange}></input>
                            </li>
                            <li>
                                <button className='hover:bg-yellow-400 mt-0.5 border-2 h-10 bg-green-700 hover:bg-opacity-75 rounded text-white' onClick={handlerSubmit}>Search</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='lg:flex hidden justify-center ml-auto hover:bg-yellow-400 hover:bg-opacity-75 rounded cursor-pointer' onClick={user ? ()=>navigate(`/profile/${User.id}`) : ()=>navigate('/login')}>
                    <ul className="menu menu-horizontal p-0 my-0 text-md font-semibold">
                        <li>
                            {user && User.imgURL !== "" ? (
                                <img className='h-12 w-12 object-scale-down m-0 p-0 bg-white rounded-full' alt="me" src={User.imgURL} />
                            ) : (
                                <img className='h-12 w-12 object-scale-down m-0 p-0 bg-white rounded-full' alt="me" src={base} />
                            )}
                        </li>
                    </ul>
                    {user ? (
                        <a style={{textDecoration: 'none'}} className='text-xl font-bold text-white mx-4'>{User.username}</a>
                    ) : (
                        <a style={{textDecoration: 'none'}} className='hover:bg-primary-focus hover:bg-opacity-40 font-bold text-white mx-4'>Login to MGL</a>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavBar;