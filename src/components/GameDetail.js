import React from 'react';

function GameDetail(props) {
    return (
        <div className='mx-4 grid grid-cols-1 grid-flow-row'>
            <div className='col-span-1'>
                <h4 align='center'>Information</h4>
                Genre : 
                {props.game.genres === undefined ? "---" : " " + props.game.genres}
            </div>
            <div className='col-span-1'>
                Game Engine
            </div>
        </div>
    );
}

export default GameDetail;