import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function OneGame(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('-- Add Game --');
    const [rating, setRating] = useState('-- Add Score --');

    const rate = ['-- Add Score --','1','2','3','4','5','6','7','8','9','10'];

    useEffect(() => {
        // console.log(props)
        axios.post('http://localhost:5000/getUserByEmail', { email: props.user.email })
        .then(res => {
            // console.log(res.data);
            if (res.data !== "") {
                const games = res.data.games;
            
                games.completed.map((g) => {
                    if (g.id == props.id) { setStatus('Completed'); setRating(g.rate); }
                })

                games.playing.map((g) => {
                    if (g.id == props.id) { setStatus('Playing'); setRating(g.rate); }
                })

                games.plan.map((g) => {
                    if (g.id == props.id) { setStatus('Plan to Play'); setRating(g.rate); }
                })
            }

            setIsLoading(false);
        })
    }, []);

    function ratingChangeHandler(e) {
        setRating(e);

        axios.post('http://localhost:5000/setGameRating', { email: props.user.email, value: e, id: props.id })
    }

    function statusChangeHandler(e) {
        let confirmed = true;
        if (rating !== '-- Add Score --' && e === "-- Add Game --") {
            confirmed = window.confirm("If you remove this game, your rating will be remove too. continue?")
            if (confirmed) {
                setRating(e);
            } else {
                return;
            }
        }
        setStatus(e);
        axios.post('http://localhost:5000/setGameStatus', { email: props.user.email, value: e, id: props.id })
    }

    return (
        isLoading ? (
            <div className=''>
                Loading...
            </div>
        ) : (
            <div className='mx-4'>
                <label htmlFor="status" className='mr-2'>
                    <div className='bg-cyan-500'>
                        Status
                    </div>
                    <div className='text-black outline m-1 rounded-sm outline-offset-2 outline-blue-500'>
                        {props.user === "" ? (
                            <select className='opacity-50' disabled value={status} onChange={(e) => statusChangeHandler(e.target.value)}>
                                {
                                ['-- Add Game --','Completed', 'Playing', 'Plan to Play'].map((a, id) => (
                                    <option key={id} value={a}>{a}</option>
                                ))
                                }
                            </select>
                        ) : (
                            <select value={status} onChange={(e) => statusChangeHandler(e.target.value)}>
                                {
                                ['-- Add Game --','Completed', 'Playing', 'Plan to Play'].map((a, id) => (
                                    <option key={id} value={a}>{a}</option>
                                ))
                                }
                            </select>)
                        }
                    </div>
                </label>
                
                <label htmlFor="rate" className=''>
                    <div className='bg-cyan-500'>
                        Your Rating
                    </div>
                    <div className='text-black outline m-1 rounded-sm outline-offset-2 outline-blue-500'>
                        {props.user === "" || status === "-- Add Game --" ? (
                            <select className='opacity-50' disabled value={rating} onChange={(e) => ratingChangeHandler(e.target.value)}>
                            {
                            rate.map((a, id) => (
                                <option key={id} value={a}>{a}</option>
                            ))
                            }
                            </select>
                        ) : (
                            <select value={rating} onChange={(e) => ratingChangeHandler(e.target.value)}>
                                {
                                rate.map((a, id) => (
                                    <option key={id} value={a}>{a}</option>
                                ))
                                }
                            </select>)
                        }
                    </div>
                </label>
                <label className='mx-4 text-red-500'>
                    {props.user === "" ? (<p>Sign in To Mark This Game</p>) : ("")}
                </label>
            </div>
        )
    )
}

export default OneGame;