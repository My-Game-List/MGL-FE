import React, { useEffect, useState } from "react";
import { Tab, Tabs } from 'react-bootstrap';
import Star from "../asset/Star.png";
import base from "../asset/rickroll-roll.gif";
import axios from "axios";

function ProfileMenu(props) {
    let nyehehe = 1;

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
    }, [])

    return (
        <React.Fragment>
            <Tabs defaultActiveKey="Relevant" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Relevant" title="Relevant Games">
                {props.games.completed.length !== 0 ? (
                    props.games.completed.slice(0,3).map((g, id) => 
                    (<a href={`../OneGame/${g.id}`} key={id} id='myList'>
                    <div key={id} className='row' id='searchOne'>
                        <div className='col-1'>
                            <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{nyehehe++}.</p>
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
                ))) : ("")
                }
                {props.games.playing.length !== 0 ? (
                    props.games.playing.slice(0,1).map((g, id) => 
                    (<a href={`../OneGame/${g.id}`} key={id} id='myList'>
                    <div key={id} className='row' id='searchOne'>
                        <div className='col-1'>
                            <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{nyehehe++}</p>
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
                ))) : ""
                }
                {props.games.plan.length !== 0 ? (
                    props.games.plan.slice(0,1).map((g, id) => 
                    (<a href={`../OneGame/${g.id}`} key={id} id='myList'>
                    <div key={id} className='row' id='searchOne'>
                        <div className='col-1'>
                            <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{nyehehe++}.</p>
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
                ))) : ""
                }
            </Tab>
            <Tab eventKey="followings" title="Followings">
                {followings.length !== 0 ? (
                    followings.map((u, id) => 
                        (<a href={`../profile/${u.id}`} key={id} id='myList'>
                            <div key={id} className='row' id='searchOne'>
                                <div className='col-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-2'>
                                    {u.imgURL === "" || u.imgURL === undefined ? (
                                        <img src={base} className="profileIMGSmaller rounded-circle" />
                                    ) : (
                                        <img src={u.imgURL} className="profileIMGSmaller rounded-circle" />
                                    )}
                                </div>
                                <div className='col-6'>
                                    <div className="row">
                                        <p>{u.username}</p>
                                    </div>
                                </div>
                            </div>
                        </a>)
                    )) : <p>This Account Not Following Anyone</p>
                }
            </Tab>
            <Tab eventKey="follower" title="Followers">
            {followers.length !== 0 ? (
                    followers.map((u, id) => 
                        (<a href={`../profile/${u.id}`} key={id} id='myList'>
                            <div key={id} className='row' id='searchOne'>
                                <div className='col-1'>
                                    <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                                </div>
                                <div className='col-2'>
                                    {u.imgURL === "" || u.imgURL === undefined ? (
                                        <img src={base} className="profileIMGSmaller rounded-circle" />
                                    ) : (
                                        <img src={u.imgURL} className="profileIMGSmaller rounded-circle" />
                                    )}
                                </div>
                                <div className='col-6'>
                                    <div className="row">
                                        <p>{u.username}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))) : <p>This Account Don't Have Followers</p>
                }
            </Tab>
            </Tabs>
        </React.Fragment>
    )
}

export default ProfileMenu;
