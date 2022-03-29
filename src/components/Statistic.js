import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Statistic(props) {
    const [user, setUser] = useState(props.user);
    const [game, setGame] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        axios.post("https://mgl-be.herokuapp.com/getUserByEmail", { email: user.email })
        .then(res => {
            setGame(res.data.games);
            setUsername(res.data.username);
            setIsLoading(false);
        })
    }, [])

    return (
        isLoading ? (
            <div className='container'>
                Loading...    
            </div>
        ) : (
            <div className="container">
                <div className='statsBar'>
                    <h3>My Statistics</h3>
                    {username}<br></br>
                    <hr color='black'></hr>
                    Played : {game.completed.length}<br></br>
                    Playing : {game.playing.length}<br></br>
                    Planned : {game.plan.length}
                </div>
            </div>
        )
    )
}


export default Statistic;