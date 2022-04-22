import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Star from "../asset/Star.png";
import base from "../asset/rickroll-roll.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileMenu(props) {
    let nyehehe = 1;

    const navigate = useNavigate();

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        props.user.followings.map(u => {
            axios.post('https://mgl-be.herokuapp.com/getUserById', { id: u })
            .then(res => {
                setFollowings(followings => [...followings, res.data]);
            })
        })

        props.user.followers.map(u => {
            axios.post('https://mgl-be.herokuapp.com/getUserById', { id: u })
            .then(res => {
                setFollowers(followers => [...followers, res.data]);
            })
        })
    }, [props.user])

    return (
        <React.Fragment>
            <Tabs className="mx-4 lg:mx-12 text-sm lg:text-lg" aria-label="basic tabs example">
                <TabList>
                    <Tab>Relevant Games</Tab>
                    <Tab>Followings</Tab>
                    <Tab>Followers</Tab>
                </TabList>

                <TabPanel>
                {props.games.completed.length !== 0 ? (
                    props.games.completed.slice(0,3).map((g, id) => 
                    (<a onClick={()=>navigate(`../OneGame/${g.id}`)} key={id} >
                        <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border' >
                            <div className='col-span-1'>
                                <p className="text-blue-500">{nyehehe++}.</p>
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
                    ))) : ("")
                }
                {props.games.playing.length !== 0 ? (
                    props.games.playing.slice(0,1).map((g, id) => 
                    (<a onClick={()=>navigate(`../OneGame/${g.id}`)} key={id} >
                        <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border' >
                            <div className='col-span-1'>
                                <p className="text-blue-500">{nyehehe++}.</p>
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
                    ))) : ""
                }
                {props.games.plan.length !== 0 ? (
                    props.games.plan.slice(0,1).map((g, id) => 
                    (<a onClick={()=>navigate(`../OneGame/${g.id}`)} key={id} >
                        <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border' >
                            <div className='col-span-1'>
                                <p className="text-blue-500">{nyehehe++}.</p>
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
                    ))) : ""
                }
                {nyehehe === 1 ? "This Person Haven't Played Any Game" : null}
                </TabPanel>
                <TabPanel>
                    {followings.length !== 0 ? (
                        followings.map((u, id) => 
                            (<a onClick={()=>navigate(`../profile/${u.id}`)} key={id} id='myList'>
                                <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border'>
                                    <div className='col-span-3 lg:col-span-1'>
                                        <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                    </div>
                                    <div className='col-span-4 lg:col-span-2'>
                                        {u.imgURL === "" || u.imgURL === undefined ? (
                                            <img src={base} className="profileIMGSmaller rounded-circle" />
                                        ) : (
                                            <img src={u.imgURL} className="profileIMGSmaller rounded-circle" />
                                        )}
                                    </div>
                                    <div className='col-span-5 lg:col-span-9'>
                                        <p>{u.username}</p>
                                    </div>
                                </div>
                            </a>)
                        )) : <p>This Account Not Following Anyone</p>
                    }
                </TabPanel>
                <TabPanel>
                {followers.length !== 0 ? (
                    followers.map((u, id) => 
                        (<a onClick={()=>navigate(`../profile/${u.id}`)} key={id} id='myList'>
                            <div key={id} className='grid grid-flow-row grid-cols-12 place-items-center text-sm lg:text-lg border'>
                                <div className='col-span-3 lg:col-span-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-span-4 lg:col-span-2'>
                                    {u.imgURL === "" || u.imgURL === undefined ? (
                                        <img src={base} className="profileIMGSmaller rounded-circle" />
                                    ) : (
                                        <img src={u.imgURL} className="profileIMGSmaller rounded-circle" />
                                    )}
                                </div>
                                <div className='col-span-5 lg:col-span-9'>
                                    <p>{u.username}</p>
                                </div>
                            </div>
                        </a>
                    ))) : <p>This Account Don't Have Followers</p>
                }
                </TabPanel>
            </Tabs>
        </React.Fragment>
    )
}

export default ProfileMenu;
