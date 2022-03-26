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

function OneGame() {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState({});
    const [status, setStatus] = useState('-- Add Game --');

    let token = useSelector((state) => state.data.datas.token);
    let user = token === "" ? "" : jwt_decode(token);

    useEffect(() => {
        axios.get(`https://mgl-be.herokuapp.com/game/${id}`)
        .then((res) => {
            setGame(res.data);
            setIsLoading(false);
            // console.log(res.data);
        })

        axios.post('https://mgl-be.herokuapp.com/getUserGames', { email: user.email })
        .then(res => {
            // console.log(res.data);
            const games = res.data.games;
            
            games.completed.map((g) => {
                if (g == id) setStatus('Completed');
            })

            games.playing.map((g) => {
                if (g == id) setStatus('Playing');
            })

            games.plan.map((g) => {
                if (g == id) setStatus('Plan to Play');
            })
        })
    }, []);

    function changeChooseHandler(e) {
        setStatus(e);
        
        axios.post('https://mgl-be.herokuapp.com/setGameStatus', { email: user.email, value: e, id })
    }

    return (
        isLoading ? (
            <div className='container'>
                Loading...
            </div>
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
                            <label htmlFor="country">
                            Status
                            <br></br>
                            <select value={status} onChange={(e) => changeChooseHandler(e.target.value)}>
                                {
                                ['-- Add Game --','Completed', 'Playing', 'Plan to Play'].map((a, id) => (
                                    <option key={id} value={a}>{a}</option>
                                ))
                                }
                            </select>
                            </label>
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