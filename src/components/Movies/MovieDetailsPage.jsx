import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getID } from "../../utils/httpClient";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './MovieDetailsPage.css'

const theme = createTheme({
    palette: {
        primary: {
            main: '#121212',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f5c518',
            contrastText: '#000',
        },
        rate: {
            main: '#1f1f1f',
            contrastText: '#5799ef',
        }
    },
});

const MovieDetailsPage = () => {
    const { movie } = useLoaderData();
    const navigate = useNavigate();
    const [canRate, setCanRate] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const handleRatingDialogClose = () => {
        setCanRate(false);
    }

    const handleRate = () => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        if (userAuth && userAuth.id) {
            setCanRate(true);
        } else {
            navigate("/login");
        }
    }

    const handleRatingSubmit = () => {
        // Handle the logic to submit the user's rating
        // Update the state, close the dialog, etc.
    }
    
    // Check if movie is an array and get the first element
    const theMovie = Array.isArray(movie) ? movie[0] : movie
    return <>
        <Box className="movie-card">
            <Dialog open={canRate} onClose={handleRatingDialogClose}>
                <DialogTitle>Rate {theMovie.title}</DialogTitle>
                <DialogContent>
                    <Rating name="user-rating" value={userRating} precision={0.5} onChange={(event, newValue) => setUserRating(newValue)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRatingDialogClose}>Cancel</Button>
                    <Button onClick={handleRatingSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
            <ThemeProvider theme={theme}>
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
                        {theMovie?.genres?.map((genre, index) => (
                            <span key={index} className="tag">{genre}</span>
                        ))}
                    </Box>
                    <Box className="actors">
                        <Typography variant="body2" sx={{ fontSize: "17px " }}>{theMovie.description}</Typography>
                        <Box className="avatars">
                            {theMovie?.stars?.map((star, index) => (
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