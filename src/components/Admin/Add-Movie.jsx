import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { get } from "../../utils/httpClient";
import './Add-Movie.css'

const theme = createTheme({
    palette: {
        primary: {
            main: "#f5c518",
            contrastText: "#000",
        },
        secondary: {
            main: "#000",
            contrastText: "#fff",
        },
    },
});

const AddMovie = () => {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(2000);
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [director, setDirector] = useState("");
    const [posterUrl, setPosterUrl] = useState("");
    const [backdropUrl, setBackdropUrl] = useState("");
    const [mpa, setMpa] = useState("");
    const [selectedStars, setSelectedStars] = useState([]);
    const [stars, setStars] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    const loadGenresAndMovies = async () => {
        const data = await get('/admin/add-movie');
        setGenres(data?.genres);
        setStars(data?.stars);
        setMovies(data?.movies);
    }

    useEffect(() => {
        loadGenresAndMovies()
    }, [])

    const handleStarsChange = (event) => {
        // Ensure that the number of selected stars does not exceed 3
        const selectedStars = event.target.value.slice(0, 3);
        setSelectedStars(selectedStars);
    };

    const handleGenresChange = (event) => {
        // Ensure that the number of selected stars does not exceed 3
        const selectedGenres = event.target.value.slice(0, 3);
        setSelectedGenres(selectedGenres);
    };

    const checkIfMovieExists = () => {
        return movies.some(movie => movie.title.toLowerCase() === title.toLowerCase())
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                component="main"
                sx={{ height: "100%", justifyContent: "center", alignContent: "center" }}
            >
                <Grid item xs={12} sm={8} md={8} lg={6} component={Paper} elevation={6} square sx={{ borderRadius: '12px' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5" fontWeight="600">
                            Add a New Movie
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        color="secondary"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="movie-title"
                                        label="Movie Title"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        color="secondary"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="duration"
                                        label="Duration (HH:MM:SS)"
                                        name="duration"
                                        autoComplete="duration"
                                        placeholder="02:30:00"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        color="secondary"
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="number"
                                        id="year"
                                        label="Year"
                                        name="year"
                                        autoComplete="year"
                                        value={year}
                                        onChange={(e) => setYear(+e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        color="secondary"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="director"
                                        label="Director"
                                        name="director"
                                        autoComplete="director"
                                        value={director}
                                        onChange={(e) => setDirector(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel id="mpa-label" color="secondary">MPA</InputLabel>
                                        <Select
                                            color="secondary"
                                            labelId="mpa-label"
                                            id="mpa"
                                            value={mpa}
                                            onChange={(e) => setMpa(e.target.value)}
                                            label="MPA"
                                        >
                                            {/* MPA Options */}
                                            <MenuItem value="G">G</MenuItem>
                                            <MenuItem value="PG">PG</MenuItem>
                                            <MenuItem value="PG-13">PG-13</MenuItem>
                                            <MenuItem value="R">R</MenuItem>
                                            <MenuItem value="NC-17">NC-17</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <TextField
                                color="secondary"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        color="secondary"
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="poster-url"
                                        label="Poster URL"
                                        name="poster-url"
                                        autoComplete="poster-url"
                                        placeholder="https://"
                                        value={posterUrl}
                                        onChange={(e) => setPosterUrl(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        color="secondary"
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="backdrop-url"
                                        label="Backdrop URL"
                                        name="backdrop-url"
                                        autoComplete="backdrop-url"
                                        placeholder="https://"
                                        value={backdropUrl}
                                        onChange={(e) => setBackdropUrl(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="genres-label" color="secondary" >Genres (Maximum 3)</InputLabel>
                                <Select
                                    color="secondary"
                                    labelId="genres-label"
                                    id="genres"
                                    multiple
                                    value={selectedGenres}
                                    onChange={handleGenresChange}
                                    label="Genres (Maximum 3)"
                                >
                                    {/* Load Stars */}
                                    {genres?.map((genre) => (
                                        <MenuItem key={genre.id} value={genre.name}>
                                            {genre.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="stars-label" color="secondary">Stars (Maximum 3)</InputLabel>
                                <Select
                                    color="secondary"
                                    labelId="stars-label"
                                    id="stars"
                                    multiple
                                    value={selectedStars}
                                    onChange={handleStarsChange}
                                    label="Stars (Maximum 3)"
                                >
                                    {/* Load Stars */}
                                    {stars?.map((star) => (
                                        <MenuItem key={star.id} value={star.name}>
                                            {star.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                disabled={checkIfMovieExists()}
                                sx={{ mt: 3, mb: 2, fontWeight: '600', fontSize: '1rem', lineHeight: '2.5' }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default AddMovie;
