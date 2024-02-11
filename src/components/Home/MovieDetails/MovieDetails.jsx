import React from "react";
import './MovieDetails.css'

const MovieDetails = ({ movie }) => {
    return <>
        <div className="movie_card" id="bright">
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina" src={`${movie.postImg}`} alt={movie.title} />
                    <h1>{movie.title}</h1>
                    <h4>{movie.year}, {movie.director}</h4>
                    <span className="minutes">{movie.duration}</span>
                </div>
                <div className="movie_desc">
                    <p className="text">
                        {movie.description}
                    </p>
                </div>
            </div>

            <div className="blur_back" style={{backgroundImage: `url(${movie.backdropImg})`}}></div>
        </div>
    </>
}

export default MovieDetails;