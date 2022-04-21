import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import GameList from "../components/GameList";

function Yourlist() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const {userid} = useParams();
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:5000/getGamesById", { id: userid })
        .then((res) => {
            // console.log(res.data)
            if (res.data === "no user") {
                alert("no user with such id")
                navigate('/');
            }
            setGames(res.data);
            setIsLoading(false);
        })
    }, []);

    return (
        isLoading ? (
            <React.Fragment>
                <NavBar/>
                <div className=''>
                    Loading...
                </div>
            </React.Fragment>
        ) : (
            <div className="bg-gray-800 text-white">
                <NavBar/>
                <GameList games={games} />
            </div>
        )
    );
}

export default Yourlist;