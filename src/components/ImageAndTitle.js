import { React } from 'react';

function ImageAndTitle(props) {

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-3'></div>
            {props.game.cover === undefined ? (<h3>:( This Game Containt No Image</h3>) 
            : (
                <div className='col-span-6 lg:col-span-12' id='contain2'>
                    <img id='gameImg' alt='me' src={props.game.cover}/>
                    <h4 className='text-center text-black'>{props.game.name}</h4>
                </div>
            )}
            <div className='col-span-2'></div>
        </div>
    );
}

export default ImageAndTitle;