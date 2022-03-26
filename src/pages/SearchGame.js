import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function OneGame(props) {
    const {name} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState();

    useEffect(() => {
        // console.log(id);

        axios.get(`https://mgl-be.herokuapp.com/search/${name}`)
        .then((res) => {
            // console.log(res.data);
            setGame(res.data);
            setIsLoading(false);
        })
    }, []);

    return (
        isLoading ? (
            <div className='container'>
                Loading...
            </div>
        ) : (
            <React.Fragment>
                <NavBar/>
                <div className='container'>
                    {game === '' ? (
                        <div className='container'>
                            <h1>No Such Game Found</h1>
                        </div>
                    ) : game.map((g, id) => 
                        g.cover !== undefined ? ( 
                            (<a href={`../OneGame/${g.id}`} key={id} id='searchGame'>
                            <div key={id} className='row' id='searchOne'>
                                <div className='col-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-1'>
                                    {g.cover === undefined ? <p>No Image Found</p> : <img src={g.cover.url} />}
                                </div>
                                <div className='col-9 '>
                                    <br/>
                                    {g.name}
                                </div>
                            </div>
                        </a>
                        )) : ("")
                    )}
                </div>
            </React.Fragment>
        )
    );
    
}

export default OneGame;