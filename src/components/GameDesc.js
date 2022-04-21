import React from 'react';

function GameDesc(props) {

    return (
        <div className='text-center text-black'>
            <h4 className='text-white'>Synopsis</h4>
            <hr></hr>
            <div className='bg-gray-300 rounded-md px-4'>
                <p>{props.game.summary === undefined ? "No Synopsis For This Game" : props.game.summary}</p>
            </div>
        </div>
    );
}

export default GameDesc;