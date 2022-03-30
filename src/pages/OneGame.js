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
                <div className='container'>
                    Loading...
                </div>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <NavBar/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-2'>
                            <div className='row' id='left'>
                                <ImageAndTitle game={game} />
                            </div>
                            <hr></hr>
                            <div className='row' id='left'>
                                <GameDetail game={game} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='row'>
                                <GameStats game={game} />
                            </div>
                            <div className='row'>
                                <UserStatus id={id} game={game} user={user} />
                            </div>
                            <div className='row'>
                                <GameDesc game={game} />
                            </div>
                        </div>
                        <div className='col-4'>
                            <GameTrailer game={game} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-2'>
                            
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    );
    
}

export default OneGame;