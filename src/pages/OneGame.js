import React from 'react';
import ImageAndTitle from '../components/ImageAndTitle';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GameDesc from '../components/GameDesc';
import GameTrailer from '../components/GameTrailer';
import GameStats from '../components/GameStats';
import GameDetail from '../components/GameDetail';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import UserStatus from '../components/UserStatus';
import Screenshot from '../components/Screenshot';

function OneGame() {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState({});
   
    let token = useSelector((state) => state.data.datas.token);
    let user = token === "" ? "" : jwt_decode(token);

    useEffect(() => {
        axios.get(`https://mgl-be.herokuapp.com/game/${id}`)
        .then((res) => {
            setGame(res.data);
            setIsLoading(false);
            // console.log(res.data);
        })
    }, []);

    return (
        isLoading ? (
            <React.Fragment>
                <NavBar/>
                <div>
                    Loading...
                </div>
            </React.Fragment>
        ) : (
            <div className='bg-gray-800 text-white'>
                <NavBar/>
                <div className='mx-4 grid gap-5 grid-cols-1 place-content-center lg:grid-cols-12'>
                    <div className='col-span-1 lg:col-span-3'>
                        <ImageAndTitle game={game} />
                        <hr></hr>
                        <GameDetail game={game} />
                    </div>

                    <div className='col-span-1 lg:col-span-6'>
                        <div>
                            <GameStats game={game} />
                        </div>
                        <div>
                            <UserStatus id={id} game={game} user={user} />
                        </div>
                        <div>
                            <GameDesc game={game} />
                        </div>
                        <div className='p-4 bg-black'>
                            <Screenshot game={game} />
                        </div>
                    </div>
                    <div className='col-span-1 lg:col-span-3'>
                        <GameTrailer game={game} />
                    </div>
                </div>
            </div>
        )
    );
    
}

export default OneGame;