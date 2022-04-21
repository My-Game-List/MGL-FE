import React, { useEffect, useState } from 'react';
import axios from 'axios';
import star from '../asset/Star.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function TopConsole() {

    const [game, setGame] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/TopAllTime')
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
                <div className='grid-cols-1'>
                    <Swiper 
                        breakpoints={{
                            1000: { slidesPerView: 10},
                        }}
                        slidesPerView={3}
                        centeredSlides={false}
                        spaceBetween={10}
                        autoplay={{ 
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="gameSwiper"
                    >
                        {game.map((item, index) => (
                            <SwiperSlide key={index}>
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </React.Fragment>
        )
    );
}

export default TopConsole;