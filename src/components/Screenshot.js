import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Screenshot(props) {

    return (
        <React.Fragment>
            <center>
                <Swiper
                    autoplay={{ 
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    
                    <div className="border-2 mx-auto">
                        {props.game.screenshots === undefined ? (
                            <p>No Screenshots for this game</p>
                        ) : (
                            props.game.screenshots?.map((item, index) => (
                                <SwiperSlide key={index}>
                                <div>
                                    <img src={item.url} />
                                </div>
                                </SwiperSlide>
                            )
                        ))}
                    </div>
                </Swiper>
            </center>
        </React.Fragment>
    )
}

export default Screenshot;
