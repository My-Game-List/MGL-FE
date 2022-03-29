import React from 'react';

function SearchedGame(props) {
    return (
        <React.Fragment>
            <div className='container'>
                {props.game === '' ? (
                    <div className='container'>
                        <h1>No Such Game Found</h1>
                    </div>
                ) : props.loadGame.map((g, id) => 
                        (<a href={`../OneGame/${g.id}`} key={id} id='searchGame'>
                        <div key={id} className='row' id='searchOne'>
                            <div className='col-1'>
                                <p style={{paddingLeft:'80%', paddingTop: '40%'}}>{id+1}.</p>
                            </div>
                            <div className='col-1'>
                                {g.cover === undefined ? <p>No Image Found</p> : <img src={g.cover.url} />}
                            </div>
                            <div className='col-9 '>
                                <br/>
                                {g.name}
                            </div>
                        </div>
                    </a>
                    )
                )}
                
                <div className='row'>
                    {props.loadGame.length === props.game.length && props.game.length !== 0 ? (<h3>No More Game To Load</h3>) : (
                    props.game.length !== 0 ? (<button className='btn btn-primary' onClick={props.loadMoreGame}>Load More...</button>)
                    : ("")
                    )}
                </div>
                <div className='row'><br/><br/><br/></div>
            </div>
        </React.Fragment>
    );
    
}

export default SearchedGame;