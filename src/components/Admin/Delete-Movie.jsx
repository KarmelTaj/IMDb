import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { get, DELETE } from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";


const theme = createTheme({
    palette: {
        primary: {
            main: '#f5c518',
            contrastText: '#000',
        },
        secondary: {
            main: '#000',
            contrastText: '#fff',
        },
        backgrounds: {
            tab: '#1f1f1f',
            contrastText: '#000',
            panel: '#fff',
        }
    },
});

const DeleteMovie = () => {
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const loadMovies = async () => {
        const data = await get('/admin/delete-movie');
        setMovies(data.movies);

        // Set selectedMovie to the id of the first movie
        if (data.movies.length > 0) {
            setSelectedMovie(data.movies[0].id);
        }
    }

    useEffect(() => {
        loadMovies();
    }, [])

    const handleDelete = async () => {
        const response = await DELETE("/admin/delete-movie", { id: selectedMovie });
        if (response.error) {
            console.log(response.message);
            setSelectedMovie("");
        } else {
            //success
            setSelectedMovie("");
            loadMovies();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ borderRadius: '12px' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5" fontWeight='600'>
                            Delete a Movie
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1, width: '70%' }}>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="movie-title-label" color="secondary">Select Movie</InputLabel>
                                <Select
                                    color="secondary"
                                    labelId="movie-title-label"
                                    id="movie-title"
                                    value={selectedMovie}
                                    label="Select Movie"
                                    onChange={(e) => setSelectedMovie(e.target.value)}
                                    sx={{ width: '100%' }}
                                >
                                    {/* Load Movies */}
                                    {movies?.map((movie) => (
                                        <MenuItem key={movie.id} value={movie.id}>
                                            {movie.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 3, mb: 2, fontWeight: '600', fontSize: '1rem', width: '100%', lineHeight: '2.5' }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default DeleteMovie;
