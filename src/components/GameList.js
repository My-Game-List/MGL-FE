import React from "react";
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Star from "../asset/Star.png";

function GameList(props) {
    return (
        <div>
            <Tabs className="mx-4 lg:mx-12 text-sm lg:text-lg" aria-label="basic tabs example">
                <TabList>
                    <Tab>Completed</Tab>
                    <Tab>Playing</Tab>
                    <Tab>Plan To Play</Tab>
                </TabList>

                <TabPanel>
                    {props.games.completed.length !== 0 ? (
                        props.games.completed.map((g, id) => 
                        (<a href={`../OneGame/${g.id}`} key={id} >
                            <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border' >
                                <div className='col-span-1'>
                                    <p className="text-blue-500">{id+1}.</p>
                                </div>
                                <div className='col-span-1'>
                                    <img src={g.cover.url} />
                                </div>
                                <div className='col-span-6 mx-3 lg:mx-0'>
                                    <div className="row">
                                        <p className="text-blue-500">{g.name}</p>
                                    </div>
                                </div>
                                <div className="col-span-3 grid grid-rows-2 grid-cols-1 place-items-center">
                                    <img alt="" className="h-4 lg:h-7 col-span-1" src={Star} />
                                    <p className="text-blue-500 col-span-1">{g.rate === "" ? ("--") : (g.rate)}</p>
                                </div>
                            </div>
                        </a>
                        ))) : <p>You Don't Have a Completed Game</p>
                    }
                </TabPanel>
                <TabPanel>
                    {props.games.playing.length !== 0 ? (
                    props.games.playing.map((g, id) => 
                        (<a href={`../OneGame/${g.id}`} key={id}>
                            <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border' >
                                <div className='col-span-1'>
                                    <p className="text-blue-500">{id+1}.</p>
                                </div>
                                <div className='col-span-1'>
                                    <img src={g.cover.url} />
                                </div>
                                <div className='col-span-6 mx-3 lg:mx-0'>
                                    <div className="row">
                                        <p className="text-blue-500">{g.name}</p>
                                    </div>
                                </div>
                                <div className="col-span-3 grid grid-rows-2 grid-cols-1 place-items-center">
                                    <img alt="" className="h-4 lg:h-7 col-span-1" src={Star} />
                                    <p className="text-blue-500 col-span-1">{g.rate === "" ? ("--") : (g.rate)}</p>
                                </div>
                            </div>
                        </a>
                    ))) : <p>You Don't Have a Playing Game</p> }
                </TabPanel>
                <TabPanel>
                    {props.games.plan.length !== 0 ? (
                    props.games.plan.map((g, id) => 
                        (<a href={`../OneGame/${g.id}`} key={id}>
                            <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border' >
                                <div className='col-span-1'>
                                    <p className="text-blue-500">{id+1}.</p>
                                </div>
                                <div className='col-span-1'>
                                    <img src={g.cover.url} />
                                </div>
                                <div className='col-span-6 mx-3 lg:mx-0'>
                                    <div className="row">
                                        <p className="text-blue-500">{g.name}</p>
                                    </div>
                                </div>
                                <div className="col-span-3 grid grid-rows-2 grid-cols-1 place-items-center">
                                    <img alt="" className="h-4 lg:h-7 col-span-1" src={Star} />
                                    <p className="text-blue-500 col-span-1">{g.rate === "" ? ("--") : (g.rate)}</p>
                                </div>
                            </div>
                        </a>
                    ))) : <p>You Don't Have a Plan Game</p> }
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default GameList;
