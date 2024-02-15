import { Grid } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from "react";
import MovieDetails from './MovieDetails/MovieDetails'
import { get } from '../../utils/httpClient'


const MovieList = () => {
  const [movies, setMovies] = useState([])

  const loadMovies = async () => {
    const data = await get('/movies')
    setMovies(data);
  }
  useEffect(() => {
    loadMovies()
  }, [])
  
  return <Grid container direction='row' justifyContent='center' alignItems='center' rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {movies?.map(movie => (
      <Grid item xs={12} md={6} key={movie.id}  >
        <MovieDetails movie={movie} />
      </Grid>
    ))}

  </Grid>
}

export default MovieList