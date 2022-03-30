import React from 'react';

function GameDetail(props) {
    return (
        <div className='container'>
            <div className='row'>
                <h4 align='center'>Information</h4>

                <div className='col'>
                    Genre : 
                    {props.game.genres === undefined ? "---" : " " + props.game.genres}
                </div>
            </div>
        </div>
    );
}

export default GameDetail;