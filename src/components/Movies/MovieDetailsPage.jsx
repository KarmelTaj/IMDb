import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { get, post } from "../../utils/httpClient";
import { Box, Typography, Button, Rating, Fab } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { ThemeProvider } from '@mui/material/styles';
import './MovieDetailsPage.css'
import HomeIcon from '@mui/icons-material/Home';
import Rate from './Rate';
import { moviesMovieDetailsPage as theme } from "../../utils/theme";

const MovieDetailsPage = () => {
    const { movie } = useLoaderData();
    const navigate = useNavigate();
    const [canRate, setCanRate] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [theMovie, setTheMovie] = useState(movie);

    // Check if movie is an array and get the first element
    //onst theMovie = Array.isArray(movie) ? movie[0] : movie;

    const fetchMovieDetails = async (movieID) => {
        const movieDetails = await get(`/movies/${movieID}`);
        setTheMovie(movieDetails);
    };

    const handleRatingDialogClose = () => {
        setCanRate(false);
        const movieID = theMovie.id;
        navigate(`/movies/${movieID}`);
    }

    const handleRate = () => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        if (userAuth && userAuth.id) {
            setCanRate(true);
            const movieID = theMovie.id;
            navigate(`/movies/${movieID}/rate-movie`, { replace: true });
        } else {
            navigate("/login");
        }
    }
    const handleRatingSubmit = async () => {
        const movieID = theMovie.id;
        let userRatingDecimal = parseFloat(userRating);
        // Check if userAuth is available in localStorage
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        if (!userAuth || !userAuth.id) {
            console.error("User authentication data is missing or invalid.");
            return;
        }
        const userID = userAuth.id;
        const response = await post(`/movies/${movieID}/rate-movie`, { userID, rate: userRatingDecimal });

        if (response.success) {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            setOpenAlert(true);
            fetchMovieDetails(movieID);
            await delay(3000);
            setOpenAlert(false);
            setCanRate(false);
            navigate(`/movies/${movieID}`);
        } else {
            setCanRate(false);
            navigate(`/movies/${movieID}`);
        }
    }

    const navigateToHome = () => {
        navigate("/");
    };

    return <>
        <Box className="movie-card">
            <ThemeProvider theme={theme}>
                <Fab variant="circular" color="rate" size="large" onClick={navigateToHome} sx={{ position: "absolute", top: '40px', left: '60px', width: '72px', height: '72px' }}>
                    <HomeIcon sx={{ height: '35px', width: '35px' }} />
                </Fab>
                <Rate
                    movie={movie}
                    canRate={canRate}
                    handleRatingDialogClose={handleRatingDialogClose}
                    handleRate={handleRate}
                    handleRatingSubmit={handleRatingSubmit}
                    userRating={userRating}
                    setUserRating={setUserRating}
                    openAlert={openAlert}
                />

                <Box sx={{ position: 'absolute', bottom: '40px', right: '80px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
                        <Button variant="contained" color='rate' onClick={handleRate} sx={{ p: '8px 20px', fontWeight: '600', fontSize: '28px', borderRadius: '6px' }}>
                            <StarOutlineIcon color='rate.contrastText' align='center' fontSize="large" sx={{ mr: '12px' }} />
                            Rate
                        </Button>
                    </Box>
                </Box>
            </ThemeProvider>
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
                        {theMovie.genres?.map((genre, index) => (
                            <span key={index} className="tag">{genre}</span>
                        ))}
                    </Box>
                    <Box className="actors">
                        <Typography variant="body2" sx={{ fontSize: "17px " }}>{theMovie.description}</Typography>
                        <Box className="avatars">
                            {theMovie.stars?.map((star, index) => (
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
    const movie = await get(`/movies/${params.movieID}`);
    return { movie };
}