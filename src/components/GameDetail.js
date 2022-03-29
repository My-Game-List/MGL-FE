import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GameDetail(props) {

    const [genre, setGenre] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://mgl-be.herokuapp.com/genre/${props.game.genres}`)
        .then(res => {
            setGenre(res.data);
            setIsLoading(false);
        })
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <h4 align='center'>Information</h4>

                <div className='col'>
                    <p>Genre : </p>
                    {genre === '---' ? "---" : genre.join(', ')}
                </div>
            </div>
        </div>
    );
}

export default GameDetail;