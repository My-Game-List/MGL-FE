import { useState, useEffect } from "react"
import axios from "axios";
import star from "../asset/Star.png";

function GameStats(props) {

    return (
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
                        <p align='center'>{props.game.release_dates === undefined ? "---" : props.game.release_dates.human}</p>
                    </div>
                </div>
                <div className="col-6">
                    <h5 align='center'>Company</h5>
                    <p align='center'>{props.game.involved_companies === undefined ? "---" : props.game.involved_companies}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h5 align='center'>Platform</h5>
                    <p style={{paddingLeft: '4%'}}>{props.game.platforms === undefined ? "Unknown" : props.game.platforms}</p>
                </div>
                <div className="col-6">
                    <h5 align='center'>Users Rate</h5>
                    <p align='center'> {props.game.total_rating_count === undefined ? "---" : props.game.total_rating_count} Users </p>
                </div>
            </div>
        </div>
    )
}

export default GameStats
