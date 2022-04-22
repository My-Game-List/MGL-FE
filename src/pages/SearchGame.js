import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchedGame from '../components/SearchedGame';
import SearchUser from '../components/SearchUser';

function OneGame(props) {
    const {name} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState();
    const [loadGame, setLoadGame] = useState(['a']);
    const [load, setLoad] = useState(10);

    useEffect(() => {
        // console.log(id);

        axios.get(`https://mgl-be.herokuapp.com/search/game/${name}`)
        .then((res) => {
            // console.log(res.data);
            setIsLoading(true);
            setGame(res.data);
            setLoadGame(res.data.slice(0, 10))
            setIsLoading(false);
        })
    }, [name]);

    function loadMoreGame() {
        // console.log(game.slice(load, load+10))
        setLoadGame(loadGame.concat(game.slice(load, load + 10)))
        // console.log(loadGame);
        setLoad(load + 10)
    }

    return (
        isLoading ? (
            <React.Fragment>
                <NavBar/>
                <div>
                    Loading...
                </div>
            </React.Fragment>
        ) : (
            <div className='bg-gray-400 text-white'>
                <NavBar/>
                <SearchedGame game={game} loadGame={loadGame} loadMoreGame={loadMoreGame} />
                <SearchUser name={name} />
            </div>
        )
    );
    
}

export default OneGame;