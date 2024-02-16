import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getID } from "../../utils/httpClient";
import { Box, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import './MovieDetailsPage.css'

const MovieDetailsPage = () => {
    const { movie } = useLoaderData();
    // Check if movie is an array and get the first element
    const theMovie = Array.isArray(movie) ? movie[0] : movie
    const [starname, setStarname] = useState(0)
    console.log(theMovie)
    return <>
        <Box className="movie-card">
            <Box className="container">
                <img src={`${theMovie.posterurl}`} alt={movie.title} className="cover" />
                <Box className="hero">
                    <Box className="background-poster" sx={{ backgroundImage: `url(${theMovie.backdropurl})` }}>
                        <Box className="details">
                            <Typography variant="h4" className="title">{theMovie.title}</Typography>
                            <span className="minutes">{theMovie.duration}</span>
                            <span className="mpa">{theMovie.mpa}</span>
                        </Box>
                    </Box>
                </Box>
                <Box className="descriptions">
                    <Box className="tags">
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Rating name="read-only" value={+theMovie.rate} precision={0.1} size="large" readOnly sx={{ alignItems: 'center' }} />
                            <span className="rating"> {theMovie.rate} / 5 </span>
                        </Box>
                        {theMovie.genres && theMovie.genres.map((genre, index) => (
                            <span key={index} className="tag">{genre}</span>
                        ))}
                    </Box>
                    <Box className="actors">
                        <Typography variant="body2" sx={{ fontSize: "17px " }}>{theMovie.description}</Typography>
                        <Box className="avatars">
                            {theMovie.stars && theMovie.stars.map((star, index) => (
                                <Box key={index} className="tooltip">
                                    <img className="avatar" src={star.picture} alt="Star Picture" />
                                    <span className="tooltiptext">{star.name}</span>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
}

export default MovieDetailsPage


export async function loader({ params }) {
    const movie = await getID(`/movies/${params.movieID}`);
    return { movie };
}