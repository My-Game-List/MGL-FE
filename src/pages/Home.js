import React, { useEffect, useState } from 'react';
import Statistic from '../components/Statistic';
import TopConsole from '../components/TopConsole';
import TopAllTime from '../components/TopAllTime';
import Newest from '../components/Newest';
import Upcoming from '../components/Upcoming';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import NavBar from '../components/NavBar';
import axios from 'axios';

function Home() {
    const token = useSelector((state) => state.data.datas.token)
    const user = token === "" ? "" : jwt_decode(token);

    const [User, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        axios.post("https://mgl-be.herokuapp.com/getUserByEmail", { email: user.email })
        .then(res => {
            setUser(res.data);
            setIsLoading(false);
        })
    }, [])

    return (
        <div>
            isLoading ? (
                <div>
                    <NavBar />
                    Loading...
                </div>
            ) : (
                <div className='bg-gray-800 text-white'>
                    <div className="mx-4">
                        <div className='lg:mx-28'>
                            {user.email !== undefined ? <Statistic user={User}/> : null} 
                        </div>
                        <div className='lg:mx-28'>
                            <TopConsole />
                        </div>
                        <div className='lg:mx-28'>
                            <TopAllTime />
                        </div>
                        <div className='lg:mx-28'>
                            <Newest />
                        </div>
                        <div className='lg:mx-28'>
                            <Upcoming />
                        </div>
                    </div>
                </div>
            )
        </div>
    );
}

export default Home;