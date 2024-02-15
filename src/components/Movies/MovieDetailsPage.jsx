import React from "react";
import { useLoaderData } from "react-router-dom";
import { getID } from "../../utils/httpClient";
import { Box } from "@mui/material";
const MovieDetailsPage = () => {
    const { movie } = useLoaderData();

    // Check if movie is an array and get the first element
    const theMovie = Array.isArray(movie) ? movie[0] : movie;

    return <Box sx={{ height: '100vh ' }}>
        <Box sx={{
            height: '350px',
            margin: '0',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1
        }}>

        </Box>

    </Box>
}

export default MovieDetailsPage


export async function loader({ params }) {
    const movie = await getID(`/movies/${params.movieID}`);
    return { movie };
}