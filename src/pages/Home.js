import React from 'react';
import Statistic from '../components/Statistic';
import TopConsole from '../components/TopConsole';
import TopAllTime from '../components/TopAllTime';
import Newest from '../components/Newest';
import Upcoming from '../components/Upcoming';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import NavBar from '../components/NavBar';

function Home() {
    const token = useSelector((state) => state.data.datas.token)
    const user = token === "" ? "" : jwt_decode(token);

    return (
        <React.Fragment>
            <NavBar />
            <div className='container'>
            {user.email !== undefined ? <Statistic user={user}/> : ""} 
            <div className='row'>
                <div className='col'>
                    <TopConsole />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <TopAllTime />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Newest />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Upcoming />
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Home;