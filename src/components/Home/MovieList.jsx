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



// movies = [
//   {
//     id: 1,
//     postImg: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
//     backdropImg: 'https://m.media-amazon.com/images/M/MV5BZTY4NjcxNDctZmVjMC00NzM0LWIxYTctNjdhNzdlN2VkNjNiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
//     title: 'Forrest Gump',
//     director: 'Robert Zemeckis',
//     year: 1994,
//     rate: 4.4,
//     duration: '02:22:00',
//     description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
//   },
//   {
//     id: 2,
//     postImg: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
//     backdropImg: 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
//     title: 'Interstellar',
//     director: 'Christopher Nolan',
//     year: 2014,
//     rate: 4.0,
//     duration: '02:49:00',
//     description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.'
//   },
//   {
//     id: 3,
//     postImg: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg',
//     backdropImg: 'https://m.media-amazon.com/images/M/MV5BYzA4ZWRhNjktMTA3ZS00NDNiLThmMDMtNzdlYzk0ZjY2ZGFmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
//     title: 'The Green Mile',
//     director: 'Roman Polanski',
//     year: 1999,
//     rate: 3.9,
//     duration: '03:09:00',
//     description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.'
//   },
//   {
//     id: 4,
//     postImg: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
//     backdropImg: 'https://m.media-amazon.com/images/M/MV5BZTY4NjcxNDctZmVjMC00NzM0LWIxYTctNjdhNzdlN2VkNjNiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
//     title: 'Forrest Gump',
//     director: 'Robert Zemeckis',
//     year: 1994,
//     rate: 4.4,
//     duration: '02:22:00',
//     description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
//   },
//   {
//     id: 5,
//     postImg: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
//     backdropImg: 'https://m.media-amazon.com/images/M/MV5BZTY4NjcxNDctZmVjMC00NzM0LWIxYTctNjdhNzdlN2VkNjNiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
//     title: 'Forrest Gump',
//     director: 'Robert Zemeckis',
//     year: 1994,
//     rate: 4.4,
//     duration: '02:22:00',
//     description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
//   },
// ];


export default MovieList