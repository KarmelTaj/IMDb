import React from "react";
import './MovieDetails.css'

const MovieDetails = () => {
    return <>
        <div className="movie_card" id="bright">
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina" src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg" />
                    <h1>Title</h1>
                    <h4>Year, Director</h4>
                    <span className="minutes">Duration(Min)</span>
                </div>
                <div className="movie_desc">
                    <p className="text">
                        Description
                    </p>
                </div>
            </div>
            <div className="blur_back bright_back"></div>
        </div>
    </>
}

export default MovieDetails;