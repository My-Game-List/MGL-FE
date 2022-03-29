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
    const [loadGame, setLoadGame] = useState([]);
    const [load, setLoad] = useState(10);

    useEffect(() => {
        // console.log(id);

        axios.get(`https://mgl-be.herokuapp.com/search/game/${name}`)
        .then((res) => {
            // console.log(res.data);
            setGame(res.data);
            setLoadGame(res.data.slice(0, 10))
            setIsLoading(false);
        })
    }, []);

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
                <div className='container'>
                    Loading...
                </div>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <NavBar/>
                <SearchedGame game={game} loadGame={loadGame} loadMoreGame={loadMoreGame} />
                <SearchUser name={name} />
            </React.Fragment>
        )
    );
    
}

export default OneGame;