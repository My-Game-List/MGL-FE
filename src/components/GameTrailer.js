import ReactPlayer from 'react-player/lazy';

function GameTrailer(props) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    {props.game.videos === undefined ? <p align='center'>This Game Doesn't Have any trailer</p> : <ReactPlayer controls url={props.game.videos} width='auto' height='200%' />}
                </div>
            </div>
        </div>
    )
}

export default GameTrailer
