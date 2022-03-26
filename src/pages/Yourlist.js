import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import NavBar from "../components/NavBar";

function Yourlist() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const {userid} = useParams();
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.post("https://mgl-be.herokuapp.com/getUserById", { id: userid })
        .then(res => {
            // console.log(res.data)
            setUser(res.data);
        })

        axios.post("https://mgl-be.herokuapp.com/getGamesById", { id: userid })
        .then((res) => {
            // console.log(res.data)
            setGames(res.data);
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
                <div>
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="Completed">
                        {games.completed.length !== 0 ? (
                            games.completed.map((g, id) => 
                            (<a href={`../OneGame/${g.id}`} key={id} id='searchGame'>
                            <div key={id} className='row' id='searchOne'>
                                <div className='col-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-1'>
                                    <img src={g.cover.url} />
                                </div>
                                <div className='col-6'>
                                    <div className="row">
                                        <p>{g.name}</p>
                                    </div>
                                    <div className="row">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            </a>
                        ))) : <p>You Don't Have a Completed Game</p>
                        }
                    </Tab>
                    <Tab eventKey="play" title="Playing">
                        {games.playing.length !== 0 ? (
                        games.playing.map((g, id) => 
                            (<a href={`../OneGame/${g.id}`} key={id} id='searchGame'>
                            <div key={id} className='row' id='searchOne'>
                                <div className='col-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-1'>
                                    <img src={g.cover.url} />
                                </div>
                                <div className='col-9 '>
                                    <p>{g.name}</p>
                                </div>
                            </div>
                            </a>
                        ))) : <p>You Don't Have a Playing Game</p> }
                    </Tab>
                    <Tab eventKey="plan" title="Plan To Play">
                        {games.plan.length !== 0 ? (
                        games.plan.map((g, id) => 
                            (<a href={`../OneGame/${g.id}`} key={id} id='searchGame'>
                            <div key={id} className='row' id='searchOne'>
                                <div className='col-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-1'>
                                    <img src={g.cover.url} />
                                </div>
                                <div className='col-9 '>
                                    <p>{g.name}</p>
                                </div>
                            </div>
                            </a>
                        ))) : <p>You Don't Have a Plan Game</p> }
                    </Tab>
                    </Tabs>
                    
                </div>
            </React.Fragment>
        )
    );
}

export default Yourlist;