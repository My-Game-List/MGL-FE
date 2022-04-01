import { React } from 'react';

function ImageAndTitle(props) {

    return (
        <div className='container' id='contain2' align='center'>
            {props.game.cover === undefined ? (<h3>:( This Game Containt No Image</h3>) 
            : (
                <div className='row'>
                <img id='gameImg' alt='me' src={props.game.cover}/>
                </div>
            )}
            <div>
                <h4>{props.game.name}</h4>
            </div>
        </div>
    );
}

export default ImageAndTitle;