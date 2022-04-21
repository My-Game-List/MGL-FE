import React, { useEffect, useState } from 'react';

function Statistic(props) {
    
    return (
        <div>
            <div className='statsBar'>
                <h3>My Statistics</h3>
                {props.user.username}<br></br>
                <hr color='black'></hr>
                Played : {props.user.games.completed.length}<br></br>
                Playing : {props.user.games.playing.length}<br></br>
                Planned : {props.user.games.plan.length}
            </div>
        </div>
    )
}


export default Statistic;