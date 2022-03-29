import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import star from '../asset/Star.png';

class TopConsole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            game: {},
        }
    }

    componentDidMount() {
        axios.get('https://mgl-be.herokuapp.com/newest')
        .then(res => {
            this.setState({ game: res.data });
            this.setState({ isLoading: false });
        })
    }

    render() {
        return (
            this.state.isLoading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <React.Fragment>
                    <h2>Top All Time Games</h2>
                    <ul>
                        <div className='contain'>
                        {this.state.game.map((item, index) => (
                            <li key={index}> 
                                <a href={`/OneGame/${item.id}`}>
                                    <div className='oneGame'>
                                        <div>
                                            <img className='gameImg' alt={item.name} src={item.imageURL} />
                                        </div>

                                        <div className='gameTitle'>
                                            {item.name}<br></br>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                        </div>
                    </ul>
                </React.Fragment>
            )
        );
    }
}

export default TopConsole;