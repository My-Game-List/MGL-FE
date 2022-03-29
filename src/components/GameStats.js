import { useState, useEffect } from "react"
import axios from "axios";
import star from "../asset/Star.png";

function GameStats(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [release, setRelease] = useState('');
    const [company, setCompany] = useState('');
    const [platform, setPlatform] = useState([]);

    useEffect(() => {
        // console.log(props.game.id);
        try {
            axios.get(`https://mgl-be.herokuapp.com/release/${props.game.id}`)
            .then((res) => {
                setRelease(res.data);
                // console.log(res.data);
            })
        } catch {
            setRelease("---");
        }

        try {
            axios.get(`https://mgl-be.herokuapp.com/company/${props.game.involved_companies[0]}`)
            .then((res) => {
                setCompany(res.data);
                // console.log(res.data);
            })
        } catch {
            setCompany("---");
        }

        if (props.game.platforms !== undefined) {
            axios.get(`https://mgl-be.herokuapp.com/platform/${props.game.platforms}`)
            .then((res) => {
                // console.log(platform);
                setPlatform(res.data);
                // console.log(res.data);
            })
        } else {
            setPlatform(['---']);
        }

        setIsLoading(false);
    }, []);

    return (
        isLoading ? (
            <div className="container">
                loading...
            </div>
        ) : (
            <div className="container">
                <div className='row'>
                    <div className="col-2">
                        <div className='row'>
                            <h5 align='center'>Score</h5>
                        </div>
                        <div className='row'>
                            <p align='center'>
                                {props.game.total_rating === undefined ? "" : <img src={star}></img> }
                                {props.game.total_rating === undefined ? "not rated" : props.game.total_rating.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <h5 align='center'>Release Date</h5>
                        </div>
                        <div className="row">
                            <p align='center'>{release}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <h5 align='center'>Company</h5>
                        <p align='center'>{company}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h5 align='center'>Platform</h5>
                        <p style={{paddingLeft: '4%'}}>{platform.join(', ')}</p>
                    </div>
                    <div className="col-6">
                        <h5 align='center'>Users Rate</h5>
                        <p align='center'> {props.game.total_rating_count === undefined ? "---" : props.game.total_rating_count} Users </p>
                    </div>
                </div>
            </div>
        )
    )
}

export default GameStats
