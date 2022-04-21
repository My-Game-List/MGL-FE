import ReactPlayer from 'react-player/lazy';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function GameTrailer(props) {

    return (
        <div className=''>

            <div className='mb-36 h-32'>
                {props.game.videos === undefined ? <p align='center'>This Game Doesn't Have any trailer</p> : <ReactPlayer controls url={props.game.videos} width='auto' height='200%' />}
            </div>

            <h4>Artworks</h4>

            <Swiper
                autoHeight= {true}
                autoplay={{ 
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <center>
                    {props.game.artworks === undefined ? <p align='center'>This Game Doesn't Have any trailer</p> : (
                        props.game.artworks.map((item, index) => (
                            <SwiperSlide>
                                <div key={index}>
                                    <img alt='a' key={index} src={item.url} />
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </center>
            </Swiper>
        </div>
    )
}

export default GameTrailer
