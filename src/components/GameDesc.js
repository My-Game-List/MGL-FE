import React from 'react';

function GameDesc(props) {

    return (
        <div className='container'>
            <div className='row'>
                <h4 align='center'>Synopsis</h4>
                <hr></hr>
                <div className='col-12' align="center" id="Gdesc">
                    <p>{props.game.summary === undefined ? "No Synopsis For This Game" : props.game.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default GameDesc;