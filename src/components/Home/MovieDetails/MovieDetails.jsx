import React from "react";
import './MovieDetails.css'
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';

const MovieDetails = ({ movie }) => {
    return <>
        <Box className="movie_card" id="bright">
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina" src={`${movie.postImg}`} alt={movie.title} />
                    <h1>{movie.title}</h1>
                    <h4>{movie.year}, {movie.director}</h4>
                    <span className="minutes">{movie.duration}</span>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Rating name="read-only" value={movie.rate} precision={0.1} size="large" readOnly sx={{ display: 'flex', py: 1.5 }} />
                        <span className="rating"> {movie.rate} / 5 </span>
                    </Box>

                </div>
                <div className="movie_desc">
                    <p className="text">
                        {movie.description}
                    </p>
                </div>
            </div>

            <div className="blur_back" style={{ backgroundImage: `url(${movie.backdropImg})` }}></div>
        </Box>
    </>
}

export default MovieDetails;