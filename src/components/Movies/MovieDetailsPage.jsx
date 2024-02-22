import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getID, post } from "../../utils/httpClient";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating, IconButton, Fab } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './MovieDetailsPage.css'
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import { Collapse, Alert, AlertTitle } from '@mui/material';


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
            light: '#4b4b4b',
            dark: '#151515',
            contrastText: '#5799ef',
        }
    },
});

const MovieDetailsPage = () => {
    const { movie } = useLoaderData();
    const navigate = useNavigate();
    const [canRate, setCanRate] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);

    // Check if movie is an array and get the first element
    const theMovie = Array.isArray(movie) ? movie[0] : movie;

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
            await delay(3000);
            setOpenAlert(false);
            setCanRate(false);
            navigate(`/movies/${movieID}`);
            // Reload the page after navigation
            //navigate(0);
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
                <Dialog fullWidth={true} maxWidth={'sm'} open={canRate} onClose={handleRatingDialogClose}>
                    <DialogTitle align="center" sx={{ color: 'secondary.main', fontWeight: '600' }}>
                        Rate This <span className="rate-movie-title">{theMovie.title}</span>
                        <IconButton
                            edge="end"
                            onClick={handleRatingDialogClose}
                            sx={{ position: 'absolute', top: '16px', right: '32px' }}
                        >
                            <CloseIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Rating name="user-rating" value={userRating} size="large" onChange={(event, newValue) => setUserRating(newValue)} />
                    </DialogContent>
                    <DialogActions sx={{ width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Button disabled={userRating === 0} onClick={handleRatingSubmit} className="submit-rate">
                            Rate
                        </Button>
                    </DialogActions>
                    <Collapse in={openAlert}>
                        <Alert severity="success">
                            <AlertTitle>success</AlertTitle>
                            You Rated {userRating} for {theMovie.title}
                        </Alert>
                    </Collapse>
                </Dialog>


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
    const movie = await getID(`/movies/${params.movieID}`);
    return { movie };
}