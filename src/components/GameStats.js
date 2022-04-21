import star from "../asset/Star.png";

function GameStats(props) {

    return (
        <div className="mx-4 text-center grid grid-flows-row grid-col-3 place-content-center lg:grid-cols-12">
            <div className="lg:col-span-2 col-span-12">
                <h5 className="bg-yellow-600 m-1" align='center'>Score</h5>
                <p align='center'>
                    {props.game.total_rating === undefined ? "" : <img src={star}></img> }
                    {props.game.total_rating === undefined ? "not rated" : props.game.total_rating.toFixed(2)}
                </p>
            </div>
            <div className="lg:col-span-4 col-span-12">
                <h5 className="bg-yellow-600 m-1" align='center'>Release Date</h5>
                <p align='center'>{props.game.release_dates === undefined ? "---" : props.game.release_dates.human}</p>
            </div>
            <div className="lg:col-span-6 col-span-12">
                <h5 className="bg-yellow-600 m-1" align='center'>Company</h5>
                <p align='center'>{props.game.involved_companies === undefined ? "---" : props.game.involved_companies}</p>
            </div>
            <div className="lg:col-span-6 lg:row-start-2 col-span-12">
                <h5 className="bg-yellow-600 m-1" align='center'>Platform</h5>
                <p style={{paddingLeft: '4%'}}>{props.game.platforms === undefined ? "Unknown" : props.game.platforms}</p>
            </div>
            <div className="lg:col-span-6 lg:row-start-2 col-span-12">
                <h5 className="bg-yellow-600 m-1" align='center'>Users Rate</h5>
                <p align='center'> {props.game.total_rating_count === undefined ? "---" : props.game.total_rating_count} Users </p>
            </div>
        </div>
    )
}

export default GameStats
