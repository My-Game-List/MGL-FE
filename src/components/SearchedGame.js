import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchedGame(props) {

    const navigate = useNavigate();

    return (
        <div className='overflow-x-auto text-lg'>
            <table className='table mx-14'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.game === '' ? (
                        <div>
                            <h1>No Such Game Found</h1>
                        </div>
                    ) : props.loadGame.map((g, id) => (
                            <tr key={id}>
                                <td className='w-5'>
                                    <a onClick={()=>navigate(`../OneGame/${g.id}`)} id='searchGame'>{id+1}.</a>
                                </td>
                                <td className='w-40'>
                                    {g.cover === undefined ? (
                                        <p>No Image Found</p>
                                    ) : (
                                    <a onClick={()=>navigate(`../OneGame/${g.id}`)} id='searchGame'>
                                        <img src={g.cover.url} />
                                    </a>
                                    )}
                                </td>
                                <td className='w-55'>
                                    <a onClick={()=>navigate(`../OneGame/${g.id}`)} id='searchGame'>
                                        {g.name}
                                    </a>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
                
            </table>
            <div className='mx-14 text-center'>
                {props.loadGame.length === props.game.length && props.game.length !== 0 ? (<h3>No More Game To Load</h3>) : (
                props.game.length !== 0 ? (<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2' onClick={props.loadMoreGame}>Load More...</button>)
                : ("")
                )}
            </div>
        </div>
    );
    
}

export default SearchedGame;