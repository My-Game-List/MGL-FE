import React, { useEffect, useState } from 'react';
import axios from 'axios';
import star from '../asset/Star.png';
import Slider from "react-slick";

function TopConsole() {

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "gray" }}
                onClick={onClick}
            />
        );
    }
      
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "gray" }}
                onClick={onClick}
            />
        );
    }

    const [game, setGame] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://mgl-be.herokuapp.com/TopAllTime')
        .then(res => {
            setGame(res.data);
            setIsLoading(false);
        })
    }, [])

    return (
        isLoading ? (
            <div>
                Loading...
            </div>
        ) : (
            <React.Fragment>
                <h2>Top All Time Games</h2>
                    <Slider className='contain' {...{dots: true, infinite: true, speed: 500, slidesToShow: 10, slidesToScroll: 10, nextArrow: <NextArrow />, prevArrow: <PrevArrow />}}>
                        {game.map((item, index) => (
                            <center>
                                <a key={index} href={`/OneGame/${item.id}`}>
                                    <div className='oneGame'>
                                        <div>
                                            <img className='gameImg' alt={item.name} src={item.cover.url} />
                                        </div>

                                        <div className='gameTitle'>
                                            {item.name}<br></br>
                                            <img src={star}></img>{item.total_rating.toFixed(2)}
                                        </div>
                                    </div>
                                </a>
                            </center>
                        ))}
                    </Slider>
            </React.Fragment>
        )
    );
}

export default TopConsole;