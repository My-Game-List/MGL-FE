import React from "react";
import { Tab, Tabs } from 'react-bootstrap';
import Star from "../asset/Star.png";

function GameList(props) {
    return (
        <React.Fragment>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Completed">
                {props.games.completed.length !== 0 ? (
                    props.games.completed.map((g, id) => 
                    (<a href={`../OneGame/${g.id}`} key={id} id='myList'>
                    <div key={id} className='row' id='searchOne'>
                        <div className='col-1'>
                            <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                        </div>
                        <div className='col-2'>
                            <img src={g.cover.url} />
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <p>{g.name}</p>
                            </div>
                            <div className="row">
                                <p><img src={Star}></img>{g.rate === "" ? ("--") : (g.rate)}</p>
                            </div>
                        </div>
                    </div>
                    </a>
                ))) : <p>You Don't Have a Completed Game</p>
                }
            </Tab>
            <Tab eventKey="play" title="Playing">
                {props.games.playing.length !== 0 ? (
                props.games.playing.map((g, id) => 
                    (<a href={`../OneGame/${g.id}`} key={id} id='myList'>
                    <div key={id} className='row' id='searchOne'>
                        <div className='col-1'>
                            <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                        </div>
                        <div className='col-2'>
                            <img src={g.cover.url} />
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <p>{g.name}</p>
                            </div>
                            <div className="row">
                                <p><img src={Star}></img>{g.rate === "" ? ("--") : (g.rate)}</p>
                            </div>
                        </div>
                    </div>
                    </a>
                ))) : <p>You Don't Have a Playing Game</p> }
            </Tab>
            <Tab eventKey="plan" title="Plan To Play">
                {props.games.plan.length !== 0 ? (
                props.games.plan.map((g, id) => 
                    (<a href={`../OneGame/${g.id}`} key={id} id='myList'>
                    <div key={id} className='row' id='searchOne'>
                        <div className='col-1'>
                            <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                        </div>
                        <div className='col-2'>
                            <img src={g.cover.url} />
                        </div>
                        <div className='col-6'>
                            <div className="row">
                                <p>{g.name}</p>
                            </div>
                            <div className="row">
                                <p><img src={Star}></img>{g.rate === "" ? ("--") : (g.rate)}</p>
                            </div>
                        </div>
                    </div>
                    </a>
                ))) : <p>You Don't Have a Plan Game</p> }
            </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default GameList;
