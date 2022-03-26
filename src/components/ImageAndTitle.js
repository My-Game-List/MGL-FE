import axios from 'axios';
import { React } from 'react';

function ImageAndTitle(props) {

    return (
        <div className='container' id='contain2' align='center'>
            <div className='row'>
                <img id='gameImg' alt='me' src={props.game.imageURL}/>
                <div>
                    <h4>{props.game.name}</h4>
                </div>
            </div>
        </div>
    );
}

export default ImageAndTitle;