import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getID } from "../../utils/httpClient";
import { Box, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import './MovieDetailsPage.css'

const MovieDetailsPage = () => {
    const { movie } = useLoaderData();

    // Check if movie is an array and get the first element
    const theMovie = Array.isArray(movie) ? movie[0] : movie;

    return <>
        <Box className="movie-card">
            <Box className="container">
                <img src={`${theMovie.posterurl}`} alt={movie.title} className="cover" />
                <Box className="hero">
                    <Box className="background-poster" sx={{ backgroundImage: `url(${theMovie.backdropurl})` }}>
                        <Box className="details">
                            <Typography variant="h4" className="title">{theMovie.title}</Typography>
                            <span className="minutes">{theMovie.duration}</span>
                            <span className="mpa">PG-13</span>

                        </Box>
                    </Box>
                </Box>
                <Box className="descriptions">
                    <Box className="tags">
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Rating name="read-only" value={+theMovie.rate} precision={0.1} size="large" readOnly sx={{ alignItems: 'center' }} />
                            <span className="rating"> {theMovie.rate} / 5 </span>
                        </Box>
                        <span className="tag">action</span>
                        <span className="tag">fantasy</span>
                        <span className="tag">adventure</span>
                    </Box>
                    <Box className="actors">
                        <Typography variant="body2" sx={{ fontSize: "17px " }}>{theMovie.description}</Typography>
                        <Box className="avatars">
                            <Box className="tooltip"><img className="avatar" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar1.png" alt="avatar1" /><span className="tooltiptext">grewon.pdf</span></Box>
                            <Box className="tooltip"><img className="avatar" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar2.png" alt="avatar2" /><span className="tooltiptext">grewon.pdf</span></Box>
                            <Box className="tooltip"><img className="avatar" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar3.png" alt="avatar3" /><span className="tooltiptext">grewon.pdf</span></Box>
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