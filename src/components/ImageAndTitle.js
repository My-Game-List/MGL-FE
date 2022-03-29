import axios from 'axios';
import { React } from 'react';

function ImageAndTitle(props) {

    return (
        <div className='container' id='contain2' align='center'>
            {props.game.imageURL === undefined ? (<h3>:( This Game Containt No Image</h3>) 
            : (
                <div className='row'>
                <img id='gameImg' alt='me' src={props.game.imageURL}/>
                </div>
            )}
            <div>
                <h4>{props.game.name}</h4>
            </div>
        </div>
    );
}

export default ImageAndTitle;