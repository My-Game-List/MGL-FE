import React from "react";
import Slider from "react-slick";

function Screenshot(props) {

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

    return (
        <React.Fragment>
            <center>
                <div className="back">
                    {props.game.screenshots === undefined ? (
                        <p>No Screenshots for this game</p>
                    ) : (
                        <Slider {...{dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, nextArrow: <NextArrow />, prevArrow: <PrevArrow />}}>
                        {props.game.screenshots.map((item, index) => (
                            <div>
                                <img id="ss" key={index} src={item.url} />
                            </div>
                        
                        ))}
                        </Slider>
                    )}
                </div>
            </center>
        </React.Fragment>
    )
}

export default Screenshot;
